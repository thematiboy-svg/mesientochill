# MeSientoChill

Web de MeSientoChill (Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz), programada a partir del diseño «Fase 1».
Next.js 15 (App Router) + Supabase (login, base de datos y seguridad por filas).

## Qué incluye

**Parte pública:** Home, Clases, Método, Mónica, Precios, Eventos, Ayuda, Registro e Inicio de sesión.

**Zona privada** (`/app/...`, solo con sesión iniciada):
- Inicio: próxima clase, créditos del mes y vídeos.
- Clases en directo: calendario semanal con filtros, reserva, lista de espera (solo plan Directo y vídeos).
- Mis reservas y créditos: próximas reservas, cancelación, historial y créditos (disponibles, usados, perdidos).
- Biblioteca de vídeos, Eventos y Ayuda (maquetas estáticas por ahora).
- Mi perfil y cuestionario (con consentimiento explícito para datos de salud).
- Suscripción con Stripe: alta con Stripe Checkout, cambio entre Solo vídeos (39 €) y Directo y vídeos (49 €), y método de pago, facturas y baja en el portal de cliente de Stripe.

**Reglas de negocio** (en `supabase/schema.sql`, funciones `reservar_clase`, `cancelar_reserva`, `unirse_lista`, `creditos_mes`):
8 créditos al mes que caducan a fin de mes · máximo 10 personas por clase · una clase al día ·
cancelar hasta 24 h antes devuelve el crédito (con menos de 24 h se pierde) · reservar y no asistir pierde el crédito.

## Landing publicada y web oculta

Mientras solo esté publicada la landing (`/landing`), `middleware.ts` manda a `/landing` a quien entre en cualquier página de la web (también a `mesientochill.com`).
Para ver y trabajar en la web, entra en **`/web1`**: el navegador guarda un permiso durante 90 días y ya puedes navegar por la web con sus direcciones normales (`/web1/precios` abre directamente Precios). `/web1/salir` quita el permiso.
Siempre quedan abiertos `/landing/*`, `/api/*` (formularios) y los archivos (iconos, imágenes). Para publicar la web, cambia `WEB_PUBLICA` a `true` en `middleware.ts`.

## Puesta en marcha

1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el editor SQL ejecuta `supabase/schema.sql` y después `supabase/seed.sql` (clases de ejemplo y vídeos).
3. Copia `.env.example` a `.env.local` y rellena `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`. En Vercel también valen las variables que crea la integración de Supabase (`NEXT_PUBLIC_mesientochill_SUPABASE_URL` y `NEXT_PUBLIC_mesientochill_SUPABASE_ANON_KEY`).
4. En Supabase → Authentication, decide si exiges confirmar el email (si lo exiges, tras registrarse se avisa de que hay que confirmarlo).
5. `npm install` y `npm run dev` → http://localhost:3000

## Pagos con Stripe

Sin las variables de Stripe la web funciona igual que antes, pero sin cobros. Para activarlos (primero en modo de prueba):

1. **Base de datos.** Si la base se creó con una versión anterior de `schema.sql`, ejecuta en el editor SQL, por orden:
   - `supabase/migraciones/001_stripe.sql`: añade las columnas de facturación, impide que cada usuaria se cambie el plan o el estado de pago por su cuenta y exige una suscripción activa para reservar clases.
   - `supabase/migraciones/002_compras.sql`: crea las tablas de eventos, audios y compras, y el espacio privado `audios` de Supabase Storage.
2. **Productos.** En Stripe, crea dos productos con un precio mensual recurrente en euros: Solo vídeos (39 €) y Directo y vídeos (49 €). Copia los dos `price_…`.
3. **Portal de cliente.** En Stripe → Settings → Billing → Customer portal, activa el cambio de método de pago, el historial de facturas y la cancelación al final del periodo.
4. **Webhook.** En Stripe → Developers → Webhooks, crea un endpoint `https://TU-DOMINIO/api/stripe/webhook` con los eventos `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_succeeded`, `checkout.session.async_payment_failed`, `charge.refunded`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `customer.subscription.paused` y `customer.subscription.resumed`. Copia el `whsec_…`. En local: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
5. **Variables** (en Vercel, marcadas como «Sensitive»): `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_VIDEOS`, `STRIPE_PRICE_DIRECTO` y `SUPABASE_SERVICE_ROLE_KEY`. Opcionales: `STRIPE_TAX=on` (Stripe Tax) y `NEXT_PUBLIC_SITE_URL`.

