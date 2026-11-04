'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { responder, SUGERENCIAS, temaPorId, type Enlace } from '../lib/chillsi'

type Msg = { de: 'bot' | 'yo'; texto: string; enlaces?: Enlace[] }

export default function Chillsi({ nombre, conSesion = false, style }: { nombre?: string; conSesion?: boolean; style?: React.CSSProperties }) {
  const saludo = `Hola${nombre ? `, ${nombre}` : ''}, soy Chillsi, el asistente de MeSientoChill. Te ayudo con horarios, reservas, créditos y tarifas. ¿Qué necesitas?`
  const [msgs, setMsgs] = useState<Msg[]>([{ de: 'bot', texto: saludo }])
  const [sug, setSug] = useState<string[]>(SUGERENCIAS)
  const [texto, setTexto] = useState('')
  const cuerpo = useRef<HTMLDivElement>(null)
  const primera = useRef(true)

  useEffect(() => {
    if (primera.current) { primera.current = false; return }
    const el = cuerpo.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs])

  function preguntar(pregunta: string, mostrar = pregunta) {
    const q = pregunta.trim()
    if (!q) return
    const r = responder(q, conSesion)
    setMsgs((m) => [...m, { de: 'yo', texto: mostrar }, { de: 'bot', texto: r.texto, enlaces: r.enlaces }])
    setSug(r.sugerencias)
  }

  function elegir(id: string) {
    const t = temaPorId(id)
    if (!t) return
    // Pregunta con el título del tema para que gane ese tema
    const r = { texto: t.respuesta, enlaces: (t.enlaces ?? []).filter((e) => conSesion || !e.privado) }
    setMsgs((m) => [...m, { de: 'yo', texto: t.titulo }, { de: 'bot', ...r }])
    setSug(t.relacionados ?? SUGERENCIAS.filter((x) => x !== id).slice(0, 3))
  }

  return (
    <div className="chat" style={style}>
      <div className="chat-h">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg>
        <span>Chillsi &middot; asistente de MeSientoChill</span>
      </div>
      <div className="chat-b" ref={cuerpo} role="log" aria-live="polite" aria-label="Conversación con Chillsi" style={{ maxHeight: 460, overflowY: 'auto' }}>
        {msgs.map((m, i) => (
          <div key={i} className={'msg ' + (m.de === 'bot' ? 'bot' : 'me')}>
            {m.texto}
            {m.enlaces && m.enlaces.length > 0 && (
              <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: 8 }}>
                {m.enlaces.map((e) => (
                  <Link key={e.href} href={e.href} style={{ fontWeight: 700, color: 'var(--teal)' }}>{e.texto} →</Link>
                ))}
              </span>
            )}
          </div>
        ))}
        <div className="wrapr g8">
          {sug.map((id) => {
            const t = temaPorId(id)
            if (!t) return null
            return (
              <button key={id} type="button" className={'chip' + (id === 'persona' ? ' coral' : '')} onClick={() => elegir(id)} style={{ cursor: 'pointer', fontFamily: 'inherit', minHeight: 36 }}>
                {t.titulo}
              </button>
            )
          })}
        </div>
      </div>
      <form className="chat-f" onSubmit={(e) => { e.preventDefault(); preguntar(texto); setTexto('') }}>
        <input className="in-t" type="text" placeholder="Escribe tu pregunta" aria-label="Escribe tu pregunta" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={300} style={{ flex: '1 1 200px' }} />
        <button className="btn b1 sm" type="submit">Enviar</button>
      </form>
    </div>
  )
}
