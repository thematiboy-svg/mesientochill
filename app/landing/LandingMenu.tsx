'use client'
import { useRef } from 'react'

const LINKS = [
  { href: '#clases', label: 'Clases' },
  { href: '#metodo', label: 'Método' },
  { href: '#monica', label: 'Mónica' },
  { href: '#precios', label: 'Precios' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#apuntate', label: 'Iniciar sesión' },
]

// Menú desplegable de la landing para móvil (en escritorio se ve el menú normal).
export default function LandingMenu() {
  const menu = useRef<HTMLDetailsElement>(null)
  const cerrar = () => { if (menu.current) menu.current.open = false }
  return (
    <details className="mnav lp-mnav" ref={menu}>
      <summary>Menú</summary>
      <div className="mnav-list" onClick={cerrar}>
        {LINKS.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        <a className="btn sm b1" href="#apuntate" style={{ marginTop: 8, color: '#fff' }}>Reservar plaza</a>
      </div>
    </details>
  )
}
