import Link from 'next/link'

export default function SiteFooter({ helpHref = '/ayuda' }: { helpHref?: string }) {
  return (
    <>
      <footer className="ft">
        <div className="ft-in">
          <img src="/logo-blanco.svg" alt="MeSientoChill" />
          <div className="ft-nav">
            <nav className="ft-main" aria-label="Principal">
              <Link href="/clases">Clases</Link>
              <Link href="/metodo">Método</Link>
              <Link href="/monica">Mónica</Link>
              <Link href="/precios">Precios</Link>
              <Link href="/eventos">Eventos</Link>
            </nav>
            <nav aria-label="Legal">
              <Link href="/ayuda">Aviso legal</Link>
              <Link href="/ayuda">Privacidad</Link>
              <Link href="/ayuda">Cookies</Link>
              <Link href="/ayuda">Accesibilidad</Link>
              <Link href="/ayuda">Contacto</Link>
              <Link href="/">[Redes sociales]</Link>
            </nav>
          </div>
        </div>
        <p className="ft-note">Las clases de MeSientoChill no sustituyen el consejo médico ni la fisioterapia. Si tienes una lesión o una condición de salud, consulta antes con tu médico.</p>
      </footer>
      <Link className="fab" href={helpHref} aria-label="Ayuda: hablar con Chillsi, el asistente">
        <span className="fab-ic">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" /><path d="M8 9.5h8M8 12.5h8M8 15.5h8" /></svg>
        </span>
        <span className="fab-lb">Ayuda</span>
      </Link>
    </>
  )
}
