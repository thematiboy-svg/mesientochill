import Link from 'next/link'
import { redirect } from 'next/navigation'
import AppSide from '../../../components/AppSide'
import SiteFooter from '../../../components/SiteFooter'
import { getContext } from '../../../lib/data'
import { signOut } from '../../actions'

export const dynamic = 'force-dynamic'
export const metadata = { robots: { index: false, follow: false } }

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const ctx = await getContext()
  if (!ctx) redirect('/login')
  const nombre = ctx.profile?.nombre || ctx.user.email?.split('@')[0] || ''
  const n = ctx.credits.disponibles
  return (
    <>
      <header className="apptop">
        <Link className="logo" href="/app/inicio"><img src="/logo.svg" alt="MeSientoChill, inicio" /></Link>
        <div className="right">
          {ctx.profile?.plan === 'directo' && (
            <span className="cred"><span className="dot c"></span>{n} {n === 1 ? 'crédito' : 'créditos'} este mes</span>
          )}
          <form action={signOut}><button className="linkbtn" type="submit">Salir</button></form>
          <span className="avatar" aria-label={`Cuenta de ${nombre}`}>{nombre.charAt(0).toUpperCase()}</span>
        </div>
      </header>
      <div className="app">
        <AppSide admin={ctx.admin} />
        <main className="main">{children}</main>
      </div>
      <SiteFooter helpHref="/app/ayuda" />
    </>
  )
}
