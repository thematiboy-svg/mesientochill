import Copyright from '../../components/Copyright'

// Footer de la landing. Los enlaces legales llevan a las páginas propias de la landing.
export default function LandingFooter() {
  return (
<footer style={{ padding: "64px 40px", background: "#0E2F2B", color: "#FFFFFF", borderRadius: "40px 40px 0 0" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
<img src="/logo-blanco.svg" alt="MeSientoChill" style={{ height: 56, width: "auto", display: "block", marginLeft: "-10px" }} />
<nav style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", fontSize: 15, fontWeight: "500" }}>
<a href="/landing/aviso-legal" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Aviso legal</a>
<a href="/landing/privacidad" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Privacidad</a>
<a href="/landing/cookies" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Cookies</a>
<a href="/landing/accesibilidad" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Accesibilidad</a>
<a href="/landing/contacto" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Contacto</a>
<span className="soc" style={{ display: "inline-flex", alignItems: "center", gap: "0", marginLeft: "-10px" }}><a href="https://www.instagram.com/mesientochill_/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de MeSientoChill (@mesientochill_)" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg></a><a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M14 3c.3 2.5 2 4.2 4.6 4.4" /></svg></a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.2v5.6l5-2.8z" fill="currentColor" /></svg></a></span>
</nav>
</div>
<div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255, 255, 255, 0.25)", fontSize: 13, lineHeight: "1.6", color: "#D5E8E4" }}>Las clases de MeSientoChill no sustituyen el consejo m&eacute;dico ni la fisioterapia. Si tienes una lesi&oacute;n o una condici&oacute;n de salud, consulta antes con tu m&eacute;dico.</div>
<Copyright style={{ maxWidth: 1200, margin: "16px auto 0", fontSize: 13, lineHeight: "1.6", color: "#D5E8E4" }} />
</footer>
  )
}
