# Plan de integración con Stripe

Generado con el planificador de Stripe (`stripe_implementation_planner`, guía `iguide_61VhlU5LZ1Qrici3U41HcUBjU8dES`) sobre la cuenta de prueba «Entorno de prueba de MeSientoChill», y adaptado a esta web (Next.js 15 en Vercel + Supabase).

## Decisiones

| Tema | Decisión | Por qué |
|---|---|---|
| Cómo se paga | **Stripe Checkout alojado** (redirección a una página de Stripe) | Es la opción por defecto: tarjetas, Apple Pay/Google Pay y Link sin construir formularios de tarjeta. |
| Managed Payments | **No** | Exige vender solo bienes digitales, y MeSientoChill vende también eventos presenciales. |
| Precios | **Tarifa plana** mensual | Dos planes fijos: 39 € y 49 €. |
| Prueba gratuita | **No** | Se cobra al suscribirse. |
| Cambios de plan, baja y tarjeta | **Portal de cliente de Stripe** | Lo hace la propia persona, sin pantallas propias. Baja al final del periodo pagado. |
| Cobros fallidos | **Smart Retries + emails automáticos** (por defecto) | Se configuran en el panel de Stripe, sin código. |
| IVA | **Stripe Tax con recaudación** | Precios con IVA incluido (21 %). |
| Facturas | **Facturas de Stripe** en cada cobro, visibles en el portal | Las suscripciones generan factura sola; en los pagos únicos se activa `invoice_creation`. |

## Productos y precios (EUR, IVA incluido)

| Producto | Precio | Tipo |
|---|---|---|
| Plan Solo vídeos | 39 €/mes | Suscripción |
| Plan Directo y vídeos | 49 €/mes | Suscripción |
| Evento (uno por evento) | 38 € sin suscripción · 34,20 € con Solo vídeos · 30,40 € con Directo y vídeos | Pago único |
| Audio de Mindfulness (uno por audio) | 19 € sin suscripción · 17 € con suscripción | Pago único |

El precio correcto de eventos y audios lo elige **el servidor** según el plan activo de la persona (no se fía del navegador). Todos los precios se crean con `tax_behavior: inclusive`.

## Cómo funciona

1. **Cliente de Stripe por usuaria.** Al pagar por primera vez se crea un Customer en Stripe y se guarda su id en `profiles.stripe_customer_id`.
2. **Suscribirse.** El botón llama a una Server Action que crea un Checkout Session en modo `subscription` (`automatic_tax`, recogida de dirección y NIF opcional) y redirige a Stripe.
3. **Pagos únicos.** Eventos y audios usan Checkout Session en modo `payment` con `invoice_creation` para que haya factura.
4. **Webhook** `POST /api/stripe/webhook`, con la firma comprobada (`STRIPE_WEBHOOK_SECRET`). Es la única fuente de verdad para el plan y las compras:

   | Evento | Qué hace en Supabase |
   |---|---|
   | `checkout.session.completed` | Suscripción: guarda `stripe_subscription_id`, plan y estado. Pago único: registra la compra (evento o audio). |
   | `invoice.paid` | Renueva el acceso del mes. |
   | `invoice.payment_failed` | Marca el pago pendiente y avisa de que actualice la tarjeta en el portal. |
   | `customer.subscription.updated` | Cambio de plan o baja programada: actualiza plan, estado y fin de periodo. |
   | `customer.subscription.deleted` | Baja efectiva: quita el acceso. |

   El webhook escribe con la clave de servicio de Supabase (ya existe en Vercel como `mesientochill_SUPABASE_SERVICE_ROLE_KEY`) y debe ser idempotente: Stripe puede repetir eventos.
5. **Portal de cliente.** Desde «Suscripción» se crea una sesión del portal y se redirige. Configuración: cambiar entre los dos planes (con prorrateo), baja al final del periodo, cambiar tarjeta e historial de facturas.
6. **Descarga de audios.** Solo si existe la compra registrada: el servidor genera un enlace temporal de Supabase Storage (espacio privado).

## Cambios en la base de datos

- `profiles`: `stripe_customer_id`, `stripe_subscription_id`, `subscription_status` (`active`, `past_due`, `canceled`…) y `current_period_end`.
- Nueva tabla `compras` (usuaria, tipo `evento` o `audio`, id del producto, `stripe_checkout_session_id`, importe, fecha), con RLS para que cada persona solo vea las suyas.
- **Importante:** hoy el registro guarda el plan elegido sin pagar. Con Stripe, el plan solo cuenta como activo cuando la suscripción está activa según el webhook.

## Variables de entorno (Vercel, marcadas como «Sensitive»)

- `STRIPE_SECRET_KEY`: primero la de prueba (`sk_test_…`), nunca en el código ni en el chat.
- `STRIPE_WEBHOOK_SECRET`: la da Stripe al crear el endpoint del webhook (`whsec_…`).

## Configuración en el panel de Stripe

- **Stripe Tax:** dirección de la empresa, registro de IVA en España y código de impuesto por defecto de los productos. Si se vende a particulares de otros países de la UE, revisar el régimen OSS.
- **Facturas:** datos fiscales de la empresa (razón social, NIF, dirección) para que salgan en las facturas.
- **Cobros fallidos:** Smart Retries, emails de pago fallido y actualización automática de tarjetas.
- **Portal de cliente:** la configuración del punto 5.
- **Métodos de pago:** métodos de pago dinámicos y Link activados.

## Fases de construcción

1. **Suscripciones:** productos y precios, Checkout de suscripción, webhook, portal y bloqueo de funciones según el estado real de la suscripción.
2. **Eventos:** pago único con precio según plan y registro de la compra.
3. **Audios:** pago único, tabla de compras y descarga con enlace temporal (Supabase Storage).
4. **Paso a real:** claves `sk_live`, webhook de producción, Stripe Tax con el registro real y revisión con la gestoría.

## A tener en cuenta

- **Facturación en España:** las facturas de Stripe pueden no cubrir requisitos españoles como Verifactu. Confirmarlo con la gestoría antes de cobrar de verdad.
- **Pruebas:** todo se construye y prueba en el entorno de prueba con tarjetas de prueba de Stripe; nada cobra dinero real hasta la fase 4.
- **Red de las sesiones de Claude Code:** para que el código hable con Stripe desde el entorno de desarrollo, `api.stripe.com` debe estar en los dominios permitidos.
