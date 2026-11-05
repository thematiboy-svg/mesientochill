import type Stripe from 'stripe'
import { headers } from 'next/headers'
import { createAdminClient } from './supabase/admin'
import { getStripe, impuestosAutomaticos, planDePrecio, precioDe, tieneAcceso, type Plan } from './stripe'

/** URL pública de la web, para las direcciones de vuelta desde Stripe. */
export async function urlBase() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  const h = await headers()
  const host = h.get('x-forwarded-host') || h.get('host') || 'localhost:3000'
  const proto = h.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

/** Devuelve el cliente de Stripe de la usuaria y lo crea si aún no existe. */
export async function clienteStripe(userId: string, email: string | undefined, nombre?: string): Promise<string> {
  const stripe = getStripe()
  const admin = createAdminClient()
  if (!stripe || !admin) throw new Error('Stripe no está configurado.')
  const { data: p } = await admin.from('profiles').select('stripe_customer_id').eq('id', userId).single()
  if (p?.stripe_customer_id) return p.stripe_customer_id
  const c = await stripe.customers.create(
    { email, name: nombre || undefined, metadata: { user_id: userId } },
    { idempotencyKey: `cliente-${userId}` },
  )
  await admin.from('profiles').update({ stripe_customer_id: c.id }).eq('id', userId)
  return c.id
}

/** Crea una sesión de Stripe Checkout para empezar una suscripción. Devuelve la URL de pago. */
export async function crearCheckout(opts: { userId: string; email?: string; nombre?: string; plan: Plan }): Promise<string> {
  const stripe = getStripe()
  if (!stripe) throw new Error('Stripe no está configurado.')
  const customer = await clienteStripe(opts.userId, opts.email, opts.nombre)
  const base = await urlBase()
  const tax = impuestosAutomaticos()
  const s = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    client_reference_id: opts.userId,
    line_items: [{ price: precioDe(opts.plan), quantity: 1 }],
    subscription_data: { metadata: { user_id: opts.userId }, billing_mode: { type: 'flexible' } },
    metadata: { user_id: opts.userId },
    locale: 'es',
    automatic_tax: { enabled: tax },
    ...(tax ? { customer_update: { address: 'auto' as const, name: 'auto' as const } } : {}),
    success_url: `${base}/app/suscripcion?ok=pago&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/app/suscripcion?error=${encodeURIComponent('Has salido del pago. Tu suscripción no se ha activado.')}`,
  })
  if (!s.url) throw new Error('Stripe no ha devuelto la página de pago.')
  return s.url
}

const aFecha = (seg: number | null | undefined) => (seg ? new Date(seg * 1000).toISOString() : null)

/**
 * Copia en Supabase el estado de una suscripción de Stripe.
 * Siempre vuelve a leerla de Stripe, así no importa el orden en que lleguen los eventos.
 */
export async function sincronizarSuscripcion(subId: string) {
  const stripe = getStripe()
  const admin = createAdminClient()
  if (!stripe || !admin) throw new Error('Faltan las variables de Stripe o SUPABASE_SERVICE_ROLE_KEY.')
  const sub: Stripe.Subscription = await stripe.subscriptions.retrieve(subId)
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer.id

  let userId = sub.metadata?.user_id || null
  if (!userId) {
    const { data } = await admin.from('profiles').select('id').eq('stripe_customer_id', customerId).maybeSingle()
    userId = data?.id ?? null
  }
  if (!userId) {
    console.warn(`[stripe] Suscripción ${sub.id} sin usuaria asociada (cliente ${customerId}).`)
    return
  }

  const { data: actual } = await admin.from('profiles').select('stripe_subscription_id, estado_suscripcion').eq('id', userId).single()
  // Una suscripción antigua ya terminada no debe pisar a la vigente.
  if (actual?.stripe_subscription_id && actual.stripe_subscription_id !== sub.id && !tieneAcceso(sub.status) && tieneAcceso(actual.estado_suscripcion)) return

  const item = sub.items.data[0]
  const plan = planDePrecio(item?.price.id)
  await admin
    .from('profiles')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      estado_suscripcion: sub.status,
      periodo_fin: aFecha(item?.current_period_end),
      cancela_al_final: sub.cancel_at_period_end || !!sub.cancel_at,
      ...(plan ? { plan } : {}),
      ...(sub.start_date ? { suscrita_desde: aFecha(sub.start_date)!.slice(0, 10) } : {}),
    })
    .eq('id', userId)
}
