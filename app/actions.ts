'use server'
import { redirect, unstable_rethrow } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '../lib/supabase/server'
import { getStripe, hayStripe, precioDe, type Plan } from '../lib/stripe'
import { clienteStripe, crearCheckout, sincronizarSuscripcion, urlBase } from '../lib/suscripcion'
import { ErrorCompra, iniciarCompra, type Tipo } from '../lib/compras'

export type FormState = { error?: string; ok?: string } | undefined

const NO_CONFIG = 'Falta configurar Supabase (variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY, o las de la integración de Vercel).'

export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const email = String(fd.get('email') || '').trim()
  const password = String(fd.get('password') || '')
  const nombre = String(fd.get('nombre') || '').trim()
  const apellidos = String(fd.get('apellidos') || '').trim()
  const telefono = String(fd.get('telefono') || '').trim()
  const plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  if (!nombre || !apellidos) return { error: 'Escribe tu nombre y tus apellidos.' }
  if (!email) return { error: 'Escribe tu email.' }
  if (password.length < 8) return { error: 'La contraseña debe tener al menos 8 caracteres.' }
  if (!fd.get('privacidad')) return { error: 'Debes aceptar la política de privacidad y los términos del servicio.' }
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nombre, apellidos, telefono, plan } } })
  if (error) return { error: error.message }
  if (!data.session) return { ok: 'Te hemos enviado un email para confirmar tu cuenta. Después podrás iniciar sesión y activar tu suscripción.' }
  if (hayStripe() && data.user) {
    let url: string
    try {
      url = await crearCheckout({ userId: data.user.id, email, nombre: `${nombre} ${apellidos}`, plan })
    } catch (e) {
      console.error('[stripe] Checkout tras el registro', e)
      redirect('/app/suscripcion?error=' + encodeURIComponent('Tu cuenta está creada, pero no hemos podido abrir el pago. Inténtalo de nuevo desde aquí.'))
    }
    redirect(url)
  }
  redirect('/app/perfil?bienvenida=1')
}

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const { error } = await supabase.auth.signInWithPassword({
    email: String(fd.get('email') || '').trim(),
    password: String(fd.get('password') || ''),
  })
  if (error) return { error: 'Email o contraseña incorrectos.' }
  redirect('/app/inicio')
}

export async function signOut() {
  const supabase = await createClient()
  if (supabase) await supabase.auth.signOut()
  redirect('/')
}

export async function reservar(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const session = String(fd.get('session'))
  const { data } = await supabase.rpc('reservar_clase', { p_session: session })
  const back = String(fd.get('back') || '/app/directos')
  revalidatePath('/app', 'layout')
  redirect(`${back}${back.includes('?') ? '&' : '?'}${data === 'ok' ? 'ok=reservada' : 'error=' + encodeURIComponent(String(data))}&sel=${session}`)
}

export async function unirseLista(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const session = String(fd.get('session'))
  const { data } = await supabase.rpc('unirse_lista', { p_session: session })
  const back = String(fd.get('back') || '/app/directos')
  revalidatePath('/app', 'layout')
  redirect(`${back}${back.includes('?') ? '&' : '?'}${data === 'ok' ? 'ok=lista' : 'error=' + encodeURIComponent(String(data))}&sel=${session}`)
}

export async function cancelarReserva(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data } = await supabase.rpc('cancelar_reserva', { p_reserva: String(fd.get('reserva')) })
  revalidatePath('/app', 'layout')
  redirect(`/app/reservas?${data === 'ok' ? 'ok=cancelada' : data === 'tarde' ? 'ok=cancelada_tarde' : 'error=' + encodeURIComponent(String(data))}`)
}

export async function guardarPerfil(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const nivel = String(fd.get('nivel') || '')
  const molestias = fd.getAll('molestias').map(String).filter((m) => m !== 'Ninguna')
  const tieneSalud = molestias.length > 0 || !!String(fd.get('notas_salud') || '').trim()
  if (tieneSalud && fd.get('consentimiento') !== 'on') {
    redirect('/app/perfil?error=' + encodeURIComponent('Para guardar tus datos de salud necesitamos tu consentimiento explícito.'))
  }
  await supabase
    .from('profiles')
    .update({
      nombre: String(fd.get('nombre') || ''),
      apellidos: String(fd.get('apellidos') || ''),
      telefono: String(fd.get('telefono') || '') || null,
      nivel: ['nunca', 'algo', 'regular'].includes(nivel) ? nivel : null,
      molestias,
      notas_salud: String(fd.get('notas_salud') || '') || null,
      consentimiento_salud: fd.get('consentimiento') === 'on',
      objetivos: fd.getAll('objetivos').map(String),
      franjas: fd.getAll('franjas').map(String),
    })
    .eq('id', u.user.id)
  revalidatePath('/app', 'layout')
  redirect('/app/perfil?ok=guardado')
}

