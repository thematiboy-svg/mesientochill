import { NextResponse } from 'next/server'

// Recibe las altas del formulario «Apúntate al piloto» de /landing, las envía por email con Resend
// y manda a la persona un email de respuesta: «Gracias por apuntarte…».
// Usa las mismas variables que el formulario de contacto: RESEND_API_KEY y CONTACT_TO_EMAIL (por defecto info@mesientochill.com)
// (y opcionalmente CONTACT_FROM_EMAIL). Sin ellas devuelve 503 y el formulario muestra un error.
export async function POST(req: Request) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON no válido' }, { status: 400 })
  }
  const get = (k: string, max: number) => String(body[k] ?? '').trim().slice(0, max)
  const nombre = get('nombre', 120)
  const apellidos = get('apellidos', 160)
  const email = get('email', 200)
  const whatsapp = get('whatsapp', 40)
  const franja = get('franja', 60)
  const plan = get('plan', 60)
  if (!nombre || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL || 'info@mesientochill.com'
  if (!key || !to) {
    return NextResponse.json({ error: 'Envío no configurado' }, { status: 503 })
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'MeSientoChill <onboarding@resend.dev>',
      to: [to],
      reply_to: email,
      subject: `Alta piloto: ${nombre} ${apellidos}`.trim(),
      text: [
        `Nombre: ${nombre} ${apellidos}`.trim(),
        `Email: ${email}`,
        `WhatsApp: ${whatsapp || '—'}`,
        `Plan que solicita: ${plan || '—'}`,
        `Franja preferida: ${franja || '—'}`,
      ].join('\n'),
    }),
  })
  if (!r.ok) return NextResponse.json({ error: 'No se pudo enviar' }, { status: 502 })

  // Email de respuesta a la persona que se ha apuntado. Si falla, el alta ya
  // está registrada (nos ha llegado arriba), así que no damos error al formulario.
  const saludo = `Hola, ${nombre}:`
  const mensaje = 'Gracias por apuntarte. Te vamos informando de cuando comenzamos.'
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || 'MeSientoChill <onboarding@resend.dev>',
      to: [email],
      reply_to: to,
      subject: 'Gracias por apuntarte a MeSientoChill',
      text: `${saludo}\n\n${mensaje}\n\nUn abrazo,\nEl equipo de MeSientoChill\nhttps://www.mesientochill.com`,
      html: `<div style="font-family:Montserrat,Arial,sans-serif;font-size:16px;line-height:1.6;color:#0E2F2B;max-width:520px">
<p>${escapar(saludo)}</p>
<p>${mensaje}</p>
<p>Un abrazo,<br>El equipo de MeSientoChill</p>
<p><a href="https://www.mesientochill.com" style="color:#006B5E">www.mesientochill.com</a></p>
</div>`,
    }),
  }).catch(() => null)

  return NextResponse.json({ ok: true })
}

const escapar = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
