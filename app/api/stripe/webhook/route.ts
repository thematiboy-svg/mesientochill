import type Stripe from 'stripe'
import { getStripe } from '../../../../lib/stripe'
import { sincronizarSuscripcion } from '../../../../lib/suscripcion'
import { compraFallida, compraReembolsada, cumplirCompra } from '../../../../lib/compras'

// Endpoint de webhooks de Stripe: https://TU-DOMINIO/api/stripe/webhook
// Eventos que hay que activar en Stripe:
//   checkout.session.completed
//   customer.subscription.created, customer.subscription.updated, customer.subscription.deleted
//   customer.subscription.paused, customer.subscription.resumed
//   checkout.session.expired, checkout.session.async_payment_succeeded, checkout.session.async_payment_failed
//   charge.refunded
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const stripe = getStripe()
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!stripe || !secret) return new Response('Stripe no está configurado.', { status: 503 })

  const firma = req.headers.get('stripe-signature')
  if (!firma) return new Response('Falta la firma.', { status: 400 })

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(await req.text(), firma, secret)
  } catch {
    return new Response('Firma no válida.', { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const s = event.data.object
        if (s.mode === 'subscription' && s.subscription) {
          await sincronizarSuscripcion(typeof s.subscription === 'string' ? s.subscription : s.subscription.id)
        } else if (s.mode === 'payment') {
          await cumplirCompra(s)
        }
        break
      }
      // Pagos sueltos (eventos y audios)
      case 'checkout.session.expired':
      case 'checkout.session.async_payment_succeeded':
        await cumplirCompra(event.data.object)
        break
      case 'checkout.session.async_payment_failed':
        await compraFallida(event.data.object)
        break
      case 'charge.refunded':
        await compraReembolsada(event.data.object)
        break
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
      case 'customer.subscription.paused':
      case 'customer.subscription.resumed':
        await sincronizarSuscripcion(event.data.object.id)
        break
    }
  } catch (e) {
    console.error(`[stripe] Error al procesar ${event.type} (${event.id})`, e)
    // 500: Stripe reintenta el evento más tarde.
    return new Response('Error al procesar el evento.', { status: 500 })
  }
  return Response.json({ recibido: true })
}
