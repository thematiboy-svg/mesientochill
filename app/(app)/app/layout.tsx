import Link from 'next/link'
import { redirect } from 'next/navigation'
import AppSide from '../../../components/AppSide'
import SiteFooter from '../../../components/SiteFooter'
import { getContext } from '../../../lib/data'
import { hayStripe, tieneAcceso } from '../../../lib/stripe'
import { signOut } from '../../actions'

export const dynamic = 'force-dynamic'

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
        <AppSide />
        <main className="main">
          {hayStripe() && ctx.profile && !tieneAcceso(ctx.profile.estado_suscripcion) && (
            <p className="alert err" role="status">Tu suscripción no está activa. <Link href="/app/suscripcion" style={{ fontWeight: 700, color: 'inherit' }}>Actívala aquí</Link> para reservar clases y acceder a todo el contenido.</p>
          )}
          {ctx.profile?.estado_suscripcion === 'past_due' && (
            <p className="alert err" role="alert">No hemos podido cobrar tu última cuota. <Link href="/app/suscripcion" style={{ fontWeight: 700, color: 'inherit' }}>Actualiza tu método de pago</Link> para no perder el acceso.</p>
          )}
          {children}
        </main>
      </div>
      <SiteFooter helpHref="/app/ayuda" />
    </>
  )
}
