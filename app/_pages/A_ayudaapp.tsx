import Link from 'next/link'
import Chillsi from '../../components/Chillsi'

export default function A_ayudaapp({ nombre }: { nombre?: string }) {
  return (
    <>
<div className="stack g8"><h1 className="t2">Ayuda</h1><p className="lead">Pregunta a Chillsi o escr&iacute;benos por el formulario de Contacto.</p></div>
<div className="wrapr" style={{ gap: 32, alignItems: "flex-start" }}><Chillsi nombre={nombre} conSesion style={{ flex: "2 1 420px", minWidth: "0" }} />
<div className="stack g16" style={{ flex: "1 1 280px", minWidth: "0" }}><div className="card tint stack g12"><h3 className="t4">Contacto</h3><p style={{ fontSize: 16, color: "var(--soft)" }}>Te responderemos lo antes posible por email.</p><Link className="btn b1 sm" href="/contacto" style={{ alignSelf: "flex-start" }}>Ir a Contacto</Link></div><div className="card stack g12"><h3 className="t4">Preguntas frecuentes</h3><div className="faq"><details open><summary><h3>&iquest;C&oacute;mo cancelo una reserva?</h3></summary><p>Puedes cancelar hasta 24 horas antes de la clase desde Mis reservas y no pierdes el cr&eacute;dito. Si no asistes a una clase reservada, pierdes el cr&eacute;dito de esa clase.</p></details><details><summary><h3>&iquest;Qu&eacute; pasa si la clase est&aacute; completa?</h3></summary><p>El m&aacute;ximo es de 10 personas. Puedes apuntarte a la lista de espera y, si se libera una plaza, avisamos por email a las tres primeras personas en espera. Se la queda quien la reserve primero.</p></details><details><summary><h3>&iquest;C&oacute;mo cambio de plan?</h3></summary><p>Desde la secci&oacute;n Suscripci&oacute;n puedes cambiar de plan o darte de baja cuando quieras.</p></details></div></div></div></div>
    </>
  )
}
