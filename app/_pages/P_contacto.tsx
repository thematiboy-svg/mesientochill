import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

// landing: versión para la landing, sin zona privada ni enlaces a la web
export default function P_contacto({ landing = false }: { landing?: boolean }) {
  return (
    <>
<section className="sec" style={{ paddingBottom: "32px" }}><div className="in stack g16"><span className="eyebrow">Contacto</span><h1 className="t1">Contacto</h1><p className="lead" style={{ maxWidth: "640px" }}>Te responderemos lo antes posible por email.</p></div></section>
<section className="sec" style={{ paddingTop: "8px" }}><div className="in wrapr" style={{ gap: "40px 72px", alignItems: "flex-start" }}><div className="stack g16" style={{ flex: "1 1 320px", minWidth: "0" }}><h2 className="t2">Escríbenos</h2><p className="lead">Para cobros, devoluciones o dudas de salud, escribe aquí y te atiende una persona.</p>
<ul className="list stack g12">{!landing && <li><span>Si ya tienes cuenta, también puedes preguntar a Chillsi en la sección Ayuda de tu zona privada.</span></li>}<li><span>Antes de escribirnos, mira las <Link href={landing ? '/landing#preguntas' : '/ayuda'} style={{ color: "inherit", textDecoration: "underline" }}>preguntas frecuentes</Link>: quizá tengas la respuesta al momento.</span></li></ul></div>
<ContactForm privacidadHref={landing ? '/landing/privacidad' : '/privacidad'} /></div></section>
    </>
  )
}
