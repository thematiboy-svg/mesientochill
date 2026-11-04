import type { Metadata } from 'next'
import LandingForm from './LandingForm'
import Copyright from '../../components/Copyright'
import Faqs from '../../components/Faqs'
import './landing.css'

export const metadata: Metadata = {
  title: 'Piloto · 20 minutos para cambiar tu energía',
  description: 'Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz. Apúntate al piloto: clases de 20 minutos, máximo 10 personas.',
}

// Landing del piloto, convertida del diseño «MeSientoChill: landing page».
export default function Landing() {
  return (
    <div className="lp">
<div style={{ width: "100%", background: "#FFF9F6", color: "#0E2F2B", fontFamily: "'Britanica', 'Montserrat', sans-serif", fontSize: 18, lineHeight: "1.65" }}>

<header style={{ padding: "16px 40px", borderBottom: "1px solid #E8DDD7" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
<a href="#inicio" style={{ display: "block", lineHeight: "0" }}><img src="/logo.svg" alt="MeSientoChill" style={{ height: 56, width: "auto", display: "block", marginLeft: "-10px" }} /></a>
<nav style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 20px", fontSize: 15, fontWeight: "600" }}>
<a href="#clases" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Clases</a>
<a href="#metodo" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>M&eacute;todo</a>
<a href="#monica" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>M&oacute;nica</a>
<a href="#precios" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Precios</a>
<a href="#eventos" style={{ color: "#0E2F2B", textDecoration: "none", padding: "12px 4px" }}>Eventos</a>
<a href="#apuntate" style={{ color: "#006B5E", textDecoration: "none", padding: "12px 8px" }}>Iniciar sesi&oacute;n</a>
<a className="lp-btn lp-b1" href="#apuntate" style={{ background: "#006B5E", color: "#FFFFFF", textDecoration: "none", padding: "12px 24px", borderRadius: 999, fontWeight: "700", minHeight: 44, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Empezar</a>
</nav>
</div>
</header>

<section id="inicio" style={{ padding: "56px 40px 96px" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
<div style={{ flex: "1 1 480px", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 24 }}>
<span style={{ background: "#E6F6F3", color: "#006B5E", fontSize: 13, fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 16px", borderRadius: 999, lineHeight: "1.3" }}>Pilates &middot; Total Barre &middot; Mindfulness</span>
<h1 style={{ margin: "0", fontSize: "clamp(36px, 4.4vw, 60px)", fontWeight: "600", lineHeight: "1.08", letterSpacing: "-0.02em" }}>20 minutos para <span style={{ color: "#00A28F", fontWeight: "600" }}>cambiar tu energ&iacute;a</span></h1>
<p style={{ margin: "0", fontSize: 20, maxWidth: 560, color: "#3B5753" }}>Pilates, Total Barre y Mindfulness en directo con M&oacute;nica Mu&ntilde;oz. Una pausa en mitad del d&iacute;a para volver al trabajo con la cabeza clara.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
<a className="lp-btn lp-b1" href="#apuntate" style={{ background: "#006B5E", color: "#FFFFFF", textDecoration: "none", padding: "16px 32px", borderRadius: 999, fontWeight: "700", fontSize: 17, minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Quiero mi plaza en el piloto</a>
<a className="lp-btn lp-b2" href="#como" style={{ background: "transparent", color: "#006B5E", textDecoration: "none", padding: "14px 30px", borderRadius: 999, fontWeight: "700", fontSize: 17, border: "2px solid #006B5E", minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Ver c&oacute;mo funciona</a>
</div>
<p style={{ margin: "0", fontSize: 15, fontWeight: "600", color: "#006B5E" }}>Plazas limitadas</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px", fontSize: 15, fontWeight: "500", color: "#3B5753" }}>
<span>Clases de 20 minutos</span>
<span>M&aacute;ximo 10 personas por clase</span>
<span>Desde casa o la oficina</span>
</div>
</div>
<div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", justifyContent: "center" }}>
<div style={{ position: "relative", width: "min(480px, 100%)", aspectRatio: "1 / 1" }}>
<div style={{ position: "absolute", left: "0", top: "0", right: "0", bottom: "0", borderRadius: "50%", background: "#FFEDE8" }} />
<img src="/simbolo.svg" alt="S\xEDmbolo de MeSientoChill: un c\xEDrculo con una sonrisa" style={{ position: "absolute", left: "14%", top: "12%", width: "72%", height: "72%" }} />
<div style={{ position: "absolute", top: "2%", right: "0", width: 116, height: 116, borderRadius: "50%", background: "#FF9782", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1.1" }}>
<span style={{ fontSize: 38, fontWeight: "800" }}>20</span>
<span style={{ fontSize: 13, fontWeight: "700" }}>minutos</span>
</div>
<div className="lp-badge" style={{ position: "absolute", left: "-2%", bottom: "4%", width: 270, maxWidth: "80%", background: "#FFFFFF", border: "1px solid #CFE3DF", borderRadius: 20, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
<span style={{ fontSize: 14, fontWeight: "800" }}>Elige tu pausa</span>
<span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none" }} />Hora del caf&eacute;</span>
<span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF9782", flex: "none" }} />Hora de la comida</span>
<span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#0E2F2B", flex: "none" }} />Despu&eacute;s del trabajo</span>
</div>
</div>
</div>
</div>
</section>

<section style={{ padding: "88px 40px", background: "#FFFFFF" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "32px 64px" }}>
<h2 style={{ margin: "0", flex: "1 1 420px", minWidth: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Trabajas mucho, te paras poco y el estr&eacute;s se queda en el cuerpo</h2>
<p style={{ margin: "0", flex: "1 1 380px", minWidth: "0", fontSize: 20, color: "#3B5753" }}>Cuello cargado, mente acelerada y la sensaci&oacute;n de ir siempre apagando fuegos. No necesitas una hora ni desplazarte a un centro. Necesitas una pausa que funcione.</p>
</div>
</section>

<section id="como" style={{ padding: "88px 40px" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
<h2 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Tu pausa en tres pasos</h2>
<div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
<div style={{ flex: "1 1 280px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E8DDD7", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<span style={{ width: 52, height: 52, borderRadius: "50%", background: "#FF9782", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: "800" }}>1</span>
<h3 style={{ margin: "0", fontSize: 22, fontWeight: "600" }}>Reserva tu pausa</h3>
<p style={{ margin: "0", fontSize: 17, color: "#3B5753" }}>Elige entre la hora del caf&eacute;, la de la comida o despu&eacute;s del trabajo.</p>
</div>
<div style={{ flex: "1 1 280px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E8DDD7", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<span style={{ width: 52, height: 52, borderRadius: "50%", background: "#FF9782", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: "800" }}>2</span>
<h3 style={{ margin: "0", fontSize: 22, fontWeight: "600" }}>Con&eacute;ctate</h3>
<p style={{ margin: "0", fontSize: 17, color: "#3B5753" }}>20 minutos en directo desde casa o la oficina. Solo necesitas un hueco y ropa c&oacute;moda.</p>
</div>
<div style={{ flex: "1 1 280px", minWidth: "0", background: "#FFFFFF", border: "1px solid #E8DDD7", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<span style={{ width: 52, height: 52, borderRadius: "50%", background: "#FF9782", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: "800" }}>3</span>
<h3 style={{ margin: "0", fontSize: 22, fontWeight: "600" }}>Vuelve al trabajo</h3>
<p style={{ margin: "0", fontSize: 17, color: "#3B5753" }}>Con el cuerpo m&aacute;s suelto y la mente m&aacute;s clara.</p>
</div>
</div>
</div>
</section>

<section id="clases" style={{ padding: "88px 40px", background: "#FFFFFF" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
<h2 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Qu&eacute; vas a trabajar</h2>
<p style={{ margin: "0", fontSize: 19, color: "#3B5753", maxWidth: 640 }}>Tres disciplinas, una misma idea: llevar la atenci&oacute;n al cuerpo.</p>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
<div style={{ flex: "1 1 300px", minWidth: "0", background: "#E6F6F3", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<svg viewBox="0 0 96 96" width="72" height="72" aria-hidden="true"><path d="M48 26.1 L48 70.49" stroke="#FF9782" strokeWidth={8} strokeLinecap="round" /><circle cx="48" cy="48" r="40" fill="none" stroke="#00A28F" strokeWidth={8} /></svg>
<h3 style={{ margin: "0", fontSize: 26, fontWeight: "600" }}>Pilates</h3>
<p style={{ margin: "0", fontSize: 17, color: "#2F4B47" }}>Fuerza y control del centro, con atenci&oacute;n a la postura de quien pasa el d&iacute;a sentado.</p>
</div>
<div style={{ flex: "1 1 300px", minWidth: "0", background: "#FFEDE8", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<svg viewBox="0 0 96 96" width="72" height="72" aria-hidden="true"><path d="M12 76 H84" stroke="#0E2F2B" strokeWidth={8} strokeLinecap="round" /><path d="M26 62 C30 38 66 38 70 62" fill="none" stroke="#FF9782" strokeWidth={8} strokeLinecap="round" /><circle cx="48" cy="22" r="9" fill="#FF9782" /></svg>
<h3 style={{ margin: "0", fontSize: 26, fontWeight: "600" }}>Total Barre</h3>
<p style={{ margin: "0", fontSize: 17, color: "#4A3B37" }}>Tonificaci&oacute;n sin impacto de forma din&aacute;mica.</p>
</div>
<div style={{ flex: "1 1 300px", minWidth: "0", background: "#F1EEE9", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<svg viewBox="0 0 96 96" width="72" height="72" aria-hidden="true"><circle cx="48" cy="48" r="40" fill="none" stroke="#00A28F" strokeWidth={6} /><circle cx="48" cy="48" r="24" fill="none" stroke="#00A28F" strokeWidth={6} strokeOpacity="0.55" /><circle cx="48" cy="48" r="9" fill="#FF9782" /></svg>
<h3 style={{ margin: "0", fontSize: 26, fontWeight: "600" }}>Mindfulness</h3>
<p style={{ margin: "0", fontSize: 17, color: "#3F403B" }}>Respiraci&oacute;n y atenci&oacute;n plena para soltar la tensi&oacute;n del d&iacute;a.</p>
</div>
</div>
</div>
</section>

<section id="metodo" style={{ padding: "88px 40px", background: "#006B5E", color: "#FFFFFF" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
<div style={{ display: "flex", flexWrap: "wrap", gap: "24px 64px", alignItems: "flex-start" }}>
<h2 style={{ margin: "0", flex: "1 1 420px", minWidth: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Atenci&oacute;n al cuerpo, no a la pantalla</h2>
<p style={{ margin: "0", flex: "1 1 420px", minWidth: "0", fontSize: 19, color: "#FFFFFF" }}>Respiraci&oacute;n, ejecuci&oacute;n dirigida a donde pones el foco y atenci&oacute;n plena a lo que te rodea. Dura lo que un caf&eacute;, pero en lugar de darle vueltas a lo malo del trabajo, cambias tu energ&iacute;a.</p>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
<div style={{ flex: "1 1 280px", minWidth: "0", border: "1.5px solid rgba(255, 255, 255, 0.55)", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
<span style={{ fontSize: 44, fontWeight: "800", color: "#FF9782", lineHeight: "1" }}>01</span>
<h3 style={{ margin: "0", fontSize: 24, fontWeight: "600" }}>Respiraci&oacute;n</h3>
<p style={{ margin: "0", fontSize: 17 }}>Empezamos respirando para bajar el ritmo.</p>
</div>
<div style={{ flex: "1 1 280px", minWidth: "0", border: "1.5px solid rgba(255, 255, 255, 0.55)", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
<span style={{ fontSize: 44, fontWeight: "800", color: "#FF9782", lineHeight: "1" }}>02</span>
<h3 style={{ margin: "0", fontSize: 24, fontWeight: "600" }}>Foco</h3>
<p style={{ margin: "0", fontSize: 17 }}>Llevamos la atenci&oacute;n hacia una parte del cuerpo.</p>
</div>
<div style={{ flex: "1 1 280px", minWidth: "0", border: "1.5px solid rgba(255, 255, 255, 0.55)", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 12 }}>
<span style={{ fontSize: 44, fontWeight: "800", color: "#FF9782", lineHeight: "1" }}>03</span>
<h3 style={{ margin: "0", fontSize: 24, fontWeight: "600" }}>Atenci&oacute;n plena</h3>
<p style={{ margin: "0", fontSize: 17 }}>Volvemos a lo que te rodea, aqu&iacute; y ahora.</p>
</div>
</div>
<p style={{ margin: "0", fontSize: 22, fontWeight: "700" }}>Cuando llevas la atenci&oacute;n al cuerpo, el estr&eacute;s afloja y la mente se despeja. Una pausa tan breve como un caf&eacute;, pensada solo para ti.</p>
</div>
</section>

<section id="monica" style={{ padding: "96px 40px" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "48px 72px" }}>
<div style={{ flex: "1 1 360px", minWidth: "0", minHeight: 480, aspectRatio: "4 / 5", borderRadius: 36, background: "#E6F6F3", overflow: "hidden" }}>
<img src="/monica-estudio.jpg" alt="M\xF3nica Mu\xF1oz, instructora de MeSientoChill, sonriendo en un estudio de Total Barre" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "55% 40%", display: "block" }} />
</div>
<div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
<span style={{ fontSize: 13, fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#006B5E" }}>Tu instructora</span>
<h2 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Hola, soy M&oacute;nica Mu&ntilde;oz</h2>
<p style={{ margin: "0", fontSize: 19, color: "#3B5753" }}>M&aacute;s de 20 a&ntilde;os cuidando la salud y el bienestar de las personas. Empec&eacute; en las terapias alternativas y hol&iacute;sticas, y con el tiempo mi camino evolucion&oacute; hacia la mente y el cuerpo.</p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: 10, fontSize: 17, fontWeight: "600" }}>
<li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF9782", flex: "none" }} />M&aacute;s de 20 a&ntilde;os de experiencia en salud y bienestar</li>
<li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF9782", flex: "none" }} />Pilates, Total Barre, Yoga, Mindfulness y gesti&oacute;n emocional</li>
<li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF9782", flex: "none" }} />Empat&iacute;a y energ&iacute;a positiva para lograr cambios visibles</li>
</ul>
<a className="lp-btn lp-b1" href="#apuntate" style={{ background: "#006B5E", color: "#FFFFFF", textDecoration: "none", padding: "16px 32px", borderRadius: 999, fontWeight: "700", fontSize: 17, minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Reservar mi pausa</a>
</div>
</div>
</section>

<section id="precios" style={{ padding: "96px 40px", background: "#E6F6F3" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
<h2 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Elige c&oacute;mo quieres practicar</h2>
<p style={{ margin: "0", fontSize: 19, color: "#2F4B47" }}>Cancela cuando quieras desde tu cuenta.</p>
</div>
<div style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
<div style={{ flex: "1 1 340px", minWidth: "0", background: "#FFFFFF", border: "1px solid #BFDCD6", borderRadius: 32, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
<h3 style={{ margin: "0", fontSize: 24, fontWeight: "700" }}>Solo v&iacute;deos</h3>
<p style={{ margin: "0", display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 56, fontWeight: "800", lineHeight: "1" }}>39 &euro;</span><span style={{ fontSize: 17, fontWeight: "600", color: "#3B5753" }}>/mes</span></p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: 12, fontSize: 17, flex: "1 1 auto" }}>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />Biblioteca de clases grabadas</li>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />Clases de 45 minutos por niveles</li>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />Directos grabados</li>
</ul>
<a className="lp-btn lp-b2" href="#apuntate" style={{ background: "transparent", color: "#006B5E", textDecoration: "none", padding: "14px 30px", borderRadius: 999, fontWeight: "700", fontSize: 17, border: "2px solid #006B5E", minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Empezar con v&iacute;deos</a>
</div>
<div style={{ flex: "1 1 340px", minWidth: "0", background: "#FFFFFF", border: "3px solid #006B5E", borderRadius: 32, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
<div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
<h3 style={{ margin: "0", fontSize: 24, fontWeight: "700" }}>Directo y v&iacute;deos</h3>
<span style={{ background: "#FF9782", color: "#0E2F2B", fontSize: 13, fontWeight: "800", padding: "6px 14px", borderRadius: 999 }}>Incluye directos</span>
</div>
<p style={{ margin: "0", display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 56, fontWeight: "800", lineHeight: "1" }}>49 &euro;</span><span style={{ fontSize: 17, fontWeight: "600", color: "#3B5753" }}>/mes</span></p>
<ul style={{ margin: "0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: 12, fontSize: 17, flex: "1 1 auto" }}>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />Todo lo del plan de v&iacute;deos</li>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />Clases en directo de 20 minutos</li>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />8 cr&eacute;ditos al mes para reservar</li>
<li style={{ display: "flex", gap: 12, alignItems: "flex-start" }}><span style={{ width: 10, height: 10, borderRadius: "50%", background: "#00A28F", flex: "none", marginTop: 9 }} />M&aacute;ximo 10 personas por clase</li>
</ul>
<a className="lp-btn lp-b1" href="#apuntate" style={{ background: "#006B5E", color: "#FFFFFF", textDecoration: "none", padding: "16px 32px", borderRadius: 999, fontWeight: "700", fontSize: 17, minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Empezar con directos</a>
</div>
</div>
<div style={{ background: "#FFFFFF", border: "1px solid #BFDCD6", borderRadius: 32, padding: 40, display: "flex", flexDirection: "column", gap: 24 }}>
<h3 style={{ margin: "0", fontSize: 22, fontWeight: "800" }}>C&oacute;mo funcionan los cr&eacute;ditos</h3>
<div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
<p style={{ margin: "0", flex: "1 1 220px", minWidth: "0", fontSize: 16, color: "#2F4B47" }}><strong style={{ color: "#0E2F2B" }}>Reserva con 1 cr&eacute;dito.</strong> Cada clase en directo se reserva con antelaci&oacute;n y gasta 1 cr&eacute;dito.</p>
<p style={{ margin: "0", flex: "1 1 220px", minWidth: "0", fontSize: 16, color: "#2F4B47" }}><strong style={{ color: "#0E2F2B" }}>8 cr&eacute;ditos al mes.</strong> Se renuevan cada mes y caducan a fin de mes.</p>
<p style={{ margin: "0", flex: "1 1 220px", minWidth: "0", fontSize: 16, color: "#2F4B47" }}><strong style={{ color: "#0E2F2B" }}>Cancela hasta 24 horas antes</strong> y no pierdes el cr&eacute;dito. Si M&oacute;nica cancela una clase, tampoco.</p>
<p style={{ margin: "0", flex: "1 1 220px", minWidth: "0", fontSize: 16, color: "#2F4B47" }}><strong style={{ color: "#0E2F2B" }}>Si reservas y no asistes,</strong> pierdes el cr&eacute;dito de esa clase.</p>
</div>
</div>
<p style={{ margin: "0", borderRadius: 20, padding: "20px 28px", fontSize: 17, fontWeight: "600", backgroundColor: "#ff9782", textAlign: "center" }}>AHORA SOLO POR 39 &euro;/mes con v&iacute;deos o 49 &euro;/mes con v&iacute;deos y clases en DIRECTO.</p>
</div>
</section>

<section id="eventos" className="ev-sec" style={{ padding: "96px 40px" }}>
<div className="ev-box" style={{ maxWidth: 1200, margin: "0 auto", background: "#FFEDE8", borderRadius: 40, padding: 56, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px 64px" }}>
<div style={{ flex: "1 1 420px", minWidth: "0", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
<span style={{ fontSize: 13, fontWeight: "700", letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A3A26" }}>Cuatro eventos al a&ntilde;o</span>
<h2 style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Un d&iacute;a para ti y para la comunidad</h2>
<p style={{ margin: "0", fontSize: 19, color: "#4A3B37" }}>Con 2 sesiones en directo de Mr.Matt, una pensada para la relajaci&oacute;n y otra para disfrutar despu&eacute;s de comer, mindfulness, actividades, comida sana y gente con la que compartirlo.</p>
<div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
<span style={{ background: "#FFFFFF", border: "1px solid #F0C9BE", borderRadius: 999, padding: "8px 18px", fontSize: 15, fontWeight: "700" }}>Primavera</span>
<span style={{ background: "#FFFFFF", border: "1px solid #F0C9BE", borderRadius: 999, padding: "8px 18px", fontSize: 15, fontWeight: "700" }}>Verano</span>
<span style={{ background: "#FFFFFF", border: "1px solid #F0C9BE", borderRadius: 999, padding: "8px 18px", fontSize: 15, fontWeight: "700" }}>Oto&ntilde;o</span>
<span style={{ background: "#FFFFFF", border: "1px solid #F0C9BE", borderRadius: 999, padding: "8px 18px", fontSize: 15, fontWeight: "700" }}>Invierno</span>
</div>
</div>
<div className="ev-card" style={{ flex: "1 1 320px", minWidth: "0", background: "#FFFFFF", borderRadius: 28, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
<span style={{ fontSize: 15, fontWeight: "700", color: "#3B5753" }}>Pr&oacute;ximo evento: [fecha, lugar y aforo]</span>
<p style={{ margin: "0", display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ fontSize: 48, fontWeight: "800", lineHeight: "1" }}>38 &euro;</span><span style={{ fontSize: 16, fontWeight: "600", color: "#3B5753" }}>por persona</span></p>
<p className="ev-dis" style={{ margin: "0", fontSize: 17, fontWeight: "700", color: "#006B5E" }}>Si est&aacute;s suscrita o suscrito: 30,40 &euro; con el plan Directo y v&iacute;deos (20 % de descuento) y 34,20 &euro; con Solo v&iacute;deos (10 % de descuento)</p>
<a className="lp-btn lp-b3 ev-btn" href="#apuntate" style={{ background: "#0E2F2B", color: "#FFFFFF", textDecoration: "none", padding: "16px 32px", borderRadius: 999, fontWeight: "700", fontSize: 17, minHeight: 52, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>Av&iacute;same del pr&oacute;ximo</a>
</div>
</div>
</section>

<section style={{ padding: "96px 40px", background: "#FFFFFF" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px 72px" }}>
<h2 style={{ margin: "0", flex: "1 1 320px", minWidth: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "600", lineHeight: "1.15", letterSpacing: "-0.01em" }}>Preguntas frecuentes</h2>
<div style={{ flex: "2 1 520px", minWidth: "0" }}>
<Faqs />
</div>
</div>
</section>

<section id="apuntate" style={{ padding: "96px 40px", background: "#E6F6F3" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "40px 72px" }}>
<div style={{ flex: "1 1 380px", minWidth: "0", display: "flex", flexDirection: "column", gap: 20 }}>
<h2 style={{ margin: "0", fontSize: "clamp(32px, 3.8vw, 52px)", fontWeight: "600", lineHeight: "1.12", letterSpacing: "-0.015em" }}>Tu pausa de 20 minutos te est&aacute; esperando</h2>
<p style={{ margin: "0", fontSize: 19, color: "#2F4B47" }}>Ap&uacute;ntate al piloto y te avisamos en cuanto abramos las plazas. Plazas limitadas.</p>
</div>
<LandingForm />
</div>
</section>

<footer style={{ padding: "64px 40px", background: "#0E2F2B", color: "#FFFFFF", borderRadius: "40px 40px 0 0" }}>
<div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
<img src="/logo-blanco.svg" alt="MeSientoChill" style={{ height: 56, width: "auto", display: "block", marginLeft: "-10px" }} />
<nav style={{ display: "flex", flexWrap: "wrap", gap: "4px 24px", fontSize: 15, fontWeight: "500" }}>
<a href="/aviso-legal" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Aviso legal</a>
<a href="/privacidad" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Privacidad</a>
<a href="/cookies" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Cookies</a>
<a href="/accesibilidad" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Accesibilidad</a>
<a href="/contacto" style={{ color: "#FFFFFF", textDecoration: "none", padding: "12px 0" }}>Contacto</a>
<span className="soc" style={{ display: "inline-flex", alignItems: "center", gap: "0", marginLeft: "-10px" }}><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></svg></a><a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3v11.2a3.7 3.7 0 1 1-3.7-3.7" /><path d="M14 3c.3 2.5 2 4.2 4.6 4.4" /></svg></a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, color: "#FFFFFF", textDecoration: "none", padding: "0" }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.2v5.6l5-2.8z" fill="currentColor" /></svg></a></span>
</nav>
</div>
<div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255, 255, 255, 0.25)", fontSize: 13, lineHeight: "1.6", color: "#D5E8E4" }}>Las clases de MeSientoChill no sustituyen el consejo m&eacute;dico ni la fisioterapia. Si tienes una lesi&oacute;n o una condici&oacute;n de salud, consulta antes con tu m&eacute;dico.</div>
<Copyright style={{ maxWidth: 1200, margin: "16px auto 0", fontSize: 13, lineHeight: "1.6", color: "#D5E8E4" }} />
</footer>

</div>
    </div>
  )
}
