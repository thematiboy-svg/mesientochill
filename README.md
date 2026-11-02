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
- Suscripción: plan actual y cambio entre Solo vídeos (39 €) y Directo y vídeos (49 €).

**Reglas de negocio** (en `supabase/schema.sql`, funciones `reservar_clase`, `cancelar_reserva`, `unirse_lista`, `creditos_mes`):
8 créditos al mes que caducan a fin de mes · máximo 10 personas por clase · una clase al día ·
cancelar hasta 24 h antes devuelve el crédito (con menos de 24 h se pierde) · reservar y no asistir pierde el crédito.

## Puesta en marcha

1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el editor SQL ejecuta `supabase/schema.sql` y después `supabase/seed.sql` (clases de ejemplo y vídeos).
3. Copia `.env.example` a `.env.local` y rellena `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. En Supabase → Authentication, decide si exiges confirmar el email (si lo exiges, tras registrarse se avisa de que hay que confirmarlo).
5. `npm install` y `npm run dev` → http://localhost:3000

## Pendiente (no incluido todavía)

- Pagos con Stripe (alta de suscripción, cambio de plan con cobro, método de pago y baja).
- Panel de administración para Mónica (crear clases, cancelar una clase y devolver créditos, subir vídeos).
- Emails (recordatorios, aviso a las tres primeras personas de la lista de espera, cancelación por parte de Mónica).
- Marcar asistencia (`asistio` / `no_asistio`) tras cada clase y avisar a la lista de espera al liberarse una plaza.
- Biblioteca de vídeos con filtros y reproductor reales, página de eventos con reserva y chatbot Chillsi.
- Textos legales (aviso legal, privacidad, cookies, términos) y revisión legal antes de cobrar.
