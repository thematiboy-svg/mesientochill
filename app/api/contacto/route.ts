import { NextResponse } from 'next/server'

// Envía el mensaje de contacto por email con Resend.
// Requiere RESEND_API_KEY y CONTACT_TO_EMAIL (y opcionalmente CONTACT_FROM_EMAIL).
// Si no están configuradas devuelve 503 y el formulario muestra un error.
export async function POST(req: Request) {
  let body: { nombre?: string; email?: string; mensaje?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON no válido' }, { status: 400 })
  }
  const nombre = (body.nombre || '').trim().slice(0, 120)
  const email = (body.email || '').trim().slice(0, 200)
  const mensaje = (body.mensaje || '').trim().slice(0, 5000)
  if (!nombre || !/^\S+@\S+\.\S+$/.test(email) || !mensaje) {
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
      subject: `Contacto web: ${nombre}`,
      text: `De: ${nombre} <${email}>\n\n${mensaje}`,
    }),
  })
  if (!r.ok) return NextResponse.json({ error: 'No se pudo enviar' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
