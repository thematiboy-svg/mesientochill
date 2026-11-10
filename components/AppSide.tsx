'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDE_ITEMS, ADMIN_ITEM } from './side-items'

export default function AppSide({ admin = false }: { admin?: boolean }) {
  const path = usePathname()
  return (
    <aside className="side" aria-label="Zona privada">
      <nav>
        {(admin ? [ADMIN_ITEM, ...SIDE_ITEMS] : SIDE_ITEMS).map((i) => {
          const on = path === i.href || path.startsWith(i.href + '/')
          return (
            <Link key={i.href} href={i.href} className={[on ? 'on' : '', i.href === ADMIN_ITEM.href ? 'admin' : ''].filter(Boolean).join(' ') || undefined} aria-current={on ? 'page' : undefined}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: i.svg }} />
              {i.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
