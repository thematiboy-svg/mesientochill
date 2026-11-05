import Stripe from 'stripe'

// Stripe (Billing) para las suscripciones mensuales.
// Variables de entorno (solo servidor, márcalas como «Sensitive» en Vercel):
//   STRIPE_SECRET_KEY       sk_test_… en pruebas, sk_live_… en producción
//   STRIPE_WEBHOOK_SECRET   whsec_… del endpoint /api/stripe/webhook
//   STRIPE_PRICE_VIDEOS     price_… del plan Solo vídeos (39 €/mes)
//   STRIPE_PRICE_DIRECTO    price_… del plan Directo y vídeos (49 €/mes)
//   STRIPE_TAX=on           opcional: activa Stripe Tax en el pago

export type Plan = 'videos' | 'directo'

const secret = process.env.STRIPE_SECRET_KEY || ''
const precios: Record<Plan, string> = {
  videos: process.env.STRIPE_PRICE_VIDEOS || '',
  directo: process.env.STRIPE_PRICE_DIRECTO || '',
}

export const hayStripe = () => !!(secret && precios.videos && precios.directo)

let cliente: Stripe | null = null
/** Cliente de Stripe. Devuelve null si faltan las variables de entorno. */
export function getStripe(): Stripe | null {
  if (!hayStripe()) return null
  cliente ??= new Stripe(secret, { appInfo: { name: 'MeSientoChill' } })
  return cliente
}

export const precioDe = (plan: Plan) => precios[plan]
export const planDePrecio = (priceId: string | undefined): Plan | null =>
  priceId === precios.directo ? 'directo' : priceId === precios.videos ? 'videos' : null

export const impuestosAutomaticos = () => process.env.STRIPE_TAX === 'on'

/** Estados de Stripe que dan acceso. `past_due`: Stripe está reintentando el cobro. */
export const ESTADOS_CON_ACCESO = ['active', 'trialing', 'past_due'] as const
export const tieneAcceso = (estado: string | null | undefined) =>
  !!estado && (ESTADOS_CON_ACCESO as readonly string[]).includes(estado)
