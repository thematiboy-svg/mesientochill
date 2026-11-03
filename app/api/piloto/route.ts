import { NextResponse } from 'next/server'

// Recibe las altas del formulario «Apúntate al piloto» de /landing y las envía por email con Resend.
// Usa las mismas variables que el formulario de contacto: RESEND_API_KEY y CONTACT_TO_EMAIL
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
  if (!nombre || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 })
  }
  const key = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_TO_EMAIL
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
        `Franja preferida: ${franja || '—'}`,
      ].join('\n'),
    }),
  })
  if (!r.ok) return NextResponse.json({ error: 'No se pudo enviar' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
