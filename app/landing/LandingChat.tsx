'use client'
import { useEffect, useState } from 'react'
import Chillsi from '../../components/Chillsi'
import type { Enlace } from '../../lib/chillsi'

// En la landing, los enlaces de Chillsi llevan a sus secciones o páginas propias, nunca a la web.
const MAPA: Record<string, string | null> = {
  '/precios': '/landing#precios',
  '/eventos': '/landing#eventos',
  '/metodo': '/landing#metodo',
  '/monica': '/landing#monica',
  '/clases': '/landing#clases',
  '/contacto': '/landing/contacto',
  '/registro': '/landing#apuntate',
  '/login': null,
}
const TEXTOS: Record<string, string> = {
  '/registro': 'Apuntarme al piloto',
  '/clases': 'Ver las clases',
}
function mapEnlace(e: Enlace): Enlace | null {
  if (!(e.href in MAPA)) return null
  const href = MAPA[e.href]
  return href ? { ...e, href, texto: TEXTOS[e.href] ?? e.texto } : null
}

// Botón flotante «Ayuda» que abre Chillsi en una ventana dentro de la landing.
export default function LandingChat() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const k = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
  return (
    <>
      {open && (
        <div className="lp-chat" role="dialog" aria-label="Chillsi, el asistente de MeSientoChill">
          <button type="button" className="lp-chat-x" aria-label="Cerrar el chat" onClick={() => setOpen(false)}>×</button>
          <Chillsi mapEnlace={mapEnlace} />
        </div>
      )}
      <button type="button" className="fab" aria-expanded={open} aria-label={open ? 'Cerrar el chat de ayuda' : 'Ayuda: hablar con Chillsi, el asistente'} onClick={() => setOpen((o) => !o)} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', cursor: 'pointer' }}>
        <span className="fab-ic">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" /><path d="M8 9.5h8M8 12.5h8M8 15.5h8" /></svg>
        </span>
        <span className="fab-lb">{open ? 'Cerrar' : 'Ayuda'}</span>
      </button>
    </>
  )
}
