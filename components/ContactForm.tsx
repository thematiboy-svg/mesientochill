'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function ContactForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const fd = new FormData(f)
    const nombre = String(fd.get('nombre') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const mensaje = String(fd.get('mensaje') || '').trim()
    if (!nombre || !/^\S+@\S+\.\S+$/.test(email) || !mensaje) {
      setError('Completa tu nombre, un email válido y el mensaje.')
      return
    }
    if (!fd.get('privacidad')) {
      setError('Acepta la política de privacidad para continuar.')
      return
    }
    setError('')
    setState('sending')
    try {
      const r = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, mensaje }),
      })
      if (!r.ok) throw new Error()
      setState('ok')
      f.reset()
    } catch {
      setState('error')
    }
  }

  if (state === 'ok') {
    return (
      <div className="card tint stack g12" role="status" style={{ flex: '1 1 420px', minWidth: 0 }}>
        <h3 className="t4">¡Mensaje enviado!</h3>
        <p>Te responderemos por email en 1–2 días laborables.</p>
      </div>
    )
  }

  return (
    <form className="card tint stack g20" style={{ flex: '1 1 420px', minWidth: 0 }} onSubmit={onSubmit} noValidate>
      <div className="field"><label htmlFor="c-n">Nombre</label><input id="c-n" name="nombre" className="in-t" type="text" placeholder="Tu nombre" autoComplete="name" /></div>
      <div className="field"><label htmlFor="c-e">Email</label><input id="c-e" name="email" className="in-t" type="email" placeholder="tu@email.com" autoComplete="email" /></div>
      <div className="field"><label htmlFor="c-m">Mensaje</label><textarea id="c-m" name="mensaje" className="in-t" placeholder="Cuéntanos qué necesitas" /></div>
      <label className="opt" style={{ alignItems: 'flex-start', fontSize: 14 }}>
        <input type="checkbox" name="privacidad" />
        <span>He leído y acepto la <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'underline' }}>política de privacidad</Link>.</span>
      </label>
      {error && <p role="alert" style={{ color: '#B3261E', fontSize: 15, fontWeight: 600 }}>{error}</p>}
      {state === 'error' && <p role="alert" style={{ color: '#B3261E', fontSize: 15, fontWeight: 600 }}>No hemos podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.</p>}
      <button className="btn b1" type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Enviando…' : 'Enviar mensaje'}</button>
    </form>
  )
}
