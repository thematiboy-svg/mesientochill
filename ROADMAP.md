# MeSientoChill: roadmap del proyecto

Actualizado el 11 de noviembre de 2026. Las fases van en orden de dependencia; no hay fechas porque todavía no se han fijado.

## Fase 0 · Hecho

- Marca y landing diseñadas (escritorio, tablet y móvil) y publicadas.
- Diseño web Fase 1: 8 páginas públicas y 8 de la zona privada, en escritorio, tablet y móvil.
- Páginas legales diseñadas y programadas: Política de privacidad, Aviso legal, Cookies, Accesibilidad y Contacto.
- Footer con enlaces legales e iconos de redes sociales (Instagram, TikTok, Facebook, YouTube).
- Prototipos navegables de la web/app y de la landing.
- App Next.js con todas las páginas públicas y legales, y formulario de contacto con endpoint `/api/contacto`.
- Landing del piloto como portada, con páginas legales, Chillsi y email de respuesta propios; la web queda oculta tras `/web1`.
- Enlaces reales a Instagram, TikTok, Facebook y YouTube.
- Zona privada con Supabase: registro (con WhatsApp), login, recuperar contraseña, reservas, lista de espera, créditos y RLS.
- Zoom automático por clase y emails de confirmación, clase cancelada y plaza libre.
- Biblioteca de vídeos con YouTube y panel de Mónica para gestionar y cancelar clases.
- Plan de integración con Stripe (`docs/STRIPE.md`).
- SEO técnico: sitemap, robots.txt, metadatos, Open Graph, datos estructurados y verificación en Google Search Console.

## Fase 1 · Cerrar la web pública (antes de publicar)

Bloquea el lanzamiento de la parte pública.

1. **Datos del titular** en los textos legales: nombre o razón social, NIF, dirección, Registro Mercantil si procede.
2. **Revisión legal** de Privacidad, Aviso legal y Cookies por un abogado (los textos son una plantilla basada en RGPD y LSSI). Decidir si el formulario basta como medio de contacto en el Aviso legal.
3. **Cookies:** listar las cookies reales que usará la web y, si hay opcionales, añadir el banner de consentimiento.
4. **Accesibilidad:** completar los datos de la auditoría y de los subtítulos.
5. ~~**Redes sociales:** sustituir los enlaces provisionales por los perfiles reales.~~ Hecho.
6. **Formulario de contacto:** configurar `RESEND_API_KEY` y `CONTACT_TO_EMAIL` (y opcionalmente `CONTACT_FROM_EMAIL`) en el entorno de producción y probar un envío.
7. **Figma de la landing:** actualizarlo con el diseño actual (pendiente por el límite de llamadas del plan Starter de Figma).

## Fase 2 · Zona privada con Supabase

Casi terminada: hechos los puntos 1, 2, 4 (salvo eventos) y 5, y casi todas las pantallas. Falta el horario real, eventos con reserva, crear clases y subir vídeos desde el panel de Mónica y marcar asistencia.

1. Autenticación: registro, inicio de sesión y recuperación de contraseña, con el campo WhatsApp en el registro.
2. Base de datos: usuarias, planes, créditos, reservas, clases, eventos y vídeos.
3. Pantallas: Inicio, Clases en directo, Mis reservas y créditos, Biblioteca de vídeos, Eventos, Mi perfil y cuestionario, Suscripción y facturas, Ayuda con Chillsi.
4. Reglas de negocio: 8 créditos al mes, máximo 10 personas por clase, precios de eventos según plan (38 € / 30,40 € / 34,20 €).
5. Permisos de acceso a datos (RLS) para que cada usuaria solo vea lo suyo.
6. **Horario de las clases en directo (pendiente de decidir).** Fijar días y horas de las tres franjas (hora del café, de la comida y después del trabajo). Las 11:00, 14:00 y 19:00 de `supabase/seed.sql` son solo de ejemplo. Cuando estén decididas: crear las clases reales en Supabase y añadir las horas a la respuesta «Horarios» de Chillsi (`lib/chillsi.ts`), que ahora no da horas concretas.

## Fase 3 · Pagos y suscripciones

1. Integración con Stripe: planes Solo vídeos (39 €) y Directo y vídeos (49 €), cambio de plan y cancelación.
2. Cobro de eventos con el descuento según plan.
3. Facturas y portal de pago.
4. Avisos por email: confirmaciones de reserva, recibos y recordatorios.
5. Audios de Mindfulness descargables, a la venta sueltos (más adelante, quizá algún pack):
   - Precio: 17 € para personas suscritas y 19 € para quien no tenga suscripción.
   - Pago con Stripe y descarga desde la cuenta.
   - Almacenamiento propuesto: Supabase Storage, en un espacio privado; la descarga se hace con un enlace temporal que solo se genera si la compra está registrada.

## Fase 4 · Calidad y lanzamiento

1. Pruebas de extremo a extremo de los flujos clave: registro, reserva, pago, cancelación.
2. Revisión de accesibilidad (WCAG 2.2 AA) y rendimiento en móvil.
3. Entorno de producción: variables de entorno, copias de seguridad y monitorización (dominio y SEO ya hechos).
4. Google Search Console: enviar `sitemap.xml` y pedir la indexación de `/landing`. Al publicar la web, poner `WEB_PUBLICA` a `true` en `lib/site.ts`.
5. Compilar, comprobar y entregar.

## Fase 5 · Después del lanzamiento

- Medir y ajustar: uso de créditos, asistencia a clases, bajas.
- Contenido para SEO: artículos sobre lo que busca la gente (pilates en casa, estrés laboral) y Perfil de Empresa en Google.
- Mejoras de contenido (biblioteca de vídeos, eventos) según lo que pida la comunidad.
- Revisar los textos legales cuando cambien los servicios o las cookies.

## Dependencias clave

- Fase 1, puntos 1 a 3, antes de publicar nada.
- Fase 3 depende de la Fase 2 (usuarias, planes y créditos).
- Fase 4 depende de las Fases 1 a 3.
