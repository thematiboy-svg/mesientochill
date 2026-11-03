import Link from 'next/link'

export default function P_eventos() {
  return (
    <>
<section className="sec blush"><div className="in wrapr center" style={{ gap: "40px 64px" }}><div className="stack g20" style={{ flex: "1 1 420px", minWidth: "0", alignItems: "flex-start" }}><span className="eyebrow" style={{ color: "#8A3A26" }}>Cuatro eventos al a&ntilde;o</span><h1 className="t1" style={{ fontSize: "clamp(34px,4vw,52px)" }}>Un d&iacute;a para ti y para la comunidad</h1>
<p className="lead" style={{ color: "#4A3B37" }}>Con sesiones del DJ Mr.Matt para relajarte y disfrutar despu&eacute;s de comer, mindfulness, actividades, comida sana y gente con la que compartirlo.</p></div>
<div className="card stack g16" style={{ flex: "1 1 320px", minWidth: "0" }}><span className="small muted" style={{ fontWeight: "700" }}>Pr&oacute;ximo evento: [fecha, lugar y aforo]</span>
<p style={{ display: "flex", alignItems: "baseline", gap: 10 }}><span style={{ fontSize: 52, fontWeight: "800", lineHeight: "1" }}>38 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>por persona</span></p>
<p style={{ fontSize: 17, fontWeight: "700", color: "var(--teal)" }}>Si est&aacute;s suscrita o suscrito: 30,40 &euro; con el plan Directo y v&iacute;deos (20 % de descuento) y 34,20 &euro; con Solo v&iacute;deos (10 % de descuento)</p>
<div className="field"><label htmlFor="ev-mail">Tu email</label><input id="ev-mail" className="in-t" type="email" placeholder="tu@email.com" /></div><a className="btn b3 full" href="#">Av&iacute;same del pr&oacute;ximo</a></div></div></section>
<section className="sec"><div className="in stack g32"><h2 className="t2">Una cita por estaci&oacute;n</h2><div className="grid c4"><div className="card blush stack g12"><span className="dot m" style={{ width: 14, height: 14 }} /><h3 className="t3">Primavera</h3><p className="small" style={{ color: "#4A3B37" }}>[Fecha y lugar]</p></div><div className="card blush stack g12"><span className="dot c" style={{ width: 14, height: 14 }} /><h3 className="t3">Verano</h3><p className="small" style={{ color: "#4A3B37" }}>[Fecha y lugar]</p></div><div className="card blush stack g12"><span className="dot i" style={{ width: 14, height: 14, background: "#8A3A26" }} /><h3 className="t3">Oto&ntilde;o</h3><p className="small" style={{ color: "#4A3B37" }}>[Fecha y lugar]</p></div><div className="card blush stack g12"><span className="dot i" style={{ width: 14, height: 14, background: "#3F403B" }} /><h3 className="t3">Invierno</h3><p className="small" style={{ color: "#4A3B37" }}>[Fecha y lugar]</p></div></div></div></section>
<section className="sec white"><div className="in stack g32"><h2 className="t2">Qu&eacute; pasa en un evento</h2><div className="grid">
<div className="card stack g12"><h3 className="t3">M&uacute;sica de DJ en vivo</h3><p className="muted" style={{ fontSize: 17 }}>2 sesiones en directo de Mr.Matt, una pensada para la relajaci&oacute;n y otra para disfrutar despu&eacute;s de comer.</p></div>
<div className="card stack g12"><h3 className="t3">Mindfulness y actividades</h3><p className="muted" style={{ fontSize: 17 }}>Pr&aacute;cticas guiadas por M&oacute;nica y actividades para hacer en grupo.</p></div>
<div className="card stack g12"><h3 className="t3">Comida sana</h3><p className="muted" style={{ fontSize: 17 }}>Comemos y bebemos juntos algo rico y saludable.</p></div>
<div className="card stack g12"><h3 className="t3">Haz comunidad</h3><p className="muted" style={{ fontSize: 17 }}>Un encuentro para conocer a las personas de MeSientoChill.&nbsp;<br />Aunque cualquier persona ser&aacute; bienvenida.</p></div></div>
<div className="ph" style={{ height: 240, borderRadius: 28 }}>[FOTOS DE EVENTOS ANTERIORES]</div></div></section>
    </>
  )
}
