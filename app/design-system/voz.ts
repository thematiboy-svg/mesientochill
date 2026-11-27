// Voz y contenido: cómo habla MeSientoChill. Los ejemplos entre comillas son textos reales de la web.

export const RASGOS = [
  { rasgo: 'Cercana', es: 'Hablamos de tú, como Mónica en clase: con calidez y sin distancia.', noEs: 'Colega exagerada ni con confianzas («¡Hola, guapi!»).', ej: '«Hola, soy Mónica Muñoz»' },
  { rasgo: 'Calmada', es: 'Frases cortas y ritmo tranquilo. Somos la pausa del día.', noEs: 'Urgente ni agobiante («¡Última oportunidad!», «¡Corre!»).', ej: '«Una pausa en mitad del día para volver al trabajo con la cabeza clara.»' },
  { rasgo: 'Clara', es: 'Decimos qué pasa y qué tiene que hacer la persona.', noEs: 'Ambigua, técnica ni llena de rodeos.', ej: '«Puedes cancelar hasta 24 horas antes y no pierdes el crédito.»' },
  { rasgo: 'Honesta', es: 'Cifras reales y beneficios que se pueden cumplir.', noEs: 'Exagerada ni con promesas médicas.', ej: '«Clases de 20 minutos · Máximo 10 personas por clase»' },
] as const

export const TONOS = [
  { momento: 'Captar', donde: 'Hero, landing, redes', tono: 'Inspirador y concreto. Una idea por frase.', ej: '«20 minutos para cambiar tu energía»' },
  { momento: 'Explicar', donde: 'Método, precios, FAQ', tono: 'Directo y con cifras. Primero la respuesta, luego el detalle.', ej: '«Cada clase en directo gasta 1 crédito. Solo puedes reservar una clase al día.»' },
  { momento: 'Confirmar', donde: 'Reserva, pago, formulario enviado', tono: 'Breve y tranquilizador. Qué ha pasado y qué viene ahora.', ej: '«Clase reservada. Te hemos enviado el enlace de Zoom por email.»' },
  { momento: 'Avisar de un límite', donde: 'Créditos, cancelaciones, plazas', tono: 'Firme y amable. La norma y cómo no perder nada.', ej: '«Esta clase está completa. Apúntate a la lista de espera.»' },
  { momento: 'Error', donde: 'Formularios, inicio de sesión, enlaces', tono: 'Sin culpa. Qué ha fallado y cómo arreglarlo.', ej: '«El enlace ha caducado o se abrió en otro navegador. Pide uno nuevo.»' },
  { momento: 'Vacío', donde: 'Sin reservas, sin eventos', tono: 'Neutro y con un siguiente paso.', ej: '«Aún no hay eventos programados. Te avisamos por email cuando abramos el próximo.»' },
  { momento: 'Legal', donde: 'Privacidad, cookies, aviso legal', tono: 'Neutro y claro. Frases enteras, sin jerga jurídica innecesaria.', ej: '«Las cookies necesarias hacen posible que puedas iniciar sesión, reservar clases y pagar.»' },
] as const

export const VOCABULARIO: { decimos: string; noDecimos: string; nota?: string }[] = [
  { decimos: 'clase en directo', noDecimos: 'sesión online, live, streaming' },
  { decimos: 'vídeos, biblioteca de vídeos', noDecimos: 'contenido on demand, VOD' },
  { decimos: 'crédito', noDecimos: 'token, bono, punto', nota: '1 clase en directo = 1 crédito.' },
  { decimos: 'reservar, cancelar', noDecimos: 'bookear, anular' },
  { decimos: 'lista de espera', noDecimos: 'waitlist, cola' },
  { decimos: 'entrar al directo', noDecimos: 'unirse a la reunión, conectarse al Zoom' },
  { decimos: 'pausa', noDecimos: 'break, descanso activo' },
  { decimos: 'Mónica', noDecimos: 'la instructora, coach, profe', nota: 'Siempre por su nombre.' },
  { decimos: 'Solo vídeos · Directo y vídeos', noDecimos: 'plan básico, plan premium', nota: 'Nombres exactos de los planes.' },
  { decimos: 'Pilates · Total Barre · Mindfulness', noDecimos: 'pilates, total barre, mindfulness', nota: 'Con mayúscula: son nombres de disciplina.' },
  { decimos: 'Chillsi', noDecimos: 'el bot, el asistente virtual' },
  { decimos: 'tu cuenta, Mis reservas', noDecimos: 'panel, dashboard, área de usuario' },
]

