import Link from 'next/link'
import Copyright from './Copyright'

// Instagram: @mesientochill_ · TikTok: @mesientochill. TODO: sustituir Facebook y YouTube por los perfiles reales.
const SOCIAL = [
  {
    name: 'Instagram de MeSientoChill (@mesientochill_)',
    href: 'https://www.instagram.com/mesientochill_/',
    icon: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>),
  },
  {
    name: 'TikTok de MeSientoChill (@mesientochill)',
    href: 'https://www.tiktok.com/@mesientochill',
    icon: (<><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M14 3c.3 2.5 2 4.2 4.6 4.4" /></>),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/',
    icon: (<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: (<><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.2v5.6l5-2.8z" fill="currentColor" /></>),
  },
]

export default function SiteFooter({ helpHref = '/ayuda' }: { helpHref?: string }) {
  return (
    <>
      <footer className="ft">
        <div className="ft-in">
          <Link className="ft-logo" href="/"><img src="/logo-blanco.svg" alt="MeSientoChill, inicio" /></Link>
          <div className="ft-nav">
            <nav className="ft-main" aria-label="Principal">
              <Link href="/clases">Clases</Link>
              <Link href="/metodo">Método</Link>
              <Link href="/monica">Mónica</Link>
              <Link href="/precios">Precios</Link>
              <Link href="/eventos">Eventos</Link>
            </nav>
            <nav aria-label="Legal">
              <Link href="/aviso-legal">Aviso legal</Link>
              <Link href="/privacidad">Privacidad</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/accesibilidad">Accesibilidad</Link>
              <Link href="/contacto">Contacto</Link>
              <span className="soc" style={{ display: 'inline-flex', alignItems: 'center', marginLeft: -10 }}>
                {SOCIAL.map((n) => (
                  <a key={n.name} href={n.href} target="_blank" rel="noopener noreferrer" aria-label={n.name} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, color: '#fff', textDecoration: 'none', padding: 0 }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{n.icon}</svg>
                  </a>
                ))}
              </span>
            </nav>
          </div>
        </div>
        <p className="ft-note">Las clases de MeSientoChill no sustituyen el consejo médico ni la fisioterapia. Si tienes una lesión o una condición de salud, consulta antes con tu médico.</p>
        <Copyright className="ft-copy" />
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
