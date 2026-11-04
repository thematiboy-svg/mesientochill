'use client'
import { useEffect, useState } from 'react'
import Chillsi from '../../components/Chillsi'
import type { Enlace, Tema } from '../../lib/chillsi'

// En la landing, los enlaces de Chillsi llevan a sus secciones o páginas propias, nunca a la web.
const MAPA: Record<string, string | null> = {
  '/precios': '/landing#precios',
  '/eventos': '/landing#eventos',
  '/metodo': '/landing#metodo',
  '/monica': '/landing#monica',
  '/clases': '/landing#clases',
  '/contacto': '/landing/contacto',
  '/registro': '/landing#apuntate',
  '/login': null,
}
const TEXTOS: Record<string, string> = {
  '/registro': 'Apuntarme al piloto',
  '/clases': 'Ver las clases',
}
function mapEnlace(e: Enlace): Enlace | null {
  if (e.href.startsWith('/landing')) return e
  if (!(e.href in MAPA)) return null
  const href = MAPA[e.href]
  return href ? { ...e, href, texto: TEXTOS[e.href] ?? e.texto } : null
}

// Respuestas propias de la landing (tienen prioridad sobre las generales)
const FORMULARIO = { texto: 'Ir al formulario', href: '/landing#apuntate' }
const TEMAS_LANDING: Tema[] = [
  {
    id: 'plaza',
    titulo: 'Reservar mi plaza',
    claves: ['reservo mi plaza', 'reservar mi plaza', 'reserva mi plaza', 'como reservo mi plaza', 'reservar plaza', 'reservo plaza', 'como reservo', 'reservar', 'reservo', 'apuntarme', 'apuntarse', 'me apunto', 'piloto'],
    respuesta: 'Resérvala en el formulario de esta página «Tu pausa de 20 minutos te está esperando».',
    enlaces: [FORMULARIO],
    relacionados: ['aviso', 'precios', 'persona'],
  },
  {
    id: 'aviso',
    titulo: 'Cómo me avisáis',
    // incluye las claves de «plaza»: si la pregunta además habla de avisar, gana este tema
    claves: ['reservo mi plaza', 'reservar mi plaza', 'reserva mi plaza', 'como reservo mi plaza', 'reservar plaza', 'reservo plaza', 'como reservo', 'reservar', 'reservo', 'apuntarme', 'apuntarse', 'me apunto', 'piloto', 'me avisais', 'como me avisais', 'avisais', 'avisareis', 'me aviseis', 'avisar', 'como me entero', 'cuando empezais', 'cuando empeceis', 'cuando empezamos', 'cuando empieza', 'cuando empiezan', 'cuando comienza'],
    respuesta: 'Resérvala en el formulario de esta página «Tu pausa de 20 minutos te está esperando». Te avisaremos por email cuando empecemos.',
    enlaces: [FORMULARIO],
    relacionados: ['plaza', 'precios', 'persona'],
  },
]
// Versiones para el piloto de temas generales (mismo id: sustituyen a las de la web en la landing)
const CONTACTO = { texto: 'Ir a Contacto', href: '/landing/contacto' }
const PILOTO: Tema[] = [
  {
    id: 'reservar',
    titulo: 'Reservar una clase',
    claves: ['reservar una clase', 'reservar clase', 'reservo una clase', 'reserva de clase', 'coger clase', 'apuntar a una clase', 'apuntarme a una clase'],
    respuesta: 'Durante el piloto todavía no se reservan clases. Primero reserva tu plaza en el formulario «Tu pausa de 20 minutos te está esperando» y te avisaremos por email cuando empecemos; entonces podrás reservar cada clase con tus créditos.',
    enlaces: [FORMULARIO],
    relacionados: ['plaza', 'aviso', 'horarios'],
  },
  {
    id: 'cancelar',
    titulo: 'Cancelar una clase',
    claves: ['cancelar', 'cancelo', 'cancelacion', 'anular', 'no puedo ir', 'no voy a poder', 'desapuntar'],
    respuesta: 'Cuando empecemos, podrás cancelar una clase hasta 24 horas antes sin perder el crédito; con menos de 24 horas se pierde. Si Mónica cancela una clase, tampoco lo pierdes. Si ya no quieres que te avisemos del piloto, escríbenos desde Contacto.',
    enlaces: [CONTACTO],
    relacionados: ['creditos', 'plaza'],
  },
  {
    id: 'creditos',
    titulo: 'Cómo funcionan los créditos',
    claves: ['credito', 'creditos', 'cuantas clases', 'caducan', 'caduca', 'me quedan', 'renuevan', 'saldo'],
    respuesta: 'Con el plan Directo y vídeos tendrás 8 créditos al mes: cada clase en directo gasta 1 crédito. Se renuevan cada mes y caducan a fin de mes. Empezarán a contar cuando arranquemos y te suscribas.',
    enlaces: [{ texto: 'Ver precios', href: '/landing#precios' }],
    relacionados: ['precios', 'plaza'],
  },
  {
    id: 'noasisto',
    titulo: 'Si no me conecto',
    claves: ['no asisto', 'no asisti', 'no pude', 'no pude conectarme', 'no me pude conectar', 'no me conecte', 'no puedo conectarme', 'falte', 'me la perdi', 'grabada', 'grabacion', 'grabaciones'],
    respuesta: 'Cuando empecemos, si reservas una clase y no te conectas, pierdes el crédito de esa clase. Las clases en directo se graban, así que podrás verlas después cuando quieras.',
    relacionados: ['cancelar', 'creditos'],
  },
  {
    id: 'horarios',
    titulo: 'Horarios de las clases',
    claves: ['horario', 'horarios', 'hora', 'a que hora', 'cuando son', 'que dias', 'franja', 'cafe', 'comida', 'despues del trabajo', 'duracion', 'cuanto dura', 'minutos'],
    respuesta: 'Las clases en directo duran 20 minutos y hay tres franjas: la hora del café, la hora de la comida y después del trabajo. En el formulario eliges la que prefieres, y antes de empezar te diremos por email los días y horas exactos.',
    enlaces: [FORMULARIO],
    relacionados: ['plaza', 'aviso'],
  },
  {
    id: 'completa',
    titulo: 'Plazas limitadas',
    claves: ['completa', 'llena', 'lista de espera', 'espera', 'no hay plazas', 'sin plazas', 'plazas limitadas', 'cuantas plazas', 'cuantas personas'],
    respuesta: 'Cada clase tendrá un máximo de 10 personas, por eso las plazas del piloto son limitadas. Apúntate ya en el formulario para reservar la tuya.',
    enlaces: [FORMULARIO],
    relacionados: ['plaza', 'aviso'],
  },
  {
    id: 'precios',
    titulo: 'Tarifas y planes',
    claves: ['precio', 'precios', 'tarifa', 'tarifas', 'cuanto cuesta', 'cuesta', 'plan', 'planes', 'euros', 'mensual', 'suscripcion', 'pagar', 'pago', 'gratis'],
    respuesta: 'Hay dos planes: Solo vídeos, por 39 € al mes, con la biblioteca de clases grabadas de 45 minutos por niveles; y Directo y vídeos, por 49 € al mes, que añade las clases en directo de 20 minutos con 8 créditos al mes. Ahora no pagas nada: en el formulario indicas el plan que te interesa y, cuando empecemos, te suscribes.',
    enlaces: [{ texto: 'Ver precios', href: '/landing#precios' }, FORMULARIO],
    relacionados: ['plaza', 'creditos'],
  },
  {
    id: 'cambioplan',
    titulo: 'Elegir o cambiar de plan',
    claves: ['cambiar de plan', 'cambio de plan', 'cambiar plan', 'subir de plan', 'bajar de plan', 'pasar a', 'otro plan'],
    respuesta: 'En el formulario indicas el plan que te interesa, pero ahora no pagas nada ni te comprometes. Cuando empecemos podrás elegir el plan definitivo al suscribirte y cambiarlo después cuando quieras.',
    enlaces: [FORMULARIO],
    relacionados: ['precios', 'plaza'],
  },
  {
    id: 'baja',
    titulo: 'Dejar de recibir avisos',
    claves: ['baja', 'darme de baja', 'dar de baja', 'cancelar suscripcion', 'cancelar la suscripcion', 'dejar de pagar', 'borrar cuenta', 'eliminar cuenta', 'borrar mis datos', 'no quiero recibir'],
    respuesta: 'Ahora no pagas nada ni tienes suscripción. Si ya no quieres que te avisemos del piloto o quieres que borremos tus datos, escríbenos desde Contacto.',
    enlaces: [CONTACTO],
  },
  {
    id: 'devolucion',
    titulo: 'Devoluciones',
    claves: ['devolucion', 'devolver', 'devuelve', 'reembolso', 'reembolsar', 'dinero'],
    respuesta: 'Ahora no pagas nada. Cuando te suscribas, ten en cuenta que una vez contratado el mes no se devuelve el importe. Si tienes cualquier duda, escríbenos desde Contacto.',
    enlaces: [CONTACTO],
  },
  {
    id: 'acceso',
    titulo: 'Cuenta y contraseña',
    claves: ['contrasena', 'password', 'no puedo entrar', 'iniciar sesion', 'login', 'olvide', 'acceder', 'cuenta', 'mi cuenta', 'registrarme', 'registro'],
    respuesta: 'Durante el piloto no necesitas cuenta ni contraseña: basta con apuntarte en el formulario. Cuando empecemos te explicaremos por email cómo entrar.',
    enlaces: [FORMULARIO],
    relacionados: ['plaza', 'aviso'],
  },
]
const TEMAS_PILOTO = [...TEMAS_LANDING, ...PILOTO]
const SUGERENCIAS_LANDING = ['plaza', 'aviso', 'precios', 'eventos', 'persona']
const SALUDO = 'Hola, soy Chillsi, el asistente de MeSientoChill. Te ayudo con el piloto, las clases, los precios y los eventos. ¿Qué necesitas?'

// Botón flotante «Ayuda» que abre Chillsi en una ventana dentro de la landing.
export default function LandingChat() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const k = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])
  return (
    <>
      {open && (
        <div className="lp-chat" role="dialog" aria-label="Chillsi, el asistente de MeSientoChill">
          <button type="button" className="lp-chat-x" aria-label="Cerrar el chat" onClick={() => setOpen(false)}>×</button>
          <Chillsi mapEnlace={mapEnlace} temasExtra={TEMAS_PILOTO} sugerencias={SUGERENCIAS_LANDING} saludo={SALUDO} />
        </div>
      )}
      <button type="button" className="fab" aria-expanded={open} aria-label={open ? 'Cerrar el chat de ayuda' : 'Ayuda: hablar con Chillsi, el asistente'} onClick={() => setOpen((o) => !o)} style={{ background: 'none', border: 0, padding: 0, font: 'inherit', cursor: 'pointer' }}>
        <span className="fab-ic">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z" /><path d="M8 9.5h8M8 12.5h8M8 15.5h8" /></svg>
        </span>
        <span className="fab-lb">{open ? 'Cerrar' : 'Ayuda'}</span>
      </button>
    </>
  )
}
