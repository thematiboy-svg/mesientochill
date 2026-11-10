import Link from 'next/link'

export default function P_home() {
  return (
    <>
<section className="sec" style={{ paddingTop: 56, paddingBottom: 88 }}><div className="in wrapr center g48" style={{ gap: 48 }}>
<div className="stack g24" style={{ flex: "1 1 460px", minWidth: "0", alignItems: "flex-start" }}>
<span className="chip tint" style={{ color: "var(--teal)", letterSpacing: ".08em", textTransform: "uppercase", fontSize: 13 }}>Pilates &middot; Total Barre &middot; Mindfulness</span>
<h1 className="t1">20 minutos para <span className="accent">cambiar tu energ&iacute;a</span></h1>
<p className="lead" style={{ maxWidth: 560 }}>Pilates, Total Barre y Mindfulness en directo con M&oacute;nica Mu&ntilde;oz. Una pausa en mitad del d&iacute;a para volver al trabajo con la cabeza clara.</p>
<div className="wrapr g16 center"><Link className="btn b1" href="/registro">Quiero mi plaza</Link><Link className="btn b2" href="/clases">Ver las clases</Link></div>
<div className="stack g8"><p className="small" style={{ fontWeight: "600", color: "var(--teal)" }}>Plazas limitadas.</p><p className="small hero-facts" style={{ fontWeight: "500", color: "var(--muted)" }}>Clases de 20 minutos &middot; M&aacute;ximo 10 personas por clase &middot; Desde casa o la oficina</p></div></div>
<div style={{ flex: "1 1 380px", minWidth: "0", display: "flex", justifyContent: "center" }}><div className="hero-art" style={{ position: "relative", width: "min(460px,100%)", aspectRatio: "1/1" }}>
<div className="ha-bg" style={{ position: "absolute", inset: "0", borderRadius: "50%", background: "var(--blush)" }} />
<img className="ha-sym" src="/simbolo.svg" alt="Símbolo de MeSientoChill: un círculo con una sonrisa" style={{ position: "absolute", left: "14%", top: "12%", width: "72%", height: "72%" }} />
<div className="ha-20" style={{ position: "absolute", top: "2%", right: "0", width: 112, height: 112, borderRadius: "50%", background: "var(--coral)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: "1.1" }}><b style={{ fontSize: 36, fontWeight: "800" }}>20</b><span className="xs" style={{ fontWeight: "700" }}>minutos</span></div>
<div className="ha-card hero-badge" style={{ position: "absolute", left: "-2%", bottom: "4%", width: 270, maxWidth: "80%", background: "#fff", border: "1px solid #CFE3DF", borderRadius: 20, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}><span style={{ fontSize: 14, fontWeight: "800" }}>Elige tu pausa</span><span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span className="dot m" />Hora del caf&eacute;</span><span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span className="dot c" />Hora de la comida</span><span style={{ fontSize: 14, fontWeight: "500", lineHeight: "1.3", display: "flex", alignItems: "center", gap: 10 }}><span className="dot i" />Despu&eacute;s del trabajo</span></div></div></div>
</div></section>

<section className="sec white"><div className="in wrapr g48" style={{ alignItems: "flex-start", gap: "32px 64px" }}>
<h2 className="t2" style={{ flex: "1 1 380px", minWidth: "0" }}>Trabajas mucho, te paras poco y el estr&eacute;s se queda en el cuerpo</h2>
<p className="lead" style={{ flex: "1 1 360px", minWidth: "0" }}>Cuello cargado, mente acelerada y la sensaci&oacute;n de ir siempre apagando fuegos. No necesitas una hora ni desplazarte a un centro. Necesitas una pausa que funcione.</p></div></section>

<section className="sec"><div className="in stack g32">
<div className="wrapr between g16" style={{ alignItems: "flex-end" }}><div className="stack g12"><h2 className="t2">Elige tu pausa de hoy</h2><p className="lead">Las tres siguientes clases en directo. Reserva con 1 cr&eacute;dito.</p></div><Link className="btn b4 sm" href="/clases">Ver todas las clases</Link></div>
<div className="grid"><div className="card stack g16"><div className="wrapr between center g12"><span className="small muted" style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: 8 }}><span className="dot m" />Hora del caf&eacute;</span><span className="chip tint">4 plazas libres</span></div>
<p style={{ fontSize: 30, fontWeight: "800", lineHeight: "1.1" }}>Hoy &middot; 11:00</p><p className="t3">Pilates</p><p className="small muted">20 minutos con M&oacute;nica Mu&ntilde;oz</p><div className="wrapr g8 center" role="group" aria-label="Días de esta clase: lunes, miércoles y viernes"><span className="small muted" style={{ fontWeight: "700" }}>D&iacute;as</span><span className="chip tint">Lun</span><span className="chip tint">Mi&eacute;</span><span className="chip tint">Vie</span></div><Link className="btn sm b1" href="/login">Reservar</Link></div><div className="card stack g16"><div className="wrapr between center g12"><span className="small muted" style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: 8 }}><span className="dot c" />Hora de la comida</span><span className="chip tint">7 plazas libres</span></div>
<p style={{ fontSize: 30, fontWeight: "800", lineHeight: "1.1" }}>Hoy &middot; 14:00</p><p className="t3">Mindfulness</p><p className="small muted">20 minutos con M&oacute;nica Mu&ntilde;oz</p><div className="wrapr g8 center" role="group" aria-label="Días de esta clase: martes y jueves"><span className="small muted" style={{ fontWeight: "700" }}>D&iacute;as</span><span className="chip tint">Mar</span><span className="chip tint">Jue</span></div><Link className="btn sm b1" href="/login">Reservar</Link></div><div className="card stack g16"><div className="wrapr between center g12"><span className="small muted" style={{ fontWeight: "700", display: "flex", alignItems: "center", gap: 8 }}><span className="dot i" />Despu&eacute;s del trabajo</span><span className="chip warn">Clase completa &middot; 10 de 10</span></div>
<p style={{ fontSize: 30, fontWeight: "800", lineHeight: "1.1" }}>Hoy &middot; 19:00</p><p className="t3">Total Barre</p><p className="small muted">20 minutos con M&oacute;nica Mu&ntilde;oz</p><div className="wrapr g8 center" role="group" aria-label="Días de esta clase: lunes, miércoles y viernes"><span className="small muted" style={{ fontWeight: "700" }}>D&iacute;as</span><span className="chip tint">Lun</span><span className="chip tint">Mi&eacute;</span><span className="chip tint">Vie</span></div><Link className="btn sm b4" href="/login">Lista de espera</Link></div></div>
<p className="small muted">Horarios y plazas de ejemplo. Para reservar tienes que iniciar sesi&oacute;n con el plan Directo y v&iacute;deos.</p></div></section>

<section className="sec white"><div className="in stack g48"><h2 className="t2">Tu pausa en tres pasos</h2>
<div className="grid">
<div className="card stack g16"><span className="num">1</span><h3 className="t3">Reserva tu pausa</h3><p className="muted" style={{ fontSize: 17 }}>Elige entre la hora del caf&eacute;, la de la comida o despu&eacute;s del trabajo.</p></div>
<div className="card stack g16"><span className="num">2</span><h3 className="t3">Con&eacute;ctate</h3><p className="muted" style={{ fontSize: 17 }}>20 minutos en directo desde casa o la oficina. Solo necesitas un hueco y ropa c&oacute;moda.</p></div>
<div className="card stack g16"><span className="num">3</span><h3 className="t3">Vuelve al trabajo</h3><p className="muted" style={{ fontSize: 17 }}>Con el cuerpo m&aacute;s suelto y la mente m&aacute;s clara.</p></div></div></div></section>

<section className="sec tint"><div className="in stack g32"><div className="stack g12"><h2 className="t2">Elige c&oacute;mo quieres practicar</h2><p className="lead" style={{ color: "var(--soft)" }}>Cancela cuando quieras desde tu cuenta.</p></div>
<div className="grid c2" style={{ alignItems: "stretch" }}>
<div className="card stack g20" style={{ padding: 36 }}><h3 className="t3">Solo v&iacute;deos</h3>
<p style={{ display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 52, fontWeight: "800", lineHeight: "1" }}>39 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>/mes</span></p>
<ul className="list stack g12" style={{ flex: "1 1 auto" }}><li>Biblioteca de clases grabadas</li><li>Clases de 45 minutos por niveles</li><li>Directos grabados</li></ul><Link className="btn b2 full" href="/registro">Empezar con v&iacute;deos</Link></div>
<div className="card sel stack g20" style={{ padding: 34 }}><div className="wrapr between center g12"><h3 className="t3">Directo y v&iacute;deos</h3><span className="chip coral">Incluye directos</span></div>
<p style={{ display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 52, fontWeight: "800", lineHeight: "1" }}>49 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>/mes</span></p>
<ul className="list stack g12" style={{ flex: "1 1 auto" }}><li>Todo lo del plan de v&iacute;deos</li><li>Clases en directo de 20 minutos</li><li>8 cr&eacute;ditos al mes para reservar</li><li>M&aacute;ximo 10 personas por clase</li></ul><Link className="btn b1 full" href="/registro">Empezar con directos</Link></div>
</div><Link className="btn b4" href="/precios" style={{ alignSelf: "flex-start" }}>Ver todos los detalles de los planes</Link></div></section>

<section className="sec"><div className="in wrapr center" style={{ gap: "48px 72px" }}>
<div className="img" style={{ flex: "1 1 320px", minWidth: "0", aspectRatio: "4/5", maxHeight: 560 }}><img src="/monica-estudio.jpg" alt="Mónica Muñoz, instructora de MeSientoChill, sonriendo en un estudio de Total Barre" style={{ objectPosition: "55% 40%" }} /></div>
<div className="stack g20" style={{ flex: "1 1 420px", minWidth: "0", alignItems: "flex-start" }}><span className="eyebrow">Tu instructora</span><h2 className="t2">Hola, soy M&oacute;nica Mu&ntilde;oz</h2>
<p className="lead">M&aacute;s de 20 a&ntilde;os cuidando la salud y el bienestar de las personas. Hoy te acompa&ntilde;o con Pilates, Total Barre y Mindfulness para aliviar el estr&eacute;s, las dolencias y la apat&iacute;a.</p><Link className="btn b1" href="/monica">Conoce a M&oacute;nica</Link></div></div></section>

<section className="sec"><div className="in card tint stack g24 center" style={{ textAlign: "center", padding: "56px 32px", alignItems: "center" }}><h2 className="t2" style={{ maxWidth: 720 }}>Tu pausa de 20 minutos te est&aacute; esperando</h2><p className="lead" style={{ color: "var(--soft)" }}>Reg&iacute;strate, elige tu plan y reserva tu primera clase.</p><Link className="btn b1" href="/registro">Empezar</Link></div></section>
    </>
  )
}