const volver = (q: string) => redirect('/app/suscripcion?' + q)
const conError = (msg: string) => volver('error=' + encodeURIComponent(msg))
const SIN_STRIPE = 'Los pagos todavía no están activados.'

/** Empieza una suscripción: lleva a la página de pago de Stripe. */
export async function iniciarSuscripcion(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  if (!hayStripe()) conError(SIN_STRIPE)
  const { data: p } = await supabase.from('profiles').select('nombre, apellidos, estado_suscripcion').eq('id', u.user.id).single()
  if (p && ['active', 'trialing', 'past_due'].includes(p.estado_suscripcion ?? '')) conError('Ya tienes una suscripción activa.')
  const plan: Plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  let url: string
  try {
    url = await crearCheckout({ userId: u.user.id, email: u.user.email, nombre: `${p?.nombre ?? ''} ${p?.apellidos ?? ''}`.trim(), plan })
  } catch (e) {
    unstable_rethrow(e)
    console.error('[stripe] Checkout', e)
    return conError('No hemos podido abrir la página de pago. Inténtalo de nuevo en unos minutos.')
  }
  redirect(url)
}

/** Cambia de plan en Stripe. Al subir se cobra ya la diferencia; al bajar, la diferencia se descuenta del siguiente recibo. */
export async function cambiarPlan(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const stripe = getStripe()
  if (!stripe) return conError(SIN_STRIPE)
  const { data: p } = await supabase.from('profiles').select('plan, stripe_subscription_id').eq('id', u.user.id).single()
  if (!p?.stripe_subscription_id) return conError('No tienes ninguna suscripción activa.')
  const plan: Plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  if (plan === p.plan) return volver('ok=plan')
  const sube = plan === 'directo'
  let destino: string | null = null
  try {
    const sub = await stripe.subscriptions.retrieve(p.stripe_subscription_id)
    if (!['active', 'trialing'].includes(sub.status)) return conError('Antes de cambiar de plan, actualiza tu método de pago.')
    const nueva = await stripe.subscriptions.update(sub.id, {
      items: [{ id: sub.items.data[0].id, price: precioDe(plan) }],
      proration_behavior: sube ? 'always_invoice' : 'create_prorations',
      ...(sube ? { payment_behavior: 'pending_if_incomplete' as const } : {}),
      expand: ['latest_invoice'],
    })
    if (nueva.pending_update) {
      // El cobro de la diferencia necesita confirmación (p. ej. 3D Secure) o ha fallado: se paga en la factura de Stripe.
      const inv = nueva.latest_invoice
      destino = typeof inv === 'object' && inv?.hosted_invoice_url ? inv.hosted_invoice_url : null
      if (!destino) return conError('No hemos podido cobrar la diferencia. Revisa tu método de pago y vuelve a intentarlo.')
    } else {
      await sincronizarSuscripcion(nueva.id)
    }
  } catch (e) {
    unstable_rethrow(e)
    console.error('[stripe] Cambio de plan', e)
    return conError('No hemos podido cambiar tu plan. Inténtalo de nuevo en unos minutos.')
  }
  revalidatePath('/app', 'layout')
  if (destino) redirect(destino)
  volver('ok=plan')
}

/** Abre el portal de cliente de Stripe: método de pago, facturas y baja. */
export async function abrirPortal() {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const stripe = getStripe()
  if (!stripe) return conError(SIN_STRIPE)
  let url: string
  try {
    const customer = await clienteStripe(u.user.id, u.user.email)
    const s = await stripe.billingPortal.sessions.create({ customer, locale: 'es', return_url: `${await urlBase()}/app/suscripcion` })
    url = s.url
  } catch (e) {
    unstable_rethrow(e)
    console.error('[stripe] Portal', e)
    return conError('No hemos podido abrir la gestión de pagos. Inténtalo de nuevo en unos minutos.')
  }
  redirect(url)
}

/** Compra suelta (plaza de evento o audio): lleva a la página de pago de Stripe. */
export async function comprar(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const tipo: Tipo = fd.get('tipo') === 'audio' ? 'audio' : 'evento'
  const back = tipo === 'evento' ? '/app/eventos' : '/app/audios'
  const fallo = (msg: string) => redirect(`${back}?error=${encodeURIComponent(msg)}`)
  if (!hayStripe()) return fallo(SIN_STRIPE)
  let url: string
  try {
    url = await iniciarCompra({ userId: u.user.id, email: u.user.email, tipo, id: String(fd.get('id') || '') })
  } catch (e) {
    unstable_rethrow(e)
    if (e instanceof ErrorCompra) return fallo(e.message)
    console.error('[stripe] Compra', e)
    return fallo('No hemos podido abrir la página de pago. Inténtalo de nuevo en unos minutos.')
  }
  redirect(url)
}
