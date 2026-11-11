# MeSientoChill: roadmap

El plan completo del proyecto (estado, fases, piloto, precios, legal, eventos, textos y preguntas abiertas) se mantiene en un único documento:

**[Plan del proyecto MeSientoChill](https://claude.ai/artifact/JsXvNgLEfwFuPohp4GodNm)**

Copia descargable a 11 de noviembre de 2026: [docs/MeSientoChill_plan_de_proyecto_v03.docx](docs/MeSientoChill_plan_de_proyecto_v03.docx). Si cambia algo del plan, cámbialo en el documento, no aquí.

## Pendiente en el código

Lista técnica mínima; el orden y el contexto están en el documento.

- Horario real de los directos: crear las clases en Supabase y añadir las horas a Chillsi (`lib/chillsi.ts`, tema «horarios»).
- Stripe: alta de suscripción, cambio de plan con cobro, método de pago, baja y facturas (plan en `docs/STRIPE.md`).
- Eventos con reserva y cobro de la entrada con descuento según plan.
- Panel de Mónica: crear clases y subir vídeos desde la web.
- Marcar asistencia (`asistio` / `no_asistio`) tras cada clase.
- Recordatorios por email antes de cada clase.
- Biblioteca: filtros por duración, nivel y zona del cuerpo.
- Avisos por WhatsApp: activar cuando haya número (`docs/WHATSAPP.md`).
- Legal en la web: datos del titular, términos de la suscripción, política de cancelación y banner de cookies si hace falta.
- Publicar la web: `WEB_PUBLICA = true` en `lib/site.ts`.
