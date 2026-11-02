import Link from 'next/link'

export default function P_ayuda() {
  return (
    <>
<section className="sec" style={{ paddingBottom: 40 }}><div className="in stack g16"><span className="eyebrow">Ayuda</span><h1 className="t1">&iquest;En qu&eacute; te ayudamos?</h1><p className="lead" style={{ maxWidth: 640 }}>Resuelve tus dudas con Chillsi, las preguntas frecuentes o escr&iacute;benos a trav&eacute;s del formulario de abajo o la p&aacute;gina de Contacto</p></div></section>
<section className="sec" style={{ paddingTop: 24 }}><div className="in wrapr" style={{ gap: "40px 56px", alignItems: "flex-start" }}><div className="chat" style={{ flex: "1 1 380px", minWidth: "0" }}><div className="chat-h"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></svg><span>Chillsi &middot; asistente de MeSientoChill</span></div>
<div className="chat-b"><div className="msg bot">Hola, soy Chillsi, el asistente de MeSientoChill. Te ayudo con horarios, reservas, cr&eacute;ditos y tarifas. &iquest;Qu&eacute; necesitas?</div>
<div className="wrapr g8"><span className="chip">Reservar una clase</span><span className="chip">Mis cr&eacute;ditos</span><span className="chip">Tarifas y cambio de plan</span><span className="chip">Eventos de un d&iacute;a</span><span className="chip coral">Hablar con una persona</span></div></div>
<div className="chat-f"><input className="in-t" type="text" placeholder="Escribe tu pregunta" aria-label="Escribe tu pregunta" style={{ flex: "1 1 200px" }} /><a className="btn b1 sm" href="#">Enviar</a></div></div>
<div style={{ flex: "1 1 420px", minWidth: "0" }} className="stack g32"><div className="stack g12"><h2 className="t2" style={{ fontSize: 30 }}>Preguntas frecuentes</h2><div className="faq">
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
</div></div></div></div></section>
<section className="sec white"><div className="in wrapr" style={{ gap: "40px 72px", alignItems: "flex-start" }}><div className="stack g16" style={{ flex: "1 1 320px", minWidth: "0" }}><h2 className="t2">Escr&iacute;benos</h2><p className="lead">Te respondemos por email lo antes posible. Para cobros, devoluciones o dudas de salud, escribe aqu&iacute; y te atiende una persona.</p>
<ul className="list stack g12" /></div>
<form className="card tint stack g20" style={{ flex: "1 1 420px", minWidth: "0" }}><div className="field"><label htmlFor="c-n">Nombre</label><input id="c-n" className="in-t" type="text" placeholder="Tu nombre" /></div>
<div className="field"><label htmlFor="c-e">Email</label><input id="c-e" className="in-t" type="email" placeholder="tu@email.com" /></div>
<div className="field"><label htmlFor="c-m">Mensaje</label><textarea id="c-m" className="in-t" placeholder="Cu\xE9ntanos qu\xE9 necesitas" /></div>
<label className="opt" style={{ alignItems: "flex-start", fontSize: 14 }}><input type="checkbox" /><span>He le&iacute;do y acepto la <Link href="/ayuda" style={{ color: "inherit", textDecoration: "underline" }}>pol&iacute;tica de privacidad</Link>.</span></label><button className="btn b1" type="submit">Enviar mensaje</button></form></div></section>
    </>
  )
}
