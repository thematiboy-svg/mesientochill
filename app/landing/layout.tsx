import LandingHeader from './LandingHeader'
import LandingFooter from './LandingFooter'
import LandingChat from './LandingChat'
import './landing.css'

// Marco común de la landing y de sus páginas legales: cabecera, footer y Chillsi propios,
// sin enlaces a la web (que aún no está publicada).
export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lp">
      <div style={{ width: '100%', background: '#FFF9F6', color: '#0E2F2B', fontFamily: "'Britanica', 'Montserrat', sans-serif", fontSize: 18, lineHeight: 1.65 }}>
        <LandingHeader />
        {children}
        <LandingFooter />
      </div>
      <LandingChat />
    </div>
  )
}
