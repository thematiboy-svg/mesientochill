'use client'
import Link from 'next/link'
import { useState } from 'react'

const FRANJAS = ['Hora del café', 'Hora de la comida', 'Después del trabajo']
const field = { display: 'flex', flexDirection: 'column', gap: 8 } as const
const lbl = { fontSize: 15, fontWeight: 700 } as const
const opt = { display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 500, minHeight: 44 } as const
const check = { width: 20, height: 20, accentColor: '#006B5E' } as const
const err = { margin: 0, color: '#B3261E', fontSize: 15, fontWeight: 600 } as const
const box = { flex: '1 1 420px', minWidth: 0, background: '#FFFFFF', borderRadius: 32, padding: 40, display: 'flex', flexDirection: 'column', gap: 20 } as const

export default function LandingForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = e.currentTarget
    const fd = new FormData(f)
    const data = {
      nombre: String(fd.get('nombre') || '').trim(),
      apellidos: String(fd.get('apellidos') || '').trim(),
      email: String(fd.get('email') || '').trim(),
      whatsapp: String(fd.get('whatsapp') || '').trim(),
      franja: String(fd.get('franja') || ''),
    }
    if (!data.nombre || !/^\S+@\S+\.\S+$/.test(data.email)) {
      setError('Escribe tu nombre y un email válido.')
      return
    }
    if (!fd.get('privacidad')) {
      setError('Acepta la política de privacidad para continuar.')
      return
    }
    setError('')
    setState('sending')
    try {
      const r = await fetch('/api/piloto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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
      <div role="status" style={box}>
        <h3 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>¡Listo, te has apuntado!</h3>
        <p style={{ margin: 0 }}>Te avisaremos en cuanto abramos las plazas del piloto.</p>
      </div>
    )
  }

  return (
    <form style={box} onSubmit={onSubmit} noValidate>
      <div style={field}><label htmlFor="f-nombre" style={lbl}>Nombre</label><input id="f-nombre" name="nombre" className="lp-in" type="text" autoComplete="given-name" placeholder="Tu nombre" /></div>
      <div style={field}><label htmlFor="f-apellidos" style={lbl}>Apellidos</label><input id="f-apellidos" name="apellidos" className="lp-in" type="text" autoComplete="family-name" placeholder="Tus apellidos" /></div>
      <div style={field}><label htmlFor="f-email" style={lbl}>Email</label><input id="f-email" name="email" className="lp-in" type="email" autoComplete="email" placeholder="tu@email.com" /></div>
      <div style={field}><label htmlFor="f-whatsapp" style={lbl}>WhatsApp</label><input id="f-whatsapp" name="whatsapp" className="lp-in" type="tel" autoComplete="tel" placeholder="+34 600 000 000" /></div>
      <fieldset style={{ margin: 0, padding: 0, border: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <legend style={{ padding: 0, marginBottom: 8, ...lbl }}>Franja preferida</legend>
        {FRANJAS.map((fr, i) => (
          <label key={fr} style={opt}><input type="radio" name="franja" value={fr} defaultChecked={i === 0} style={check} />{fr}</label>
        ))}
      </fieldset>
      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, fontWeight: 500, color: '#3B5753', lineHeight: 1.5 }}>
        <input type="checkbox" name="privacidad" style={{ ...check, flex: 'none', marginTop: 2 }} />
        <span>He leído y acepto la <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'underline' }}>política de privacidad</Link>.</span>
      </label>
      {error && <p role="alert" style={err}>{error}</p>}
      {state === 'error' && <p role="alert" style={err}>No hemos podido apuntarte. Inténtalo de nuevo en unos minutos.</p>}
      <button className="lp-btn lp-b1" type="submit" disabled={state === 'sending'} style={{ background: '#006B5E', color: '#FFFFFF', border: 0, padding: '16px 32px', borderRadius: 999, fontFamily: "'Britanica', 'Montserrat', sans-serif", fontWeight: 700, fontSize: 17, minHeight: 52, cursor: 'pointer', textAlign: 'center' }}>
        {state === 'sending' ? 'Enviando…' : 'Apuntarme'}
      </button>
    </form>
  )
}