export const FORMATO: { tema: string; regla: string; ej: string }[] = [
  { tema: 'Números', regla: 'Siempre en cifra, también del 1 al 9.', ej: '20 minutos · 8 créditos · 1 clase al día' },
  { tema: 'Horas', regla: 'Formato de 24 horas con dos puntos. Duraciones con «h» o «minutos».', ej: '13:30 · 19:00 · 24 h antes' },
  { tema: 'Fechas', regla: 'Día de la semana y mes en minúscula. Sin ceros delante.', ej: 'lunes 17 de noviembre' },
  { tema: 'Precios', regla: 'Cifra, espacio y €. «al mes» en texto; «€/mes» solo en espacios cortos.', ej: '39 € al mes · 49 €/mes' },
  { tema: 'Signos', regla: 'Abre siempre ¿ y ¡. Una sola exclamación, y pocas.', ej: '¿Necesito experiencia previa?' },
  { tema: 'Comillas', regla: 'Angulares para citar o nombrar textos de la interfaz.', ej: 'Pulsa «Reservar clase».' },
  { tema: 'Listas cortas', regla: 'Separa datos breves con punto medio (·).', ej: 'Desde casa · Desde la oficina' },
  { tema: 'Puntos finales', regla: 'Sin punto en títulos, botones, chips y etiquetas. Con punto en frases completas.', ej: 'Reservar clase · «Cancela cuando quieras.»' },
  { tema: 'Mayúsculas', regla: 'Solo al inicio y en nombres propios. Nunca palabras enteras para gritar.', ej: 'Mis reservas y créditos' },
  { tema: 'Longitud', regla: 'Frases de 20 palabras como mucho; párrafos de 3 líneas.', ej: '«Entra un par de minutos antes.»' },
  { tema: 'Personas', regla: 'Fórmulas que incluyen a todo el mundo, sin forzar el lenguaje.', ej: '«Se la queda quien la reserve primero.»' },
]

export const PATRONES_TEXTO: { pieza: string; regla: string; si: string[]; no: string[] }[] = [
  { pieza: 'Botones', regla: 'Verbo en infinitivo + lo que pasa. De 1 a 4 palabras.', si: ['Reservar clase', 'Apuntarme a la lista de espera', 'Entrar al directo'], no: ['Enviar', 'OK', 'Haz clic aquí'] },
  { pieza: 'Errores', regla: 'Qué ha fallado + cómo arreglarlo. Nunca códigos ni culpa.', si: ['Ya hay una cuenta con este email. Inicia sesión con tu contraseña o, si no la recuerdas, crea una nueva.', 'La contraseña debe tener al menos 8 caracteres.'], no: ['Datos incompletos', 'Error 409', 'Has introducido mal los datos'] },
  { pieza: 'Campos', regla: 'Etiqueta corta y visible; la instrucción de error dice qué escribir.', si: ['Correo electrónico → «Escribe tu email.»', 'Nombre → «Escribe tu nombre y tus apellidos.»'], no: ['Campo obligatorio', 'Valor no válido'] },
  { pieza: 'Confirmaciones', regla: 'Lo que ha pasado en pasado + lo siguiente.', si: ['Clase reservada. Te hemos enviado el enlace de Zoom por email.'], no: ['¡Éxito!', 'Operación realizada correctamente'] },
  { pieza: 'Estados vacíos', regla: 'Qué falta + el siguiente paso.', si: ['No tienes reservas próximas. Elige una clase en el calendario.'], no: ['No hay datos', 'Lista vacía'] },
  { pieza: 'Emails', regla: 'Asunto con la acción, saludo con el nombre, un solo botón.', si: ['Asunto: Tu clase del lunes a las 13:30 · Botón: Entrar al directo'], no: ['Asunto: Notificación', 'Varios botones con el mismo peso'] },
]

export const ANTES_DESPUES = [
  { antes: '¡¡Reserva YA tu plaza!! Últimas plazas disponibles', despues: 'Quedan 2 plazas para el lunes a las 13:30.', porque: 'Calmada y concreta: la cifra real convence más que la urgencia.' },
  { antes: 'Nuestro innovador método holístico revolucionará tu bienestar', despues: 'Pilates, Total Barre y Mindfulness en 20 minutos, en directo con Mónica.', porque: 'Honesta: lo que es, no adjetivos.' },
  { antes: 'Error: datos incompletos', despues: 'Escribe tu nombre y tus apellidos.', porque: 'Clara: dice qué hacer.' },
  { antes: 'Este ejercicio elimina el dolor de espalda', despues: 'Movimientos para soltar la espalda después de muchas horas sentada o sentado.', porque: 'Sin promesas médicas.' },
] as const

export const CHECKLIST = [
  '¿Habla de tú?',
  '¿Usa cifras reales (20 minutos, 10 personas, 8 créditos, 24 h)?',
  '¿Dice qué tiene que hacer la persona?',
  '¿Las frases tienen menos de 20 palabras?',
  '¿Usa las palabras de la tabla de vocabulario y los nombres exactos?',
  '¿Está libre de emojis, exclamaciones seguidas y mayúsculas para gritar?',
  '¿Evita promesas médicas y exageraciones?',
  '¿Se entiende si lo lees en voz alta?',
] as const
