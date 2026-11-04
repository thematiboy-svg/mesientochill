import LandingMenu from './LandingMenu'

// Cabecera de la landing (también en sus páginas legales). Los enlaces llevan a /landing#sección.
export default function LandingHeader() {
  return (
<header className="hd">
<div className="hd-in">
<a href="/landing" style={{ display: "block", lineHeight: "0" }}><img src="/logo.svg" alt="MeSientoChill" style={{ height: 56, width: "auto", display: "block", marginLeft: "-10px" }} /></a>
<nav className="lp-nav" aria-label="Principal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 20px", fontSize: 15, fontWeight: "600" }}>
<a href="/landing#clases" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Clases</a>
<a href="/landing#metodo" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>M&eacute;todo</a>
<a href="/landing#monica" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>M&oacute;nica</a>
<a href="/landing#precios" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Precios</a>
<a href="/landing#eventos" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Eventos</a>
<a className="lp-btn lp-b1" href="/landing#apuntate" style={{ background: "#006B5E", color: "#FFFFFF", textDecoration: "none", padding: "12px 24px", borderRadius: 999, fontWeight: "700", minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Reservar plaza</a>
</nav>
<LandingMenu />
</div>
</header>
  )
}
