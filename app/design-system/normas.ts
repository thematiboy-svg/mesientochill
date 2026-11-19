// Normas de uso del sistema de diseño: qué se puede hacer y qué no.
// Los contrastes citados están medidos con los colores reales de tokens.json (WCAG 2: 4,5:1 para texto, 3:1 para texto de 24px o más y para iconos y bordes).

export type Norma = { si: string[]; no: string[] }

// Normas por color: se muestran en la paleta y en «Normas de uso».
export const NORMAS_COLOR: Record<string, Norma> = {
  teal: {
    si: ['Botones principales, enlaces y elementos que se pueden pulsar.', 'Fondo de una sola sección de llamada por página (.sec.dark), con texto blanco.'],
    no: ['En bloques o formas decorativas que no se pueden pulsar: se confunden con botones. Los eyebrows sí van en teal.', 'Como fondo de más de una sección por página.', 'Con texto ink o muted encima: sobre teal el texto es siempre blanco.'],
  },
  mint: {
    si: ['Símbolo, puntos de lista, barra de créditos y subrayado del menú.', 'Palabras destacadas en titulares de 24px o más.'],
    no: ['Como texto de menos de 24px: sobre cream solo da 3,1:1.', 'En botones o enlaces: el color de acción es teal.', 'Como fondo de texto blanco pequeño (3,2:1).'],
  },
  coral: {
    si: ['Círculos numerados, avatar, chip destacado y el acceso de Mónica.', 'Fondo de elementos pequeños con texto ink encima (6,9:1).'],
    no: ['Como color de texto sobre cream o white: solo da 2,0:1 y no se lee.', 'Con texto blanco encima.', 'Para errores o avisos: coral es un color de marca, no de alerta. Los errores van en blush con texto error-fg.', 'En grandes superficies: es un acento, nunca el fondo de una sección.'],
  },
  ink: {
    si: ['Texto principal y titulares.', 'Fondo del pie y del botón b3.'],
    no: ['Como fondo de secciones de contenido: el único bloque ink es el pie.', 'Para texto sobre teal: ahí va blanco.'],
  },
  cream: {
    si: ['Fondo de página por defecto.'],
    no: ['Como fondo de tarjetas sobre una página cream: las tarjetas son white.', 'Como color de texto sobre colores claros.'],
  },
  white: {
    si: ['Tarjetas, campos, menú lateral y texto sobre teal e ink.'],
    no: ['Como texto sobre mint, coral, tint o blush.'],
  },
  tint: {
    si: ['Fondos suaves: secciones, tarjetas, huecos libres, opción activa y aviso de éxito.'],
    no: ['Como color de texto o de borde.', 'Para errores: tint significa «todo bien» o «disponible».'],
  },
  blush: {
    si: ['Secciones y tarjetas cálidas, y el fondo de los avisos de error.'],
    no: ['Como color de texto.', 'Para mensajes de éxito o confirmación.'],
  },
  sand: {
    si: ['Tarjetas neutras, miniaturas de vídeo y hover del menú lateral.'],
    no: ['Como fondo de sección completa ni como color de texto.'],
  },
  muted: {
    si: ['Texto secundario: entradillas, descripciones y respuestas.'],
    no: ['En titulares: los titulares van en ink.', 'Sobre teal o ink: ahí el texto es blanco.'],
  },
  warn: {
    si: ['Solo para el estado «en lista de espera» y avisos de espera.'],
    no: ['Como decoración o color de marca.'],
  },
  'error-fg': {
    si: ['Solo el texto de los avisos de error, sobre blush.'],
    no: ['Para titulares, precios destacados o cualquier cosa que no sea un error.'],
  },
  line: {
    si: ['Bordes de 1px y separadores.'],
    no: ['Como color de texto o de iconos: es demasiado claro para leerse.'],
  },
}

