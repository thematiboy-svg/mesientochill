// Chillsi: asistente de preguntas frecuentes de MeSientoChill, sin IA.
// Busca palabras clave en la pregunta y responde con textos fijos.
// Para añadir o cambiar respuestas, edita TEMAS: cada tema tiene palabras clave,
// una respuesta y, opcionalmente, enlaces y temas relacionados.

export type Enlace = { texto: string; href: string; privado?: boolean }
export type Tema = {
  id: string
  /** Texto del botón de sugerencia */
  titulo: string
  /** Palabras o frases que activan el tema (sin tildes, en minúscula) */
  claves: string[]
  respuesta: string
  enlaces?: Enlace[]
  relacionados?: string[]
}

export const TEMAS: Tema[] = [
  {
    id: 'reservar',
    titulo: 'Reservar una clase',
    claves: ['reservar', 'reserva', 'apuntar a una clase', 'apuntarme a una clase', 'coger clase', 'como reservo', 'plaza'],
    respuesta:
      'Entra en Clases en directo, elige una clase del calendario y pulsa «Reservar con 1 crédito». Puedes reservar una clase al día y cada clase tiene un máximo de 10 personas. Las clases en directo están incluidas en el plan Directo y vídeos.',
    enlaces: [
      { texto: 'Ir a Clases en directo', href: '/app/directos', privado: true },
      { texto: 'Ver las clases', href: '/clases' },
    ],
    relacionados: ['cancelar', 'completa', 'creditos'],
  },
  {
    id: 'cancelar',
    titulo: 'Cancelar una reserva',
    claves: ['cancelar', 'cancelo', 'cancelacion', 'anular', 'no puedo ir', 'no voy a poder', 'desapuntar'],
    respuesta:
      'Puedes cancelar desde Mis reservas. Si cancelas hasta 24 horas antes, no pierdes el crédito. Con menos de 24 horas se cancela igual, pero pierdes el crédito de esa clase. Si Mónica cancela una clase, tampoco pierdes el crédito.',
    enlaces: [{ texto: 'Ver mis reservas', href: '/app/reservas', privado: true }],
    relacionados: ['noasisto', 'creditos'],
  },
  {
    id: 'creditos',
    titulo: 'Mis créditos',
    claves: ['credito', 'creditos', 'cuantas clases', 'caducan', 'caduca', 'me quedan', 'renuevan', 'saldo'],
    respuesta:
      'Con el plan Directo y vídeos tienes 8 créditos al mes. Cada clase en directo gasta 1 crédito. Se renuevan cada mes y caducan a fin de mes: los que no uses no pasan al mes siguiente. Puedes ver los tuyos en Mis reservas y créditos.',
    enlaces: [{ texto: 'Ver mis créditos', href: '/app/reservas', privado: true }],
    relacionados: ['reservar', 'cancelar'],
  },
  {
    id: 'noasisto',
    titulo: 'Si no me conecto',
    claves: ['no asisto', 'no asisti', 'no pude', 'no pude conectarme', 'no pude ir', 'no me pude conectar', 'no me conecte', 'no puedo conectarme', 'falte', 'no fui', 'me la perdi', 'grabada', 'grabacion', 'grabaciones'],
    respuesta:
      'Si reservas una clase y no te conectas, pierdes el crédito de esa clase. Las clases en directo se graban, así que puedes verlas después cuando quieras en la Biblioteca de vídeos.',
    enlaces: [{ texto: 'Ir a la Biblioteca de vídeos', href: '/app/biblioteca', privado: true }],
    relacionados: ['cancelar'],
  },
  {
    id: 'completa',
    titulo: 'Clase completa y lista de espera',
    claves: ['completa', 'llena', 'lista de espera', 'espera', 'no hay plazas', 'sin plazas'],
    respuesta:
      'Cada clase tiene un máximo de 10 personas. Si está completa, apúntate a la lista de espera. Si se libera una plaza, avisamos por email a las tres primeras personas de la lista y se la queda quien la reserve primero.',
    relacionados: ['reservar'],
  },
  {
    id: 'horarios',
    titulo: 'Horarios de las clases',
    claves: ['horario', 'horarios', 'hora', 'a que hora', 'cuando son', 'que dias', 'franja', 'cafe', 'comida', 'despues del trabajo', 'duracion', 'cuanto dura', 'minutos'],
    respuesta:
      // PENDIENTE: añadir días y horas cuando estén decididos (ver ROADMAP.md, Fase 2).
      'Las clases en directo duran 20 minutos y hay tres franjas para elegir: la hora del café, la hora de la comida y después del trabajo. Puedes ver los días y horas exactos en el calendario de Clases en directo.',
    enlaces: [
      { texto: 'Ver el calendario', href: '/app/directos', privado: true },
      { texto: 'Ver las clases', href: '/clases' },
    ],
    relacionados: ['disciplinas', 'reservar'],
  },
  {
    id: 'disciplinas',
    titulo: 'Qué clases hay',
    claves: ['pilates', 'barre', 'total barre', 'mindfulness', 'disciplina', 'que clases', 'tipo de clase', 'tipos de clase', 'que se hace'],
    respuesta:
      'Hay tres disciplinas: Pilates (fuerza y control del centro, cuidando la postura de quien pasa el día sentado), Total Barre (tonificación sin impacto de forma dinámica) y Mindfulness (respiración y atención plena para soltar la tensión del día).',
    enlaces: [{ texto: 'Conocer el método', href: '/metodo' }],
    relacionados: ['horarios', 'experiencia'],
  },
  {
    id: 'precios',
    titulo: 'Tarifas y planes',
    claves: ['precio', 'precios', 'tarifa', 'tarifas', 'cuanto cuesta', 'cuesta', 'plan', 'planes', 'euros', 'mensual', 'suscripcion', 'pagar', 'pago'],
    respuesta:
      'Hay dos planes: Solo vídeos, por 39 € al mes, con la biblioteca de clases grabadas de 45 minutos por niveles; y Directo y vídeos, por 49 € al mes, que añade las clases en directo de 20 minutos con 8 créditos al mes. Puedes cancelar cuando quieras desde tu cuenta.',
    enlaces: [
      { texto: 'Ver precios', href: '/precios' },
      { texto: 'Cambiar de plan', href: '/app/suscripcion', privado: true },
    ],
    relacionados: ['cambioplan', 'baja'],
  },
  {
    id: 'cambioplan',
    titulo: 'Cambiar de plan',
    claves: ['cambiar de plan', 'cambio de plan', 'cambiar plan', 'subir de plan', 'bajar de plan', 'pasar a'],
    respuesta: 'Puedes cambiar entre Solo vídeos y Directo y vídeos desde la sección Suscripción de tu cuenta.',
    enlaces: [{ texto: 'Ir a Suscripción', href: '/app/suscripcion', privado: true }],
    relacionados: ['precios', 'baja'],
  },
  {
    id: 'baja',
    titulo: 'Darme de baja',
    claves: ['baja', 'darme de baja', 'dar de baja', 'cancelar suscripcion', 'cancelar la suscripcion', 'dejar de pagar', 'borrar cuenta', 'eliminar cuenta'],
    respuesta: 'Te puedes dar de baja cuando quieras desde tu cuenta, en Suscripción.',
    enlaces: [{ texto: 'Ir a Suscripción', href: '/app/suscripcion', privado: true }],
    relacionados: ['devolucion'],
  },
  {
    id: 'devolucion',
    titulo: 'Devoluciones',
    claves: ['devolucion', 'devolver', 'devuelve', 'reembolso', 'reembolsar', 'dinero'],
    respuesta:
      'Una vez contratado el mes, no se devuelve el importe, tampoco si el formato no te gusta. Si tienes un problema con un cobro, escríbenos desde Contacto y te atiende una persona.',
    enlaces: [{ texto: 'Ir a Contacto', href: '/contacto' }],
  },
  {
    id: 'eventos',
    titulo: 'Eventos de un día',
    claves: ['evento', 'eventos', 'mr.matt', 'mr matt', 'dj', 'primavera', 'verano', 'otono', 'invierno', 'jornada'],
    respuesta:
      'Organizamos cuatro eventos al año, uno por estación: un día con 2 sesiones de música en directo con el DJ Mr.Matt, mindfulness, actividades, comida sana y comunidad. La entrada cuesta 38 €; con el plan Directo y vídeos sale a 30,40 € (20 % de descuento) y con Solo vídeos a 34,20 € (10 % de descuento).',
    enlaces: [{ texto: 'Ver eventos', href: '/eventos' }],
  },
  {
    id: 'experiencia',
    titulo: 'Si nunca he hecho clases',
    claves: ['experiencia', 'principiante', 'nunca he', 'empezar desde cero', 'nivel', 'niveles', 'novata', 'novato', 'primera vez'],
    respuesta: 'No necesitas experiencia. En cada clase se explica el ejercicio y se proponen alternativas.',
    relacionados: ['material', 'entrevista'],
  },
  {
    id: 'material',
    titulo: 'Qué necesito',
    claves: ['necesito', 'material', 'esterilla', 'ropa', 'silla', 'espacio', 'conexion', 'internet', 'camara', 'videoconferencia'],
    respuesta:
      'Un espacio para moverte, ropa cómoda y una buena conexión a internet para evitar cortes de imagen y sonido. Para Total Barre puedes usar una silla.',
    relacionados: ['experiencia'],
  },
  {
    id: 'salud',
    titulo: 'Lesiones y salud',
    claves: ['lesion', 'lesiones', 'dolor', 'molestia', 'molestias', 'espalda', 'rodilla', 'cervical', 'salud', 'medico', 'fisio', 'fisioterapia', 'operacion'],
    respuesta:
      'Si tienes una lesión o una condición de salud, consulta antes con tu médico: las clases no sustituyen un tratamiento médico ni la fisioterapia. Al darte de alta te pedimos que nos cuentes cualquier lesión o dolor para que Mónica pueda adaptar las clases. Para dudas concretas de salud, escríbenos y te atiende una persona.',
    enlaces: [
      { texto: 'Completar mi cuestionario', href: '/app/perfil', privado: true },
      { texto: 'Ir a Contacto', href: '/contacto' },
    ],
    relacionados: ['embarazo'],
  },
  {
    id: 'embarazo',
    titulo: 'Embarazo',
    claves: ['embarazo', 'embarazada', 'embarazadas', 'prenatal', 'postparto', 'posparto'],
    respuesta:
      'MeSientoChill no ofrece clases específicas para embarazadas, así que no es posible unirse durante el embarazo. Te recomendamos buscar a un profesional especializado en esta etapa.',
  },
  {
    id: 'entrevista',
    titulo: 'Entrevista inicial',
    claves: ['entrevista', 'antes de empezar', 'primera sesion', 'conocer a monica'],
    respuesta: 'Sí. Antes de empezar, Mónica hace una entrevista personal por videoconferencia a cada persona nueva.',
    relacionados: ['experiencia'],
  },
  {
    id: 'edad',
    titulo: 'Quién puede apuntarse',
    claves: ['edad', 'menor', 'menores', 'mayor de edad', 'anos', 'responsabilidad', 'quien puede'],
    respuesta:
      'Tienes que ser mayor de edad. Los ejercicios se hacen bajo tu propia responsabilidad: MeSientoChill no se hace responsable de lesiones ni de otros inconvenientes derivados de la práctica.',
  },
  {
    id: 'monica',
    titulo: 'Quién es Mónica',
    claves: ['monica', 'instructora', 'profesora', 'quien da las clases', 'quien imparte'],
    respuesta:
      'Mónica Muñoz es la instructora de MeSientoChill. Lleva más de 20 años cuidando la salud y el bienestar de las personas, y está formada en Pilates, Total Barre, Yoga, Mindfulness y gestión emocional.',
    enlaces: [{ texto: 'Conocer a Mónica', href: '/monica' }],
  },
  {
    id: 'registro',
    titulo: 'Crear una cuenta',
    claves: ['registro', 'registrarme', 'darme de alta', 'alta', 'crear cuenta', 'crear una cuenta', 'empezar', 'apuntarme'],
    respuesta: 'Crea tu cuenta en Empezar: eliges el plan, rellenas tus datos y te enviamos un email para confirmarla.',
    enlaces: [{ texto: 'Crear mi cuenta', href: '/registro' }],
    relacionados: ['precios', 'entrevista'],
  },
  {
    id: 'acceso',
    titulo: 'No puedo entrar',
    claves: ['contrasena', 'password', 'no puedo entrar', 'iniciar sesion', 'login', 'olvide', 'acceder', 'confirmar', 'email de confirmacion'],
    respuesta:
      'Para entrar, usa tu email y tu contraseña en Iniciar sesión. Si acabas de registrarte, antes tienes que confirmar la cuenta con el enlace que te enviamos por email (mira también en spam). Si has olvidado la contraseña, pide un enlace en Recuperar contraseña y crea una nueva.',
    enlaces: [
      { texto: 'Iniciar sesión', href: '/login' },
      { texto: 'Recuperar contraseña', href: '/recuperar' },
    ],
  },
  {
    id: 'persona',
    titulo: 'Hablar con una persona',
    claves: ['persona', 'humano', 'hablar con alguien', 'contacto', 'contactar', 'email', 'correo', 'whatsapp', 'telefono', 'llamar', 'queja', 'reclamacion', 'factura', 'cobro'],
    respuesta:
      'Escríbenos desde la página de Contacto y te responderá una persona por email lo antes posible. Para cobros, devoluciones o dudas de salud, es la mejor vía.',
    enlaces: [{ texto: 'Ir a Contacto', href: '/contacto' }],
  },
]

