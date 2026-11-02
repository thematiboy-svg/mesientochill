import Link from 'next/link'

export default function A_eventosapp() {
  return (
    <>
<div className="stack g8"><h1 className="t2">Eventos de la comunidad</h1><p className="lead">Cuatro d&iacute;as al a&ntilde;o para ti y para la comunidad.</p></div>
<div className="card blush wrapr center" style={{ gap: "24px 40px", padding: 36 }}><div className="stack g12" style={{ flex: "1 1 320px", minWidth: "0" }}><span className="eyebrow" style={{ color: "#8A3A26" }}>Pr&oacute;ximo evento</span><h2 className="t2" style={{ fontSize: 32 }}>[Nombre del evento]</h2><p style={{ fontSize: 17, color: "#4A3B37" }}>[Fecha, lugar y aforo]. Con sesiones del DJ Mr.Matt para relajarte y disfrutar despu&eacute;s de comer, mindfulness, actividades, comida sana y gente con la que compartirlo.</p></div>
<div className="card stack g12" style={{ flex: "1 1 280px", minWidth: "0" }}><p style={{ display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ fontSize: 44, fontWeight: "800", lineHeight: "1" }}>30,40 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>por persona</span></p><p className="small muted">Precio de suscriptora o suscriptor (20 % de descuento sobre 38 &euro;).</p><a className="btn b3 full" href="#">Reservar mi plaza</a></div></div>
<section className="stack g16"><h2 className="t3">Fotos de los anteriores</h2><div className="grid c4"><div className="ph" style={{ aspectRatio: "4/3", borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: "4/3", borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: "4/3", borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: "4/3", borderRadius: 20 }}>[FOTO]</div></div></section>
<div className="card tint stack g8"><h3 className="t4">&iquest;A&uacute;n no hay evento programado?</h3><p style={{ fontSize: 16, color: "var(--soft)" }}>Este espacio mostrar&aacute; &ldquo;A&uacute;n no hay eventos programados. Te avisamos por email cuando abramos el pr&oacute;ximo&rdquo;.</p></div>
    </>
  )
}