// Ejemplos visuales de combinaciones correctas e incorrectas.
export const EJEMPLOS_COLOR = [
  { bien: { fg: 'var(--ink)', bg: 'var(--coral)', txt: 'Texto ink sobre coral' }, mal: { fg: 'var(--coral)', bg: 'var(--cream)', txt: 'Texto coral sobre cream' }, nota: 'El coral como texto no se lee (2,0:1).' },
  { bien: { fg: 'var(--white)', bg: 'var(--teal)', txt: 'Blanco sobre teal' }, mal: { fg: 'var(--ink)', bg: 'var(--teal)', txt: 'Ink sobre teal' }, nota: 'Sobre teal el texto es siempre blanco.' },
  { bien: { fg: 'var(--teal)', bg: 'var(--cream)', txt: 'Enlace en teal' }, mal: { fg: 'var(--mint)', bg: 'var(--cream)', txt: 'Enlace en mint' }, nota: 'Mint pequeño no llega al contraste mínimo (3,1:1).' },
  { bien: { fg: 'var(--error-fg)', bg: 'var(--blush)', txt: 'Error en blush' }, mal: { fg: 'var(--ink)', bg: 'var(--coral)', txt: 'Error en coral' }, nota: 'El coral es de marca, no de alerta.' },
] as const

// Normas por área.
export const NORMAS: { area: string; si: string[]; no: string[] }[] = [
  {
    area: 'Color en general',
    si: ['Usa solo los colores de la paleta, por su nombre (var(--teal)).', 'Combina un fondo claro con texto ink o muted, y un fondo oscuro con texto blanco.', 'Di los estados también con palabras («Completa · 10 de 10»), no solo con color.'],
    no: ['Colores fuera de la paleta, grises neutros ni negro puro.', 'Degradados, transparencias de color o fondos con dibujos.', 'Más de tres colores de fondo distintos seguidos en una misma página.'],
  },
  {
    area: 'Tipografía',
    si: ['Montserrat en todo, con los estilos t1–t4, body, lead, small y xs.', 'Un solo t1 por página, en el hero.', 'Líneas de texto de unos 65 caracteres como mucho.'],
    no: ['Otras familias tipográficas, ni siquiera para títulos especiales.', 'Pesos por debajo de 400 ni cursivas en titulares.', 'Texto en MAYÚSCULAS, salvo el eyebrow.', 'Texto corrido por debajo de 15px; los 13px (xs) solo para notas legales.', 'Texto justificado o centrado en párrafos largos.'],
  },
  {
    area: 'Logotipo',
    si: ['logo.svg sobre fondos claros (cream, white, tint).', 'logo-blanco.svg sobre ink y teal.', 'Deja libre alrededor, como mínimo, la mitad de su altura.'],
    no: ['Cambiar sus colores, deformarlo, girarlo ni añadirle sombras o contornos.', 'logo.svg sobre teal, ink o fotos; logo-blanco.svg sobre fondos claros.', 'Usarlo por debajo de 44px de alto.', 'Separar el símbolo del nombre salvo en el hero, el favicon y el chat de Chillsi.', 'Redibujarlo o escribir «MeSientoChill» en otra tipografía como si fuera el logo.'],
  },
  {
    area: 'Componentes',
    si: ['Un solo botón b1 por bloque; la alternativa en b2.', 'Botones con verbo y resultado: «Reservar clase».', 'Áreas táctiles de al menos 44px y foco siempre visible.'],
    no: ['Botones genéricos («Enviar», «Haz clic aquí», «Más»).', 'Chips como botón de acción principal.', 'Sombras en tarjetas: la sombra es solo para lo que flota.', 'Esquinas rectas en botones, tarjetas o campos.', 'Quitar el contorno de foco (outline: none) sin poner otro.'],
  },
  {
    area: 'Textos',
    si: ['Español de España y trato de tú.', 'Cifras reales: 20 minutos, máximo 10 personas, 8 créditos, 24 h.'],
    no: ['Usted, jerga de fitness ni anglicismos innecesarios («workout», «coach»).', 'Prometer resultados médicos («cura», «elimina el dolor»).', 'Emojis o signos de exclamación seguidos.'],
  },
  {
    area: 'Imágenes e iconos',
    si: ['Fotos reales de Mónica, de las clases y de los eventos.', 'Iconos de trazo de 2px en una rejilla de 24×24, en currentColor.'],
    no: ['Fotos de bancos de imágenes o generadas por IA.', 'Iconos rellenos o de otras librerías mezclados con los de la marca.', 'Emojis en lugar de iconos.', 'Texto encima de fotos sin un fondo de color debajo.'],
  },
]
