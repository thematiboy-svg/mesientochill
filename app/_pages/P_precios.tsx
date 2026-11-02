import Link from 'next/link'

export default function P_precios() {
  return (
    <>
<section className="sec tint"><div className="in stack g48"><div className="stack g12"><span className="eyebrow">Precios</span><h1 className="t1">Elige c&oacute;mo quieres practicar</h1><p className="lead" style={{ color: "var(--soft)" }}>Cancela cuando quieras desde tu cuenta.</p></div>
<div className="grid c2" style={{ alignItems: "stretch" }}>
<div className="card stack g20" style={{ padding: 36 }}><h3 className="t3">Solo v&iacute;deos</h3>
<p style={{ display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 52, fontWeight: "800", lineHeight: "1" }}>39 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>/mes</span></p>
<ul className="list stack g12" style={{ flex: "1 1 auto" }}><li>Biblioteca de clases grabadas</li><li>Clases de 45 minutos por niveles</li><li>Directos grabados</li></ul><Link className="btn b2 full" href="/registro">Empezar con v&iacute;deos</Link></div>
<div className="card sel stack g20" style={{ padding: 34 }}><div className="wrapr between center g12"><h3 className="t3">Directo y v&iacute;deos</h3><span className="chip coral">Incluye directos</span></div>
<p style={{ display: "flex", alignItems: "baseline", gap: 8 }}><span style={{ fontSize: 52, fontWeight: "800", lineHeight: "1" }}>49 &euro;</span><span className="muted" style={{ fontWeight: "600" }}>/mes</span></p>
<ul className="list stack g12" style={{ flex: "1 1 auto" }}><li>Todo lo del plan de v&iacute;deos</li><li>Clases en directo de 20 minutos</li><li>8 cr&eacute;ditos al mes para reservar</li><li>M&aacute;ximo 10 personas por clase</li></ul><Link className="btn b1 full" href="/registro">Empezar con directos</Link></div>
</div><div className="card tint stack g20"><h3 className="t4" style={{ fontSize: 22 }}>C&oacute;mo funcionan los cr&eacute;ditos</h3>
<div className="grid c4" style={{ gap: 20 }}>
<p className="small" style={{ color: "var(--soft)" }}><strong style={{ color: "var(--ink)" }}>Reserva con 1 cr&eacute;dito.</strong> Cada clase en directo gasta 1 cr&eacute;dito. Solo puedes reservar una clase al d&iacute;a.</p>
<p className="small" style={{ color: "var(--soft)" }}><strong style={{ color: "var(--ink)" }}>8 cr&eacute;ditos al mes.</strong> Se renuevan cada mes y caducan a fin de mes.</p>
<p className="small" style={{ color: "var(--soft)" }}><strong style={{ color: "var(--ink)" }}>Cancela hasta 24 horas antes</strong> y no pierdes el cr&eacute;dito. Si M&oacute;nica cancela una clase, tampoco.</p>
<p className="small" style={{ color: "var(--soft)" }}><strong style={{ color: "var(--ink)" }}>Si reservas y no asistes,</strong> pierdes el cr&eacute;dito de esa clase.</p>
</div></div>
<p style={{ borderRadius: 20, padding: "20px 28px", fontSize: 17, fontWeight: "600", background: "var(--coral)", textAlign: "center" }}>AHORA SOLO POR 39 &euro;/mes con v&iacute;deos o 49 &euro;/mes con v&iacute;deos y clases en DIRECTO.</p></div></section>
<section className="sec white"><div className="in stack g24"><h2 className="t2">Qu&eacute; incluye cada plan</h2><div className="scroll-x"><table className="tbl" style={{ minWidth: 560 }}><thead><tr><th /><th>Solo v&iacute;deos &middot; 39 &euro;</th><th>Directo y v&iacute;deos &middot; 49 &euro;</th></tr></thead><tbody>
<tr><td>Biblioteca de clases grabadas de 45 minutos</td><td>Incluida</td><td>Incluida</td></tr>
<tr><td>Directos grabados</td><td>Incluidos</td><td>Incluidos</td></tr>
<tr><td>Clases en directo de 20 minutos</td><td>No incluidas</td><td>Incluidas</td></tr>
<tr><td>Cr&eacute;ditos al mes</td><td>No aplica</td><td>8</td></tr>
<tr><td>M&aacute;ximo por clase en directo</td><td>No aplica</td><td>10 personas</td></tr>
<tr><td>Eventos de un d&iacute;a</td><td>10 % de descuento</td><td>20 % de descuento</td></tr></tbody></table></div></div></section>
<section className="sec"><div className="in wrapr" style={{ gap: "40px 72px", alignItems: "flex-start" }}><h2 className="t2" style={{ flex: "1 1 300px", minWidth: "0" }}>Preguntas sobre los planes</h2><div style={{ flex: "2 1 480px", minWidth: "0" }}><div className="faq">
<details open><summary><h3>&iquest;Necesito experiencia?</h3></summary><p>No. En cada clase se explica el ejercicio y se proponen alternativas.</p></details>
<details><summary><h3>&iquest;Qu&eacute; necesito?</h3></summary><p>Un espacio para moverte, ropa c&oacute;moda y conexi&oacute;n a internet. En el caso de Total Barre puedes utilizar una silla.</p></details>
<details><summary><h3>&iquest;Y si no puedo conectarme en directo?</h3></summary><p>Las clases se graban para verlas cuando quieras. Puedes cancelar tu reserva hasta 24 horas antes sin perder el cr&eacute;dito. Si no asistes a una clase reservada, pierdes el cr&eacute;dito de esa clase.</p></details>
<details><summary><h3>&iquest;Qu&eacute; pasa si la clase est&aacute; completa?</h3></summary><p>El m&aacute;ximo es de 10 personas. Puedes apuntarte a la lista de espera y, si se libera una plaza, avisamos por email a las tres primeras personas en espera. Se la queda quien la reserve primero.</p></details>
<details><summary><h3>&iquest;Puedo hacerlo si tengo molestias o una lesi&oacute;n?</h3></summary><p>Consulta antes con tu m&eacute;dico. Las clases no sustituyen un tratamiento m&eacute;dico ni fisioterapia.</p></details>
<details><summary><h3>&iquest;Tengo que comunicar mis lesiones al darme de alta?</h3></summary><p>S&iacute;. Al registrarte te pedimos que nos cuentes cualquier lesi&oacute;n, dolor o condici&oacute;n de salud que tengas, para que M&oacute;nica pueda adaptar las clases a ti.</p></details>
<details><summary><h3>&iquest;Hay una entrevista antes de empezar?</h3></summary><p>S&iacute;. M&oacute;nica hace una entrevista personal por videoconferencia a cada nueva persona antes de comenzar con las clases.</p></details>
<details><summary><h3>&iquest;Qui&eacute;n puede apuntarse y qu&eacute; responsabilidad tengo?</h3></summary><p>Tienes que ser mayor de edad. Haces los ejercicios bajo tu propia responsabilidad: MeSientoChill no se hace responsable de lesiones ni de otros inconvenientes derivados de la pr&aacute;ctica.</p></details>
<details><summary><h3>&iquest;Puedo apuntarme si estoy embarazada?</h3></summary><p>No. MeSientoChill no ofrece clases espec&iacute;ficas para embarazadas, por lo que no es posible unirse durante el embarazo. Te recomendamos buscar a un profesional que imparta clases especializadas para esta etapa.</p></details>
<details><summary><h3>&iquest;Qu&eacute; conexi&oacute;n necesito?</h3></summary><p>Una buena conexi&oacute;n a internet, para evitar cortes de imagen y sonido durante las clases.</p></details>
<details><summary><h3>&iquest;C&oacute;mo me doy de baja?</h3></summary><p>Desde tu cuenta, cuando quieras.</p></details>
<details><summary><h3>&iquest;Se devuelve el dinero?</h3></summary><p>No. Una vez contratado el mes, no se devuelve el importe, ya sea porque el formato no te guste o por cualquier otro inconveniente.</p></details>
</div></div></div></section>
    </>
  )
}
