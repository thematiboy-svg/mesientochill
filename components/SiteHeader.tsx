'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/clases', label: 'Clases' },
  { href: '/metodo', label: 'Método' },
  { href: '/monica', label: 'Mónica' },
  { href: '/precios', label: 'Precios' },
  { href: '/eventos', label: 'Eventos' },
]

export default function SiteHeader({ loggedIn = false }: { loggedIn?: boolean }) {
  const path = usePathname()
  const menu = useRef<HTMLDetailsElement>(null)
  useEffect(() => { if (menu.current) menu.current.open = false }, [path])
  const on = (h: string) => path === h || (h !== '/' && path.startsWith(h + '/'))
  return (
    <header className="hd">
      <div className="hd-in">
        <Link className="logo" href="/"><img src="/logo.svg" alt="MeSientoChill, inicio" /></Link>
        <nav className="nav" aria-label="Principal">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={on(l.href) ? 'on' : undefined} aria-current={on(l.href) ? 'page' : undefined}>{l.label}</Link>
          ))}
          {loggedIn ? (
            <Link className="btn sm b1" href="/app/inicio">Mi cuenta</Link>
          ) : (
            <>
              <Link className={'link' + (on('/login') ? ' on' : '')} href="/login">Iniciar sesión</Link>
              <Link className="btn sm b1" href="/registro">Empezar</Link>
            </>
          )}
        </nav>
        <details className="mnav" ref={menu}>
          <summary>Menú</summary>
          <div className="mnav-list">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={on(l.href) ? 'on' : undefined}>{l.label}</Link>
            ))}
            {loggedIn ? (
              <Link className="btn sm b1" href="/app/inicio" style={{ marginTop: 8, color: '#fff' }}>Mi cuenta</Link>
            ) : (
              <>
                <Link href="/login">Iniciar sesión</Link>
                <Link className="btn sm b1" href="/registro" style={{ marginTop: 8, color: '#fff' }}>Empezar</Link>
              </>
            )}
          </div>
        </details>
      </div>
    </header>
  )
}
