import type Stripe from 'stripe'
import { createAdminClient } from './supabase/admin'
import { getStripe, impuestosAutomaticos, tieneAcceso, type Plan } from './stripe'
import { clienteStripe, urlBase } from './suscripcion'

// Pagos únicos con Stripe Checkout (modo `payment`): plazas de eventos y audios de Mindfulness.
// El precio se calcula siempre aquí, en el servidor, según la suscripción de la usuaria.

export type Tipo = 'evento' | 'audio'

/** Minutos que dura la página de pago de Stripe (mínimo 30). La plaza se guarda un minuto más. */
const MINUTOS_PAGO = 30

/** Precio de un evento según el plan: −10 % con Solo vídeos y −20 % con Directo y vídeos. */
export function precioEvento(baseCents: number, plan: Plan | null | undefined, estado: string | null | undefined) {
  if (!tieneAcceso(estado)) return baseCents
  return Math.round(baseCents * (plan === 'directo' ? 0.8 : 0.9))
}

/** Precio de un audio: 17 € con suscripción activa, 19 € sin ella. */
export const precioAudio = (estado: string | null | undefined) => (tieneAcceso(estado) ? 1700 : 1900)

export const euros = (cents: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: cents % 100 ? 2 : 0 }).format(cents / 100)

const volverA = (tipo: Tipo) => (tipo === 'evento' ? '/app/eventos' : '/app/audios')

export class ErrorCompra extends Error {}

/**
 * Aparta la plaza o el audio y abre (o reutiliza) la página de pago de Stripe.
 * Devuelve la URL a la que hay que llevar a la usuaria.
 */
