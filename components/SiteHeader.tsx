'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

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
  // Barra que subraya la opción activa: se desliza hasta la opción elegida
  const nav = useRef<HTMLElement>(null)
  const [bar, setBar] = useState<{ x: number; w: number; show: boolean; anim: boolean }>({ x: 0, w: 0, show: false, anim: false })
  const moveTo = useCallback((el: HTMLElement | null, anim = true) => {
    if (!el) { setBar((b) => ({ ...b, show: false })); return }
    setBar({ x: el.offsetLeft, w: el.offsetWidth, show: true, anim })
  }, [])
  useLayoutEffect(() => {
    const el = nav.current?.querySelector<HTMLElement>('a.on') ?? null
    setBar((b) => (el ? { x: el.offsetLeft, w: el.offsetWidth, show: true, anim: b.show } : { ...b, show: false }))
  }, [path])
  useEffect(() => {
    const r = () => moveTo(nav.current?.querySelector<HTMLElement>('a.on') ?? null, false)
    window.addEventListener('resize', r)
    document.fonts?.ready.then(r)
    return () => window.removeEventListener('resize', r)
  }, [moveTo])
  return (
    <header className="hd">
      <div className="hd-in">
        <Link className="logo" href="/"><img src="/logo.svg" alt="MeSientoChill, inicio" /></Link>
        <nav className="nav" aria-label="Principal" ref={nav}>
          <span className="nav-bar" aria-hidden="true" style={{ width: bar.w, transform: `translateX(${bar.x}px)`, opacity: bar.show ? 1 : 0, transition: bar.anim ? undefined : 'none' }} />
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={on(l.href) ? 'on' : undefined} aria-current={on(l.href) ? 'page' : undefined} onClick={(e) => moveTo(e.currentTarget)}>{l.label}</Link>
          ))}
          {loggedIn ? (
            <Link className="btn sm b1" href="/app/inicio">Mi cuenta</Link>
          ) : (
            <>
              <Link className={'link' + (on('/login') ? ' on' : '')} href="/login" onClick={(e) => moveTo(e.currentTarget)}>Iniciar sesión</Link>
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
