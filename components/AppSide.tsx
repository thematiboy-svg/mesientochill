'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDE_ITEMS } from './side-items'

export default function AppSide() {
  const path = usePathname()
  return (
    <aside className="side" aria-label="Zona privada">
      <nav>
        {SIDE_ITEMS.map((i) => {
          const on = path === i.href
          return (
            <Link key={i.href} href={i.href} className={on ? 'on' : undefined} aria-current={on ? 'page' : undefined}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: i.svg }} />
              {i.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
