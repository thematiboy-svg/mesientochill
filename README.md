# MeSientoChill

Web de MeSientoChill (Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz), programada a partir del diseño «Fase 1».
Next.js 15 (App Router) + Supabase (login, base de datos y seguridad por filas).

## Qué incluye

**Parte pública:** Home, Clases, Método, Mónica, Precios, Eventos, Ayuda, Registro e Inicio de sesión.

**Zona privada** (`/app/...`, solo con sesión iniciada):
- Inicio: próxima clase, créditos del mes y vídeos.
- Clases en directo: calendario semanal con filtros, reserva, lista de espera (solo plan Directo y vídeos).
- Mis reservas y créditos: próximas reservas, cancelación, historial y créditos (disponibles, usados, perdidos).
- Biblioteca de vídeos: vídeos de YouTube «No listados», con filtro por disciplina y reproductor dentro de la web (ver «Añadir vídeos»).
- Eventos y Ayuda (maquetas estáticas por ahora).
- Mi perfil y cuestionario (con consentimiento explícito para datos de salud).
- Suscripción: plan actual y cambio entre Solo vídeos (39 €) y Directo y vídeos (49 €).

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

## Añadir vídeos

Los vídeos están en YouTube como **No listado** (los «Privados» no se pueden ver dentro de otra web). Para añadir uno:

1. En YouTube Studio sube el vídeo con visibilidad **No listado** y copia su enlace.
2. En Supabase → Table Editor → `videos` → **Insert row**: `titulo`, `disciplina` (`Pilates`, `Total Barre` o `Mindfulness`), `nivel`, `minutos`, `zona` y en `url` el enlace de YouTube.

Solo las personas con sesión iniciada pueden leer los enlaces (RLS). Un vídeo sin `url` sale como «Próximamente».

## Zoom (clases en directo)

Al reservar una clase, la web crea la reunión de Zoom de esa clase (solo la primera vez) y envía a la persona un email con el botón «Entrar al directo» y la clase para su calendario (.ics). El enlace también aparece en Inicio y en Mis reservas, solo para quien tiene plaza (tabla `class_zoom`, con RLS).

Configuración (una vez): en marketplace.zoom.us → Develop → Build App → **Server-to-Server OAuth**, con los permisos `meeting:write:meeting:admin` y `meeting:delete:meeting:admin`, y activarla. Después, en Vercel (marcadas como Sensitive): `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` y, si la app no la crea la cuenta de Mónica, `ZOOM_USER` con su email de Zoom. Sin estas variables las reservas funcionan y el email dice que el enlace estará en Mis reservas.

## Pendiente (no incluido todavía)

El plan completo por fases está en [ROADMAP.md](ROADMAP.md).

- **Horario de las clases en directo**: días y horas aún por decidir. Las de `supabase/seed.sql` son de ejemplo; cuando se fijen, crear las clases reales y añadir las horas a Chillsi (`lib/chillsi.ts`, tema «horarios»).
- Pagos con Stripe (alta de suscripción, cambio de plan con cobro, método de pago y baja).
- Panel de administración para Mónica (crear clases, cancelar una clase y devolver créditos, subir vídeos).
- Emails (recordatorios, aviso a las tres primeras personas de la lista de espera, cancelación por parte de Mónica).
- Marcar asistencia (`asistio` / `no_asistio`) tras cada clase y avisar a la lista de espera al liberarse una plaza.
- Página de eventos con reserva.
- Textos legales (aviso legal, privacidad, cookies, términos) y revisión legal antes de cobrar.