export async function iniciarCompra(opts: { userId: string; email?: string; tipo: Tipo; id: string }): Promise<string> {
  const stripe = getStripe()
  const admin = createAdminClient()
  if (!stripe || !admin) throw new Error('Stripe no está configurado.')

  const { data: p } = await admin.from('profiles').select('nombre, apellidos, plan, estado_suscripcion').eq('id', opts.userId).single()
  let nombre: string, descripcion: string, importe: number
  if (opts.tipo === 'evento') {
    const { data: e } = await admin.from('eventos').select('titulo, lugar, starts_at, precio_cents, publicado').eq('id', opts.id).maybeSingle()
    if (!e?.publicado) throw new ErrorCompra('Ese evento no está disponible.')
    nombre = `Evento: ${e.titulo}`
    descripcion = [new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Madrid' }).format(new Date(e.starts_at)), e.lugar].filter(Boolean).join(' · ')
    importe = precioEvento(e.precio_cents, p?.plan, p?.estado_suscripcion)
  } else {
    const { data: a } = await admin.from('audios').select('titulo, minutos, publicado').eq('id', opts.id).maybeSingle()
    if (!a?.publicado) throw new ErrorCompra('Ese audio no está disponible.')
    nombre = `Audio de Mindfulness: ${a.titulo}`
    descripcion = a.minutos ? `Audio descargable de ${a.minutos} min` : 'Audio descargable'
    importe = precioAudio(p?.estado_suscripcion)
  }

  for (let intento = 0; intento < 2; intento++) {
    const { data, error } = await admin.rpc('apartar_compra', {
      p_user: opts.userId,
      p_evento: opts.tipo === 'evento' ? opts.id : null,
      p_audio: opts.tipo === 'audio' ? opts.id : null,
      p_importe: importe,
      p_minutos: MINUTOS_PAGO + 1,
    })
    if (error) {
      // Doble clic: otra petición acaba de apartar la misma compra.
      if (error.code === '23505' && intento === 0) continue
      throw error
    }
    const r = (Array.isArray(data) ? data[0] : data) as { compra_id: string | null; sesion: string | null; error: string | null }
    if (r.error) throw new ErrorCompra(r.error)
    const compraId = r.compra_id!

    // Ya había un pago en curso: si la página de Stripe sigue abierta, se reutiliza.
    if (r.sesion) {
      const s = await stripe.checkout.sessions.retrieve(r.sesion)
      if (s.status === 'open' && s.url) return s.url
      if (s.status === 'complete') {
        await cumplirCompra(s)
        throw new ErrorCompra('Este pago ya está hecho.')
      }
      await admin.from('compras').delete().eq('id', compraId).eq('estado', 'pendiente')
      continue
    }

    const customer = await clienteStripe(opts.userId, opts.email, `${p?.nombre ?? ''} ${p?.apellidos ?? ''}`.trim())
    const base = await urlBase()
    const tax = impuestosAutomaticos()
    const metadata = { compra_id: compraId, user_id: opts.userId, tipo: opts.tipo, [`${opts.tipo}_id`]: opts.id }
    let s: Stripe.Checkout.Session
    try {
      s = await stripe.checkout.sessions.create(
        {
          mode: 'payment',
          customer,
          client_reference_id: opts.userId,
          line_items: [{ quantity: 1, price_data: { currency: 'eur', unit_amount: importe, product_data: { name: nombre, description: descripcion, metadata: { tipo: opts.tipo, id: opts.id } } } }],
          metadata,
          payment_intent_data: { metadata, description: nombre },
          invoice_creation: { enabled: true, invoice_data: { metadata, description: nombre } },
          expires_at: Math.floor(Date.now() / 1000) + MINUTOS_PAGO * 60,
          locale: 'es',
          automatic_tax: { enabled: tax },
          ...(tax ? { customer_update: { address: 'auto' as const, name: 'auto' as const } } : {}),
          success_url: `${base}${volverA(opts.tipo)}?ok=compra&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${base}${volverA(opts.tipo)}?error=${encodeURIComponent('Has salido del pago. No se ha cobrado nada.')}`,
        },
        { idempotencyKey: `compra-${compraId}` },
      )
    } catch (e) {
      // Sin página de pago no hay que guardar la plaza.
      await admin.from('compras').delete().eq('id', compraId).eq('estado', 'pendiente')
      throw e
    }
    await admin.from('compras').update({ stripe_session_id: s.id }).eq('id', compraId)
    if (!s.url) throw new Error('Stripe no ha devuelto la página de pago.')
    return s.url
  }
  throw new ErrorCompra('No hemos podido abrir el pago. Inténtalo de nuevo.')
}

const idDe = (x: string | { id: string } | null | undefined) => (typeof x === 'string' ? x : x?.id ?? null)

/**
 * Copia en Supabase el resultado de una sesión de Checkout de pago único.
 * Se llama desde el webhook y al volver del pago; se puede repetir sin problemas.
 */
export async function cumplirCompra(s: Stripe.Checkout.Session) {
  if (s.mode !== 'payment' || !s.metadata?.compra_id) return
  const admin = createAdminClient()
  if (!admin) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY.')
  const m = s.metadata
  const pi = idDe(s.payment_intent)

  if (s.status === 'expired') {
    await admin.from('compras').delete().eq('id', m.compra_id).eq('estado', 'pendiente')
    return
  }
  if (s.status !== 'complete') return

  const pagada = s.payment_status === 'paid' || s.payment_status === 'no_payment_required'
  const cambios = pagada
    ? { estado: 'pagada', pagada_at: new Date().toISOString(), caduca_at: null, stripe_payment_intent: pi, stripe_session_id: s.id }
    : { estado: 'procesando', caduca_at: null, stripe_payment_intent: pi, stripe_session_id: s.id }

  const { data } = await admin.from('compras').update(cambios).eq('id', m.compra_id).in('estado', ['pendiente', 'procesando']).select('id')
  if (data?.length) return
  const { data: actual } = await admin.from('compras').select('estado').eq('id', m.compra_id).maybeSingle()
  if (actual) return // ya pagada o reembolsada

  // La reserva se había borrado (p. ej. el aviso llegó tarde), pero el pago está hecho: se respeta.
  const { error } = await admin.from('compras').insert({
    id: m.compra_id,
    user_id: m.user_id,
    evento_id: m.evento_id || null,
    audio_id: m.audio_id || null,
    importe_cents: s.amount_total ?? 0,
    ...cambios,
  })
  if (error) console.error(`[stripe] No se ha podido registrar la compra ${m.compra_id} (sesión ${s.id})`, error)
}

/** El pago en diferido (p. ej. SEPA) ha fallado: se libera la plaza. */
export async function compraFallida(s: Stripe.Checkout.Session) {
  if (s.mode !== 'payment' || !s.metadata?.compra_id) return
  const admin = createAdminClient()
  if (!admin) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY.')
  await admin.from('compras').delete().eq('id', s.metadata.compra_id).in('estado', ['pendiente', 'procesando'])
}

/** Devolución hecha desde el Dashboard de Stripe: si es total, la compra queda reembolsada y la plaza libre. */
export async function compraReembolsada(charge: Stripe.Charge) {
  const pi = idDe(charge.payment_intent)
  if (!pi || !charge.refunded) return
  const admin = createAdminClient()
  if (!admin) throw new Error('Falta SUPABASE_SERVICE_ROLE_KEY.')
  await admin.from('compras').update({ estado: 'reembolsada' }).eq('stripe_payment_intent', pi)
}

/** Al volver de Stripe, registra ya la compra (el webhook puede tardar unos segundos). */
export async function alVolverDeCompra(sessionId: string | undefined, userId: string) {
  const stripe = getStripe()
  if (!stripe || !sessionId) return
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId)
    if (s.client_reference_id !== userId) return
    await cumplirCompra(s)
  } catch (e) {
    console.error('[stripe] Vuelta de la compra', e)
  }
}
