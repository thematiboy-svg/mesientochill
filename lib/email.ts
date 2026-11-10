// Envío de emails con Resend (RESEND_API_KEY; remitente CONTACT_FROM_EMAIL).
type Adjunto = { filename: string; content: string } // content en base64

export async function enviarEmail(m: { to: string; subject: string; html: string; text: string; attachments?: Adjunto[] }) {
  const key = process.env.RESEND_API_KEY
  if (!key) return false
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'MeSientoChill <onboarding@resend.dev>',
      reply_to: process.env.CONTACT_TO_EMAIL || 'info@mesientochill.com',
      to: [m.to],
      subject: m.subject,
      html: m.html,
      text: m.text,
      attachments: m.attachments,
    }),
  })
  if (!r.ok) console.error('Resend:', r.status, await r.text())
  return r.ok
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

/** Email de reserva confirmada con el enlace de Zoom (si lo hay) y la clase en un .ics para el calendario. */
export function emailReserva(d: { nombre: string; disciplina: string; cuando: string; inicio: string; zoom: string | null; web: string }) {
  const boton = d.zoom
    ? `<p style="margin:28px 0"><a href="${esc(d.zoom)}" style="background:#006B5E;color:#fff;padding:14px 26px;border-radius:999px;text-decoration:none;font-weight:bold">Entrar al directo</a></p>
<p style="font-size:14px;color:#3B5753">Si el botón no funciona, copia este enlace: <a href="${esc(d.zoom)}" style="color:#006B5E">${esc(d.zoom)}</a></p>`
    : `<p>El enlace para entrar al directo estará en <a href="${d.web}/app/reservas" style="color:#006B5E">Mis reservas</a> antes de la clase.</p>`
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0E2F2B">
<h2 style="color:#006B5E">¡Clase reservada!</h2>
<p>Hola${d.nombre ? `, ${esc(d.nombre)}` : ''}:</p>
<p>Tienes plaza en <b>${esc(d.disciplina)}</b> con Mónica Muñoz el <b>${esc(d.cuando)}</b>. Son 20 minutos en directo por Zoom.</p>
${boton}
<p style="font-size:14px;color:#3B5753">Entra un par de minutos antes. Si no puedes venir, cancela desde Mis reservas hasta 24 horas antes y no pierdes el crédito.</p>
<p>El equipo de MeSientoChill</p>
</div>`
  const text = [
    `Hola${d.nombre ? `, ${d.nombre}` : ''}:`,
    '',
    `Tienes plaza en ${d.disciplina} con Mónica Muñoz el ${d.cuando}. Son 20 minutos en directo por Zoom.`,
    d.zoom ? `Entra al directo: ${d.zoom}` : `El enlace estará en Mis reservas antes de la clase: ${d.web}/app/reservas`,
    '',
    'Si no puedes venir, cancela desde Mis reservas hasta 24 horas antes y no pierdes el crédito.',
    '',
    'El equipo de MeSientoChill',
  ].join('\n')
  const t = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const fin = new Date(new Date(d.inicio).getTime() + 20 * 60_000).toISOString()
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//MeSientoChill//Reservas//ES', 'METHOD:PUBLISH',
    'BEGIN:VEVENT', `UID:${t(d.inicio)}-${d.disciplina.replace(/\W/g, '')}@mesientochill.com`, `DTSTAMP:${t(new Date().toISOString())}`,
    `DTSTART:${t(d.inicio)}`, `DTEND:${t(fin)}`, `SUMMARY:${d.disciplina} con Mónica · MeSientoChill`,
    ...(d.zoom ? [`LOCATION:${d.zoom}`, `URL:${d.zoom}`, `DESCRIPTION:Entra al directo: ${d.zoom}`] : [`DESCRIPTION:Enlace en ${d.web}/app/reservas`]),
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:Tu clase empieza en 15 minutos', 'END:VALARM',
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  return { html, text, attachments: [{ filename: 'clase-mesientochill.ics', content: Buffer.from(ics).toString('base64') }] }
}

function plantilla(titulo: string, nombre: string, cuerpo: string[], boton?: { texto: string; href: string }, nota?: string) {
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#0E2F2B">
<h2 style="color:#006B5E">${esc(titulo)}</h2>
<p>Hola${nombre ? `, ${esc(nombre)}` : ''}:</p>
${cuerpo.map((p) => `<p>${p}</p>`).join('\n')}
${boton ? `<p style="margin:28px 0"><a href="${esc(boton.href)}" style="background:#006B5E;color:#fff;padding:14px 26px;border-radius:999px;text-decoration:none;font-weight:bold">${esc(boton.texto)}</a></p>` : ''}
${nota ? `<p style="font-size:14px;color:#3B5753">${nota}</p>` : ''}
<p>El equipo de MeSientoChill</p>
</div>`
  const plano = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  const text = [`Hola${nombre ? `, ${nombre}` : ''}:`, '', ...cuerpo.map(plano), ...(boton ? ['', `${boton.texto}: ${boton.href}`] : []), ...(nota ? ['', plano(nota)] : []), '', 'El equipo de MeSientoChill'].join('\n')
  return { html, text }
}

/** Mónica ha cancelado la clase. enLista: la persona estaba en la lista de espera (no gastó crédito). */
export function emailCancelacion(d: { nombre: string; disciplina: string; cuando: string; enLista: boolean; web: string }) {
  return plantilla(
    'Clase cancelada',
    d.nombre,
    [
      `Lo sentimos: Mónica ha tenido que cancelar la clase de <b>${esc(d.disciplina)}</b> del <b>${esc(d.cuando)}</b>.`,
      d.enLista ? 'Estabas en la lista de espera de esta clase, así que ya no hace falta que hagas nada.' : 'No pierdes nada: el crédito de esta clase vuelve a estar disponible para que reserves otra.',
    ],
    { texto: 'Reservar otra clase', href: `${d.web}/app/directos` },
  )
}

/** Se ha liberado una plaza en una clase en la que la persona está en lista de espera. */
export function emailPlazaLibre(d: { nombre: string; disciplina: string; cuando: string; sessionId: string; web: string }) {
  return plantilla(
    '¡Se ha liberado una plaza!',
    d.nombre,
    [`Hay una plaza libre en <b>${esc(d.disciplina)}</b> con Mónica el <b>${esc(d.cuando)}</b>, la clase en la que estás en lista de espera.`],
    { texto: 'Reservar la plaza', href: `${d.web}/app/directos?sel=${d.sessionId}` },
    'Hemos avisado también a otras personas de la lista: se queda la plaza quien la reserve primero.',
  )
}
