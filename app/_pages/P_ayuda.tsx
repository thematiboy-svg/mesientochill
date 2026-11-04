import Chillsi from '../../components/Chillsi'
import ContactForm from '../../components/ContactForm'
import Faqs from '../../components/Faqs'

export default function P_ayuda() {
  return (
    <>
<section className="sec" style={{ paddingBottom: 40 }}><div className="in stack g16"><span className="eyebrow">Ayuda</span><h1 className="t1">&iquest;En qu&eacute; te ayudamos?</h1><p className="lead" style={{ maxWidth: 640 }}>Resuelve tus dudas con Chillsi, las preguntas frecuentes o escr&iacute;benos a trav&eacute;s del formulario de abajo o la p&aacute;gina de Contacto</p></div></section>
<section className="sec" style={{ paddingTop: 24 }}><div className="in wrapr" style={{ gap: "40px 56px", alignItems: "flex-start" }}><Chillsi style={{ flex: "1 1 380px", minWidth: "0" }} />
<div style={{ flex: "1 1 420px", minWidth: "0" }} className="stack g32"><div className="stack g12"><h2 className="t2" style={{ fontSize: 30 }}>Preguntas frecuentes</h2><Faqs /></div></div></div></section>
<section className="sec white"><div className="in wrapr" style={{ gap: "40px 72px", alignItems: "flex-start" }}><div className="stack g16" style={{ flex: "1 1 320px", minWidth: "0" }}><h2 className="t2">Escr&iacute;benos</h2><p className="lead">Te respondemos por email lo antes posible. Para cobros, devoluciones o dudas de salud, escribe aqu&iacute; y te atiende una persona.</p>
<ul className="list stack g12" /></div>
<ContactForm /></div></section>
    </>
  )
}
