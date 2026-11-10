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
Siempre quedan abiertos `/landing/*`, `/api/*` (formularios) y los archivos (iconos, imágenes). Para publicar la web, cambia `WEB_PUBLICA` a `true` en `lib/site.ts`.

## SEO (Google)

- `app/robots.ts` → `/robots.txt` y `app/sitemap.ts` → `/sitemap.xml`. El sitemap solo lista la landing mientras `WEB_PUBLICA` sea `false`; al ponerlo a `true` lista las páginas de la web.
- Títulos, descripciones, enlace canónico y vista previa para redes (Open Graph) en `app/layout.tsx` y en cada `page.tsx`. Dominio: `NEXT_PUBLIC_SITE_URL` (por defecto `https://www.mesientochill.com`).
- Datos estructurados (schema.org: organización, Mónica y preguntas frecuentes) en `lib/site.ts`.
- Login, registro, recuperar contraseña y la zona privada llevan `noindex`.
- **Google Search Console:** añade la propiedad `mesientochill.com`, verifica (DNS, o pon el código de la «Etiqueta HTML» en la variable `GOOGLE_SITE_VERIFICATION` de Vercel y redespliega) y envía `https://www.mesientochill.com/sitemap.xml`.

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

## Panel de Mónica, cancelar una clase y lista de espera

Los emails de la tabla `admins` (hoy, monica@mesientochill.com, con el email confirmado) ven en la zona privada **Gestionar clases**: las clases de las próximas 4 semanas, quién tiene plaza, la lista de espera y el botón para cancelar.


- **Cancelar una clase:** Mónica entra en la web con monica@mesientochill.com → **Gestionar clases** → «Cancelar clase» (también se puede marcar `cancelada` en Supabase → `class_sessions`). Las reservas pasan a «Cancelada por Mónica» (el crédito se devuelve), a quien tenía plaza o estaba en lista de espera le llega un email, la lista se vacía y se borra la reunión de Zoom. No borres la fila: márcala como cancelada.
- **Plaza libre:** cuando alguien cancela su reserva, las tres primeras personas de la lista de espera reciben un email con el enlace para reservar; se la queda quien reserve primero.

## Pendiente (no incluido todavía)

El plan completo por fases está en [ROADMAP.md](ROADMAP.md).

- **Horario de las clases en directo**: días y horas aún por decidir. Las de `supabase/seed.sql` son de ejemplo; cuando se fijen, crear las clases reales y añadir las horas a Chillsi (`lib/chillsi.ts`, tema «horarios»).
- Pagos con Stripe (alta de suscripción, cambio de plan con cobro, método de pago y baja).
- Panel de administración para Mónica (crear clases, cancelar una clase y devolver créditos, subir vídeos).
- Emails de recordatorio antes de cada clase.
- Marcar asistencia (`asistio` / `no_asistio`) tras cada clase.
- Página de eventos con reserva.
- Textos legales (aviso legal, privacidad, cookies, términos) y revisión legal antes de cobrar.