Cómo funciona:
- Al registrarse se abre el pago de Stripe con el plan elegido. Quien aún no tenga suscripción la activa desde *Suscripción*.
- El webhook (`app/api/stripe/webhook/route.ts`) vuelve a leer cada suscripción de Stripe y la copia en `profiles` (`plan`, `estado_suscripcion`, `periodo_fin`, `cancela_al_final`), así que no importa el orden en que lleguen los eventos.
- Al pasar a Directo y vídeos se cobra al momento la parte proporcional. Si el banco pide confirmación (3D Secure), se abre la factura de Stripe y el cambio se aplica al pagarla. Al pasar a Solo vídeos, lo pagado de más se descuenta del siguiente recibo.
- Si falla un cobro (`past_due`), el acceso sigue mientras Stripe reintenta y se avisa a la usuaria para que cambie la tarjeta.

### Eventos y audios (pago único)

- **Precios**, calculados siempre en el servidor (`lib/compras.ts`):
  - Eventos: el precio general del evento (`eventos.precio_cents`, 38 € por defecto); −10 % con Solo vídeos (34,20 €) y −20 % con Directo y vídeos (30,40 €).
  - Audios: 17 € con suscripción activa y 19 € sin ella.
- **Cómo se compra.** Al pulsar *Reservar mi plaza* o *Comprar*, se aparta la plaza (o el audio) durante 31 minutos y se abre la página de pago de Stripe, que caduca a los 30. Dos personas no pueden llevarse la última plaza a la vez. Si la usuaria sale sin pagar, la plaza vuelve a quedar libre.
- **Al pagar**, el webhook marca la compra como pagada y Stripe envía el recibo y la factura por email. Las facturas aparecen también en el portal de cliente. Con los pagos que tardan en confirmarse (p. ej. adeudo SEPA), la plaza queda guardada hasta que el banco confirme o rechace el cobro.
- **Devoluciones.** Se hacen desde el Dashboard de Stripe (pago → *Reembolsar*). Con una devolución total la compra queda como reembolsada y la plaza se libera.
- **Crear eventos y audios.** Por ahora, desde el editor de tablas de Supabase (`eventos` y `audios`). Cada audio se sube al espacio `audios` de Storage y en `audios.archivo` se pone su ruta (p. ej. `respiracion/dormir.mp3`). La descarga (`/api/audios/ID/descarga`) solo funciona con una compra pagada y genera un enlace temporal de 60 segundos.
- **Coste.** Las facturas de los pagos sueltos (`invoice_creation`) usan Stripe Invoicing, que puede tener su propia comisión, distinta de la de Billing. Si prefieres solo el recibo por email, quita `invoice_creation` en `lib/compras.ts`, pero antes consulta con la gestoría qué factura necesitas emitir.

## Pendiente (no incluido todavía)

El plan completo por fases está en [ROADMAP.md](ROADMAP.md).

- **Horario de las clases en directo**: días y horas aún por decidir. Las de `supabase/seed.sql` son de ejemplo; cuando se fijen, crear las clases reales y añadir las horas a Chillsi (`lib/chillsi.ts`, tema «horarios»).
- Panel de administración para Mónica (crear clases, cancelar una clase y devolver créditos, subir vídeos).
- Emails (recordatorios, aviso a las tres primeras personas de la lista de espera, cancelación por parte de Mónica).
- Marcar asistencia (`asistio` / `no_asistio`) tras cada clase y avisar a la lista de espera al liberarse una plaza.
- Biblioteca de vídeos con filtros y reproductor reales, y chatbot Chillsi.
- Textos legales (aviso legal, privacidad, cookies, términos) y revisión legal antes de cobrar.