export const SUGERENCIAS = ['reservar', 'creditos', 'precios', 'eventos', 'persona']

const SALUDOS = ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'hey', 'que tal']
const GRACIAS = ['gracias', 'genial', 'perfecto', 'vale', 'ok', 'estupendo', 'mil gracias']

export const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[¿?¡!.,;:()"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const contiene = (texto: string, clave: string) =>
  clave.includes(' ') ? texto.includes(clave) : new RegExp(`(^| )${clave}( |$)`).test(texto)

export type Respuesta = { texto: string; enlaces: Enlace[]; sugerencias: string[] }

const FALLBACK =
  'No estoy seguro de haberte entendido. Prueba a preguntarlo con otras palabras o elige uno de estos temas. Si prefieres, escríbenos desde Contacto y te responde una persona.'

// temas: lista donde buscar (la landing añade los suyos delante para que tengan prioridad)
export function responder(pregunta: string, conSesion: boolean, temas: Tema[] = TEMAS, sugerencias: string[] = SUGERENCIAS): Respuesta {
  const t = normalizar(pregunta)
  const filtrar = (e: Enlace[] = []) => e.filter((x) => conSesion || !x.privado)

  let mejor: Tema | null = null
  let puntos = 0
  for (const tema of temas) {
    // Cada coincidencia suma; las frases de varias palabras pesan más.
    const p = tema.claves.reduce((acc, c) => (contiene(t, c) ? acc + c.split(' ').length + 1 : acc), 0)
    if (p > puntos) {
      puntos = p
      mejor = tema
    }
  }

  if (mejor) {
    return {
      texto: mejor.respuesta,
      enlaces: filtrar(mejor.enlaces),
      sugerencias: mejor.relacionados ?? sugerencias.filter((id) => id !== mejor!.id).slice(0, 3),
    }
  }
  if (GRACIAS.some((g) => contiene(t, g))) {
    return { texto: '¡De nada! Si necesitas algo más, aquí estoy.', enlaces: [], sugerencias }
  }
  if (SALUDOS.some((g) => contiene(t, g))) {
    return { texto: '¡Hola! ¿En qué te ayudo? Puedes escribir tu pregunta o elegir un tema.', enlaces: [], sugerencias }
  }
  return { texto: FALLBACK, enlaces: [{ texto: 'Ir a Contacto', href: '/contacto' }], sugerencias }
}

export const temaPorId = (id: string, temas: Tema[] = TEMAS) => temas.find((t) => t.id === id)
