// Generado a partir del sistema de diseño (tokens.json, README y fichas de componentes). Contenido estático y de confianza.
export const intro = "<p>MeSientoChill son clases de Pilates, Total Barre y Mindfulness de <strong>20 minutos en directo</strong> con Mónica Muñoz, pensadas como una pausa en mitad de la jornada laboral. La marca es cálida, cercana y tranquila: fondos claros, verdes de calma, un coral amable y formas siempre redondeadas. Todo el sistema sale del código de la web (<code>app/globals.css</code>).</p>" as const

export const secciones = [
 {
  "titulo": "Contenido y tono",
  "html": "<ul><li>Escribe en <strong>español de España</strong> y trata a la persona de <strong>tú</strong> («Elige tu pausa», «Reserva tu primera clase»). Mónica habla en primera persona («Hola, soy Mónica Muñoz»).</li><li>Frases cortas y concretas, sin jerga de fitness ni promesas exageradas. Habla de energía, cabeza clara, cuerpo suelto y estrés que se queda en el cuerpo.</li><li>Usa las cifras reales del producto como contenido: <strong>20 minutos</strong>, <strong>máximo 10 personas por clase</strong>, <strong>8 créditos al mes</strong>, cancelar <strong>hasta 24 h antes</strong>, planes de <strong>39 €</strong> y <strong>49 €</strong>.</li><li>Une datos breves con punto medio: «Clases de 20 minutos · Máximo 10 personas por clase · Desde casa o la oficina».</li><li>Mayúscula solo al inicio de frase y en nombres propios (Pilates, Total Barre, Mindfulness, Mónica, Chillsi). Las mayúsculas completas solo en <code>eyebrow</code>.</li><li>Botones con verbo y resultado: «Reservar clase», «Empezar con vídeos», «Ver todos los detalles de los planes».</li><li>Sin emojis.</li></ul>\n<p>Ejemplos reales: «20 minutos para cambiar tu energía» · «Trabajas mucho, te paras poco y el estrés se queda en el cuerpo» · «Con el cuerpo más suelto y la mente más clara» · «Tu pausa de 20 minutos te está esperando».</p>"
 },
 {
  "titulo": "Color",
  "html": "<ul><li>Página sobre <code>cream</code>. Alterna secciones con <code>white</code>, <code>tint</code> y <code>blush</code> (clases <code>.sec.white</code>, <code>.sec.tint</code>, <code>.sec.blush</code>) y usa <code>teal</code> de fondo (<code>.sec.dark</code>) para una sola sección de llamada por página.</li><li>Texto en <code>ink</code>; texto secundario en <code>muted</code>. Nunca texto gris neutro: los grises de la marca tiran a verde.</li><li><code>teal</code> es el color de acción (botones, enlaces). <code>mint</code> es el acento de marca: puntos de lista, barra de progreso, subrayado del menú activo y palabras destacadas en titulares grandes (solo a 24px o más).</li><li><code>coral</code> es el segundo color de marca: círculos numerados, avatar, el acceso de Mónica y el anillo de foco. Sobre <code>coral</code> siempre texto <code>ink</code>, nunca blanco.</li><li>Bordes de 1px en <code>line</code>; en tarjetas de color, el borde de su familia (<code>line2</code> en tint, <code>blush-line</code> en blush, <code>line-sand</code> en sand).</li><li>Estados: libre <code>tint</code>, reservado <code>teal</code> con texto blanco, completo <code>slot-full</code>, lista de espera <code>warn</code>; error <code>blush</code> + <code>error-fg</code>; ok <code>tint</code> + <code>teal</code>.</li><li>La marca solo tiene tema claro.</li></ul>"
 },
 {
  "titulo": "Tipografía",
  "html": "<ul><li>Una sola familia, <code>--font-sans</code>: <strong>Montserrat</strong> (Google Fonts, pesos 400, 500, 600, 700 y 800), con <code>sans-serif</code> de respaldo. Cárgala con <code>https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&amp;display=swap</code>.</li><li>Titulares en peso 600 con tracking negativo: <code>t1</code> (uno por página, hero), <code>t2</code> (secciones), <code>t3</code> (tarjetas). <code>t4</code> y <code>faq-pregunta</code> en 800 para títulos pequeños y fuertes.</li><li>Texto base <code>body</code> a 18px con interlineado 1,65; entradillas en <code>lead</code> color <code>muted</code>.</li><li><code>eyebrow</code> en mayúsculas, 13px, tracking 0,08em, color <code>teal</code>, encima de un titular.</li><li>Cifras grandes (<code>stat</code>, <code>hora</code>) en 800.</li></ul>"
 },
 {
  "titulo": "Forma, espacio y sombras",
  "html": "<ul><li>Todo es redondeado: botones, chips y pastillas en <code>radius-pill</code>; tarjetas e imágenes en <code>radius-card</code> (28px); campos en <code>radius-input</code> (14px). Sin esquinas rectas salvo filetes.</li><li>Contenido a <code>content-max</code> (1200px) centrado. Secciones con <code>space-88</code> arriba y abajo (<code>space-64</code> en tableta, <code>space-48</code> en móvil) y <code>space-40</code> a los lados.</li><li>Huecos con la escala <code>space-8</code> … <code>space-48</code> (clases <code>.g8</code> … <code>.g48</code>); rejillas con <code>space-24</code>.</li><li>Tarjetas planas con borde; sombra solo en lo que flota: cabecera en píldora (<code>shadow-header</code>), menú desplegable (<code>shadow-menu</code>), botón de ayuda (<code>shadow-fab</code>), chat flotante (<code>shadow-chat</code>) y hover de botón (<code>shadow-hover</code>). Todas las sombras usan el <code>ink</code> translúcido.</li><li>El pie es un bloque <code>ink</code> con esquinas superiores de <code>radius-footer</code>; el color de la última sección llega por detrás de esas esquinas.</li></ul>"
 },
 {
  "titulo": "Movimiento e interacción",
  "html": "<ul><li>Transiciones de 0,18s ease en color, fondo, borde y sombra. Un botón en hover sube 1px y gana <code>shadow-hover</code>; b1 pasa a <code>ink</code>, b2/b3/b4 pasan a <code>teal</code>.</li><li>Foco visible: contorno de 3px en <code>coral</code> con 2–4px de separación. Sobre <code>cream</code> y <code>white</code> el coral solo da 2,0:1; donde importe la accesibilidad, ponlo sobre fondos oscuros o añade un segundo anillo <code>ink</code>.</li><li>La entrada del hero (círculo, símbolo, «20 minutos») usa una curva <code>cubic-bezier(.2,.8,.2,1)</code> de 0,5–0,65s. El subrayado del menú se desliza a la opción activa en 0,35s.</li><li>Respeta <code>prefers-reduced-motion</code>: sin transformaciones ni animaciones.</li><li>Áreas táctiles de al menos 44px (botones de 52px, <code>.btn.sm</code> de 44px).</li></ul>"
 },
 {
  "titulo": "Logotipo e imágenes",
  "html": "<ul><li><code>Logos/logo.svg</code> (símbolo + «MeSientoChill» en <code>mint</code> y <code>coral</code>) sobre fondos claros; <code>Logos/logo-blanco.svg</code> sobre <code>ink</code> y <code>teal</code>. Altura 52px en cabecera y pie, 44px en la zona privada.</li><li><code>Logos/simbolo.svg</code> es la cara sonriente: círculo <code>coral</code> y sonrisa <code>mint</code>. Úsalo solo, grande, en el hero y como favicon.</li><li>Fotos reales de Mónica y de los eventos, recortadas en <code>radius-card</code>, con fondo <code>tint</code> mientras cargan. Nada de bancos de imágenes.</li></ul>"
 },
 {
  "titulo": "Iconografía",
  "html": "<ul><li>Iconos de trazo en una rejilla de 24×24, trazo de 2px, extremos y uniones redondeados, sin relleno, a 22px en el menú lateral y en <code>currentColor</code>. Los archivos de <code>Iconos/</code> llevan el trazo en <code>ink</code> porque se ven con <code>&lt;img&gt;</code>.</li><li>Iconos de disciplina (Pilates, Total Barre, Mindfulness): rejilla de 96×96, trazo de 8px (6px en Mindfulness), en mint, coral e ink, a 72px encima del título de cada disciplina. Archivos en <code>/iconos/</code>.</li><li>El icono de reproducción es un círculo blanco al 92% con triángulo <code>teal</code>.</li><li>No hay librería de iconos ni emojis: añade los nuevos dibujados con las mismas reglas.</li></ul>"
 }
] as const

export const componentes = [
 {
  "id": "Boton",
  "nombre": "Botón",
  "grupo": "Acciones",
  "guia": "<p>Botón en píldora para todas las acciones; cuatro variantes (<code>b1</code>–<code>b4</code>) más tamaño pequeño, ancho completo y deshabilitado.</p>\n<p><strong>Clases:</strong> <code>.btn</code> + una variante. <code>b1</code> principal (<code>teal</code>, texto blanco), <code>b2</code> secundario con borde <code>teal</code> sobre fondo transparente, <code>b3</code> oscuro (<code>ink</code>) para secciones claras donde hace falta más peso, <code>b4</code> borde <code>teal</code> con fondo <code>white</code> para usar sobre fondos de color. Modificadores: <code>.sm</code> (44px de alto, 15px), <code>.full</code> (100% de ancho), <code>[disabled]</code> o <code>.off</code>.</p>\n<ul><li>Mínimo 52px de alto (44px en <code>.sm</code>), <code>radius-pill</code>, texto en estilo <code>boton</code>.</li><li>Una sola <code>b1</code> por bloque; acompáñala de <code>b2</code> para la alternativa.</li><li>Hover: sube 1px con <code>shadow-hover</code>; b1 pasa a <code>ink</code> y el resto a <code>teal</code> relleno. Foco: contorno 3px <code>coral</code>.</li><li>El texto dice qué pasa: «Reservar clase», no «Enviar».</li></ul>",
  "preview": "<div style=\"display:flex;flex-direction:column;gap:16px\">\n<div style=\"display:flex;flex-wrap:wrap;gap:12px;align-items:center\"><a class=\"btn b1\">Reservar clase</a><a class=\"btn b2\">Ver horarios</a><a class=\"btn b3\">Empezar con vídeos</a><a class=\"btn b4\">Ver planes</a></div>\n<div style=\"display:flex;flex-wrap:wrap;gap:12px;align-items:center\"><button class=\"btn b1 sm\">Unirme a la lista</button><button class=\"btn b2 sm\">Cancelar</button><button class=\"btn b1\" disabled>Clase completa</button></div></div>"
 },
 {
  "id": "Chip",
  "nombre": "Chip",
  "grupo": "Acciones",
  "guia": "<p>Etiqueta en píldora para disciplinas, filtros y estados.</p>\n<p><strong>Clases:</strong> <code>.chip</code> (fondo <code>white</code>, borde <code>line2</code>), <code>.on</code> (seleccionado, <code>teal</code> con texto blanco), <code>.tint</code>, <code>.coral</code> (destacado, texto <code>ink</code>), <code>.warn</code> (aviso: lista de espera). Como filtro, usa <code>&lt;button class=\"chip\"&gt;</code>: en hover pasa a <code>tint</code> con borde <code>teal</code>.</p>\n<ul><li>Texto en estilo <code>chip</code> (14px, 700). Puede llevar un <code>.dot</code> de 10px delante (<code>.m</code> mint, <code>.c</code> coral, <code>.i</code> ink) para codificar la disciplina.</li><li>No lo uses como botón de acción principal.</li></ul>",
  "preview": "<div style=\"display:flex;flex-wrap:wrap;gap:12px\"><button class=\"chip on\">Todas</button><button class=\"chip\"><span class=\"dot m\"></span>Pilates</button><button class=\"chip\"><span class=\"dot c\"></span>Total Barre</button><button class=\"chip\"><span class=\"dot i\"></span>Mindfulness</button><span class=\"chip tint\">20 min</span><span class=\"chip coral\">Nuevo</span><span class=\"chip warn\">Lista de espera</span></div>"
 },
 {
  "id": "Tarjeta",
  "nombre": "Tarjeta",
  "grupo": "Contenido",
  "guia": "<p>Contenedor de 28px de radio para planes, pasos, beneficios y bloques de contenido.</p>\n<p><strong>Clases:</strong> <code>.card</code> (<code>white</code>, borde <code>line</code>, padding <code>space-32</code>) y variantes de color <code>.tint</code>, <code>.blush</code>, <code>.sand</code>, cada una con el borde de su familia. <code>.sel</code> marca la opción elegida con borde de 3px <code>teal</code> (por ejemplo, el plan actual).</p>\n<ul><li>Dentro: <code>eyebrow</code> opcional, título <code>t3</code> o <code>t4</code>, texto <code>muted</code>, lista <code>.list</code> con puntos <code>mint</code> y botón al final.</li><li>Sin sombra: las tarjetas son planas. Pasos numerados con <code>.num</code> (círculo <code>coral</code> de 52px).</li><li>En móvil, padding 24px y radio 24px.</li></ul>",
  "preview": "<div style=\"display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px\">\n<div class=\"card stack g16\"><span class=\"eyebrow\">Solo vídeos</span><h3 class=\"t3\">39 € al mes</h3><ul class=\"list stack g8\"><li>Biblioteca de clases grabadas</li><li>Clases de 45 minutos por niveles</li></ul><a class=\"btn b2 sm\">Empezar con vídeos</a></div>\n<div class=\"card tint sel stack g16\"><span class=\"eyebrow\">Directo y vídeos</span><h3 class=\"t3\">49 € al mes</h3><ul class=\"list stack g8\"><li>Clases en directo de 20 minutos</li><li>8 créditos al mes para reservar</li><li>Máximo 10 personas por clase</li></ul><a class=\"btn b1 sm\">Elegir este plan</a></div></div>"
 },
 {
  "id": "Pasos",
  "nombre": "Pasos",
  "grupo": "Contenido",
  "guia": "<p>Paso numerado con círculo <code>coral</code> para explicar un proceso real («Elige tu hora», «Conéctate», «Vuelve al trabajo»).</p>\n<p><strong>Marcado:</strong> <code>.num</code> (52px, <code>coral</code>, cifra en 800) seguido de título <code>t4</code> y texto <code>muted</code>. Úsalo solo cuando el orden importa.</p>",
  "preview": "<div style=\"display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px\"><div class=\"stack g12\"><span class=\"num\">1</span><h4 class=\"t4\">Elige tu hora</h4><p class=\"small muted\">Entre la hora del café, la de la comida o después del trabajo.</p></div><div class=\"stack g12\"><span class=\"num\">2</span><h4 class=\"t4\">Conéctate</h4><p class=\"small muted\">20 minutos en directo desde casa o la oficina.</p></div><div class=\"stack g12\"><span class=\"num\">3</span><h4 class=\"t4\">Vuelve</h4><p class=\"small muted\">Con el cuerpo más suelto y la mente más clara.</p></div></div>"
 },
 {
  "id": "Faq",
  "nombre": "Preguntas frecuentes",
  "grupo": "Contenido",
  "guia": "<p>Preguntas frecuentes desplegables con filetes <code>rule</code> y un botón circular «+ / –» en <code>teal</code>.</p>\n<p><strong>Marcado:</strong> contenedor <code>.faq</code> con <code>&lt;details&gt;</code>; dentro <code>&lt;summary&gt;&lt;h3&gt;Pregunta&lt;/h3&gt;&lt;/summary&gt;</code> y <code>&lt;p&gt;</code> de respuesta en <code>muted</code>. Pregunta en estilo <code>faq-pregunta</code>.</p>\n<ul><li>Hover: la pregunta pasa a <code>teal</code> y el círculo a <code>ink</code>.</li><li>Las respuestas, cortas y con las cifras reales (24 h, 8 créditos, 10 personas).</li></ul>",
  "preview": "<div class=\"faq\"><details open><summary><h3>¿Necesito experiencia previa?</h3></summary><p>No. Mónica adapta cada ejercicio y te corrige en directo para evitar lesiones.</p></details><details><summary><h3>¿Puedo cancelar una clase?</h3></summary><p>Sí, hasta 24 h antes y recuperas el crédito.</p></details><details><summary><h3>¿Cuántas personas hay por clase?</h3></summary><p>Máximo 10.</p></details></div>"
 },
 {
  "id": "Campo",
  "nombre": "Campo",
  "grupo": "Formularios",
  "guia": "<p>Campo de formulario: etiqueta, entrada de 52px y opciones de radio o casilla.</p>\n<p><strong>Clases:</strong> <code>.field</code> agrupa <code>&lt;label&gt;</code> (estilo <code>etiqueta</code>) y <code>.in-t</code> (input o textarea) o <code>.in-s</code> (select): fondo <code>white</code>, borde 1,5px <code>input-border</code>, <code>radius-input</code>. Opciones con <code>.opts</code> (columna) o <code>.opts.row</code> y cada una <code>.opt</code> con el control en <code>accent-color: teal</code>.</p>\n<ul><li>Textarea de 120px, redimensionable en vertical.</li><li>Toda entrada lleva etiqueta visible; los errores van en un <code>Aviso</code> <code>.err</code> encima del formulario.</li></ul>",
  "preview": "<div class=\"stack g20\" style=\"max-width:420px\"><div class=\"field\"><label for=\"n\">Nombre</label><input class=\"in-t\" id=\"n\" value=\"Lucía\"></div><div class=\"field\"><label for=\"d\">Disciplina</label><select class=\"in-s\" id=\"d\"><option>Pilates</option><option>Total Barre</option><option>Mindfulness</option></select></div><fieldset class=\"opts row\"><legend class=\"etiqueta\" style=\"margin-bottom:6px\">Horario preferido</legend><label class=\"opt\"><input type=\"radio\" name=\"h\" checked>Hora del café</label><label class=\"opt\"><input type=\"radio\" name=\"h\">Comida</label><label class=\"opt\"><input type=\"radio\" name=\"h\">Después del trabajo</label></fieldset></div>"
 },
 {
  "id": "Aviso",
  "nombre": "Aviso",
  "grupo": "Formularios",
  "guia": "<p>Mensaje de resultado tras una acción: <code>.alert.ok</code> (<code>tint</code>, texto <code>teal</code>) o <code>.alert.err</code> (<code>blush</code>, texto <code>error-fg</code>).</p>\n<ul><li><code>radius-alert</code>, texto 15px en 600.</li><li>El error dice qué pasó y qué hacer: «Esa clase ya está completa. Únete a la lista de espera o elige otra hora.»</li></ul>",
  "preview": "<div class=\"stack g12\"><div class=\"alert ok\">Clase reservada. Te hemos enviado el enlace de Zoom por email.</div><div class=\"alert err\">Ya tienes una clase reservada ese día. Puedes reservar una clase al día.</div></div>"
 },
 {
  "id": "Cabecera",
  "nombre": "Cabecera",
  "grupo": "Navegación",
  "guia": "<p>Cabecera pública: logotipo a la izquierda y menú a la derecha; al hacer scroll se convierte en una píldora flotante blanca.</p>\n<p><strong>Clases:</strong> <code>.hd</code> &gt; <code>.hd-in</code> con <code>.logo</code> (img de 52px) y <code>.nav</code>. La opción activa lleva <code>.on</code> y un subrayado de 2px <code>mint</code> que se desliza (<code>.nav-bar</code>). Al final, botón <code>.btn.b1.sm</code>.</p>\n<ul><li>Píldora: fondo blanco al 94%, borde <code>line-sand</code>, <code>shadow-header</code>, desenfoque de 10px.</li><li>Por debajo de 900px el menú se cambia por <code>.mnav</code> (botón «Menú» con borde <code>teal</code> y lista desplegable).</li></ul>",
  "preview": "<div class=\"hd\" style=\"position:static;padding:8px 0\"><div class=\"hd-in\" style=\"animation:none;padding:6px 22px;border-radius:999px;background:rgba(255,255,255,.94);border-color:var(--line-sand);box-shadow:var(--shadow-header)\"><a class=\"logo\"><img src=\"/logo.svg\" alt=\"MeSientoChill\" style=\"height:44px\"></a><nav class=\"nav\"><a class=\"on\" style=\"border-bottom-color:var(--mint)\">Clases</a><a>Método</a><a>Mónica</a><a>Precios</a><a>Eventos</a><a class=\"btn b1 sm\" style=\"color:#fff\">Empezar</a></nav></div></div>"
 },
 {
  "id": "MenuLateral",
  "nombre": "Menú lateral",
  "grupo": "Navegación",
  "guia": "<p>Menú lateral de la zona privada: 260px de ancho sobre <code>white</code>, enlaces con icono de 22px.</p>\n<p><strong>Clases:</strong> <code>.side</code> &gt; <code>nav</code> &gt; <code>a</code> (48px de alto, <code>radius-input</code>). Activo: <code>.on</code> (<code>tint</code>, texto <code>teal</code>). Hover: <code>sand</code>. <code>.sep</code> es un antetítulo de grupo en <code>subtle</code>; <code>.soon</code> atenúa lo que aún no está. <code>.admin</code> (solo Mónica) destaca en <code>coral</code>.</p>\n<ul><li>Por debajo de 900px se convierte en una fila con scroll horizontal y sin separadores.</li></ul>",
  "preview": "<div class=\"side\" style=\"width:280px;border:1px solid var(--line);border-radius:20px\"><nav><a class=\"admin\">Gestionar clases</a><a><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 11.5 12 4l9 7.5\"></path><path d=\"M5 10v10h14V10\"></path></svg>Inicio</a><a class=\"on\"><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"3\" y=\"5\" width=\"18\" height=\"16\" rx=\"3\"></rect><path d=\"M3 10h18M8 3v4M16 3v4\"></path></svg>Clases en directo</a><a><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 9a2 2 0 0 0 0 6v3h18v-3a2 2 0 0 1 0-6V6H3z\"></path><path d=\"M13 6v12\" stroke-dasharray=\"2 3\"></path></svg>Mis reservas y créditos</a><a><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"m10 8.5 5 3.5-5 3.5z\"></path></svg>Biblioteca de vídeos</a><span class=\"sep\">Tu cuenta</span><a><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"8\" r=\"4\"></circle><path d=\"M4 21c1-4 4-6 8-6s7 2 8 6\"></path></svg>Mi perfil y cuestionario</a><a><svg width=\"22\" height=\"22\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"></circle><path d=\"M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.7M12 17h.01\"></path></svg>Ayuda</a></nav></div>"
 },
 {
  "id": "Calendario",
  "nombre": "Calendario",
  "grupo": "Zona privada",
  "guia": "<p>Calendario semanal de clases en directo: cinco columnas de días con huecos reservables.</p>\n<p><strong>Clases:</strong> <code>.cal</code> &gt; <code>.day</code> (<code>white</code>, borde <code>line</code>, <code>radius-panel</code>) con <code>h4</code> del día y botones <code>.slot</code>. Estados del hueco: por defecto libre (<code>tint</code>), <code>.mine</code> reservado (<code>teal</code>, texto blanco), <code>.full</code> completo (<code>slot-full</code>), <code>.wait</code> en lista de espera (<code>warn</code>). Dentro, hora y disciplina, y un <code>&lt;small&gt;</code> con plazas.</p>\n<ul><li>El estado se dice también con palabras («Completa · 10 de 10»), no solo con color.</li><li>En tableta y móvil las columnas pasan a rejilla de 200px mínimo.</li></ul>",
  "preview": "<div class=\"cal\"><div class=\"day\"><h4>Lunes 17</h4><button class=\"slot \">13:30 · Pilates<small>4 plazas</small></button><button class=\"slot mine\">19:00 · Total Barre<small>Reservada</small></button></div><div class=\"day\"><h4>Martes 18</h4><button class=\"slot full\">10:30 · Mindfulness<small>Completa · 10 de 10</small></button></div><div class=\"day\"><h4>Miércoles 19</h4><button class=\"slot \">13:30 · Pilates<small>7 plazas</small></button><button class=\"slot wait\">19:00 · Pilates<small>En lista de espera</small></button></div><div class=\"day\"><h4>Jueves 20</h4><button class=\"slot \">10:30 · Total Barre<small>2 plazas</small></button></div><div class=\"day\"><h4>Viernes 21</h4><button class=\"slot \">13:30 · Mindfulness<small>9 plazas</small></button></div></div>"
 },
 {
  "id": "Creditos",
  "nombre": "Créditos",
  "grupo": "Zona privada",
  "guia": "<p>Resumen de créditos del mes: cifra grande, barra de progreso y la pastilla de la barra superior.</p>\n<p><strong>Clases:</strong> <code>.stat</code> con <code>&lt;b&gt;</code> en estilo <code>stat</code> y una línea <code>muted</code>; <code>.bar</code> (10px, carril <code>track</code>) con <code>&lt;i&gt;</code> relleno en <code>mint</code> al porcentaje; <code>.cred</code> es la pastilla <code>tint</code> de la cabecera de la app (se oculta en móvil). El avatar <code>.avatar</code> es un círculo <code>coral</code> de 44px con iniciales en <code>ink</code>.</p>\n<ul><li>Recuerda las reglas: 8 créditos al mes que caducan a fin de mes.</li></ul>",
  "preview": "<div class=\"stack g24\" style=\"max-width:460px\"><div style=\"display:flex;gap:12px;align-items:center\"><span class=\"cred\"><span class=\"dot m\"></span>6 créditos</span><span class=\"avatar\">LM</span></div><div class=\"card stack g12\"><div class=\"stat\"><b>6</b><span class=\"small muted\">de 8 créditos disponibles este mes</span></div><div class=\"bar\"><i style=\"width:75%\"></i></div><span class=\"xs muted\">Caducan el 30 de noviembre.</span></div></div>"
 },
 {
  "id": "TarjetaVideo",
  "nombre": "Tarjeta de vídeo",
  "grupo": "Zona privada",
  "guia": "<p>Tarjeta de un vídeo de la biblioteca: miniatura 16:10 con icono de reproducción y datos debajo.</p>\n<p><strong>Clases:</strong> <code>.vid</code> (<code>white</code>, <code>radius-video</code>) &gt; <code>.th</code> (miniatura; fondo <code>tint</code>, <code>.c</code> blush o <code>.s</code> sand según disciplina) con el icono de reproducción centrado (círculo blanco al 92%, triángulo <code>teal</code>) y <code>.bd</code> con chips, título <code>t4</code> y minutos/nivel en <code>muted</code>.</p>\n<ul><li>Un vídeo sin enlace se muestra como «Próximamente».</li></ul>",
  "preview": "<div style=\"display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px\"><div class=\"vid\"><div class=\"th \"><svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\" aria-hidden=\"true\"><circle cx=\"26\" cy=\"26\" r=\"26\" fill=\"#fff\" fill-opacity=\".92\"/><path d=\"m21 17 15 9-15 9z\" fill=\"#006B5E\"/></svg><span class=\"chip\">Pilates</span></div><div class=\"bd\"><h4 class=\"t4\">Core y espalda</h4><span class=\"small muted\">45 min · Nivel inicial</span></div></div><div class=\"vid\"><div class=\"th c\"><svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\" aria-hidden=\"true\"><circle cx=\"26\" cy=\"26\" r=\"26\" fill=\"#fff\" fill-opacity=\".92\"/><path d=\"m21 17 15 9-15 9z\" fill=\"#006B5E\"/></svg><span class=\"chip\">Total Barre</span></div><div class=\"bd\"><h4 class=\"t4\">Piernas y glúteos</h4><span class=\"small muted\">45 min · Nivel inicial</span></div></div><div class=\"vid\"><div class=\"th s\"><svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\" aria-hidden=\"true\"><circle cx=\"26\" cy=\"26\" r=\"26\" fill=\"#fff\" fill-opacity=\".92\"/><path d=\"m21 17 15 9-15 9z\" fill=\"#006B5E\"/></svg><span class=\"chip\">Mindfulness</span></div><div class=\"bd\"><h4 class=\"t4\">Respiración para el estrés</h4><span class=\"small muted\">45 min · Nivel inicial</span></div></div></div>"
 },
 {
  "id": "Chat",
  "nombre": "Chat",
  "grupo": "Zona privada",
  "guia": "<p>Chillsi, el asistente de ayuda: ventana con cabecera <code>teal</code> y burbujas.</p>\n<p><strong>Clases:</strong> <code>.chat</code> (<code>white</code>, <code>radius-card</code>) &gt; <code>.chat-h</code> (cabecera) &gt; <code>.chat-b</code> (fondo <code>chat-bg</code>) con <code>.msg.bot</code> (blanca, borde <code>line</code>, esquina inferior izquierda de 6px) y <code>.msg.me</code> (<code>teal</code>, texto blanco, esquina inferior derecha de 6px) &gt; <code>.chat-f</code> con campo y botón.</p>\n<ul><li>En la landing flota sobre el botón de ayuda con <code>shadow-chat</code>.</li></ul>",
  "preview": "<div class=\"chat\" style=\"max-width:440px\"><div class=\"chat-h\"><img src=\"/simbolo.svg\" alt=\"\" width=\"28\" height=\"28\" style=\"background:#fff;border-radius:50%\">Chillsi</div><div class=\"chat-b\"><div class=\"msg bot\">Hola, soy Chillsi. ¿En qué te ayudo?</div><div class=\"msg me\">¿Hasta cuándo puedo cancelar?</div><div class=\"msg bot\">Hasta 24 h antes de la clase. Así recuperas el crédito.</div></div><div class=\"chat-f\"><input class=\"in-t\" aria-label=\"Tu pregunta\" placeholder=\"Escribe tu pregunta\" style=\"height:44px\"><button class=\"btn b1 sm\">Enviar</button></div></div>"
 },
 {
  "id": "BotonAyuda",
  "nombre": "Botón de ayuda",
  "grupo": "Navegación",
  "guia": "<p>Botón flotante de Ayuda, fijo abajo a la derecha: círculo <code>teal</code> de 58px con borde blanco y etiqueta «Ayuda».</p>\n<p><strong>Clases:</strong> <code>.fab</code> &gt; <code>.fab-ic</code> + <code>.fab-lb</code>. Sombra <code>shadow-fab</code>; hover a <code>mint</code>. 50px en móvil. Abre el chat de Chillsi.</p>",
  "preview": "<div style=\"display:flex;justify-content:flex-end;padding:8px 24px\"><a class=\"fab\" style=\"position:static\"><span class=\"fab-ic\"></span><span class=\"fab-lb\">Ayuda</span></a></div>"
 },
 {
  "id": "Pie",
  "nombre": "Pie",
  "grupo": "Navegación",
  "guia": "<p>Pie de página: bloque <code>ink</code> con esquinas superiores de <code>radius-footer</code>, logotipo blanco y enlaces.</p>\n<p><strong>Clases:</strong> <code>.ft</code> &gt; <code>.ft-in</code> con el logo blanco (52px) y <code>.ft-nav</code> (navegación principal y, debajo con filete blanco al 25%, la legal). Nota legal en <code>.ft-note</code>/<code>.ft-copy</code> (13px, <code>footer-note</code>).</p>\n<ul><li>Hover de enlaces: subrayado con 4px de separación; redes en <code>coral</code>.</li></ul>",
  "preview": "<div class=\"ft\" style=\"margin-top:0\"><div class=\"ft-in\"><a class=\"ft-logo\"><img src=\"/logo-blanco.svg\" alt=\"MeSientoChill\" style=\"height:44px\"></a><div class=\"ft-nav\"><nav aria-label=\"Principal\"><a class=\"ft-main\">Clases</a><a class=\"ft-main\">Precios</a><a class=\"ft-main\">Eventos</a><a class=\"ft-main\">Ayuda</a></nav><nav aria-label=\"Legal\"><a>Aviso legal</a><a>Privacidad</a><a>Cookies</a></nav></div></div><p class=\"ft-copy\">© 2026 MeSientoChill · Mónica Muñoz</p></div>"
 }
] as const

export const colores = [
 {
  "name": "ink",
  "value": "#0e2f2b",
  "usage": "Texto principal y titulares sobre cream, white, tint, blush y sand (13,8:1 sobre cream). Fondo del pie y del botón b3."
 },
 {
  "name": "teal",
  "value": "#006b5e",
  "usage": "Color de acción: botón b1, bordes de b2/b4, enlaces, eyebrows, cabecera del chat, sección .sec.dark. Texto teal sobre cream 6,2:1 y sobre tint 5,8:1."
 },
 {
  "name": "mint",
  "value": "#00a28f",
  "usage": "Acento de marca: símbolo y logotipo, puntos de lista, barra de progreso, subrayado del menú activo y palabras destacadas en titulares. Como texto solo a 24px o más (3,1:1 sobre cream)."
 },
 {
  "name": "coral",
  "value": "#ff9782",
  "usage": "Segundo color de marca: círculo del símbolo, números de pasos (.num), avatar, chip.coral y el acceso «Gestionar clases». Anillo de foco de toda la web. Lleva texto ink encima (6,9:1), nunca blanco. Ojo: como anillo de foco sobre cream solo da 2,0:1."
 },
 {
  "name": "cream",
  "value": "#fff9f6",
  "usage": "Fondo de página (.mk). La superficie por defecto de la web y la landing."
 },
 {
  "name": "white",
  "value": "#ffffff",
  "usage": "Tarjetas, campos, menú lateral, cabecera de la zona privada y sección .sec.white."
 },
 {
  "name": "tint",
  "value": "#e6f6f3",
  "usage": "Fondo verde suave: .sec.tint, .card.tint, chip.tint, hueco de clase libre, opción activa del menú, pastilla de créditos y aviso ok."
 },
 {
  "name": "blush",
  "value": "#ffede8",
  "usage": "Fondo rosado: .sec.blush, .card.blush, miniatura de vídeo .c y aviso de error."
 },
 {
  "name": "sand",
  "value": "#f1eee9",
  "usage": "Fondo arena: .card.sand, miniatura de vídeo .s y hover del menú lateral."
 },
 {
  "name": "muted",
  "value": "#3b5753",
  "usage": "Texto secundario: .lead, .muted, respuestas de FAQ, descripciones. 7,5:1 sobre cream, 7,0:1 sobre tint."
 },
 {
  "name": "soft",
  "value": "#2f4b47",
  "usage": "Texto secundario algo más oscuro (definido en la fuente; reservado para texto pequeño sobre fondos tintados)."
 },
 {
  "name": "line",
  "value": "#e8ddd7",
  "usage": "Borde de 1px de tarjetas, cabeceras, tablas, chat y separadores (.hr, .row-item)."
 },
 {
  "name": "line2",
  "value": "#bfdcd6",
  "usage": "Borde de .card.tint, chips y aviso ok; hover del menú principal."
 },
 {
  "name": "line-sand",
  "value": "#e3ded8",
  "usage": "Borde de .card.sand, de la píldora de la cabecera y de las tablas de datos (.dtb)."
 },
 {
  "name": "blush-line",
  "value": "#f0c9be",
  "usage": "Borde de .card.blush y del aviso de error."
 },
 {
  "name": "rule",
  "value": "#d9cfc9",
  "usage": "Filetes de las preguntas frecuentes (.faq)."
 },
 {
  "name": "input-border",
  "value": "#5e7b76",
  "usage": "Borde de 1,5px de campos de formulario (4,6:1 sobre white)."
 },
 {
  "name": "subtle",
  "value": "#5c6f6b",
  "usage": "Texto terciario: separadores del menú lateral y opciones «próximamente» (5,3:1 sobre white)."
 },
 {
  "name": "table-head",
  "value": "#4b625e",
  "usage": "Cabeceras de tabla en mayúsculas (6,6:1 sobre white)."
 },
 {
  "name": "warn",
  "value": "#fff3d6",
  "usage": "Fondo de chip.warn y del hueco en lista de espera (.slot.wait). Texto ink encima."
 },
 {
  "name": "warn-line",
  "value": "#ebcb7a",
  "usage": "Borde de chip.warn."
 },
 {
  "name": "error-fg",
  "value": "#8a3a26",
  "usage": "Texto del aviso de error sobre blush (6,8:1)."
 },
 {
  "name": "disabled-bg",
  "value": "#ede7e2",
  "usage": "Fondo de botón deshabilitado."
 },
 {
  "name": "disabled-fg",
  "value": "#5c5450",
  "usage": "Texto de botón deshabilitado sobre disabled-bg (6,0:1)."
 },
 {
  "name": "slot-full",
  "value": "#f4efeb",
  "usage": "Fondo de un hueco de clase completo."
 },
 {
  "name": "slot-full-fg",
  "value": "#4b4440",
  "usage": "Texto de un hueco completo sobre slot-full (8,4:1)."
 },
 {
  "name": "track",
  "value": "#e3efec",
  "usage": "Carril de la barra de créditos (.bar)."
 },
 {
  "name": "chat-bg",
  "value": "#fbf8f5",
  "usage": "Fondo del cuerpo del chat de Chillsi."
 },
 {
  "name": "footer-note",
  "value": "#d5e8e4",
  "usage": "Texto legal pequeño del pie sobre ink (11,3:1)."
 },
 {
  "name": "coral-hover",
  "value": "#ff7f66",
  "usage": "Hover de chip.coral y del acceso «Gestionar clases»."
 }
] as const

export const tipos = [
 {
  "name": "Titulares",
  "family": "sans",
  "styles": [
   {
    "name": "t1",
    "fontSize": "60px",
    "lineHeight": 1.08,
    "fontWeight": 600,
    "letterSpacing": "-0.02em",
    "sample": "20 minutos para cambiar tu energía",
    "usage": "Titular del hero, uno por página. Fluido: clamp(36px, 4.4vw, 60px); 34px en móvil."
   },
   {
    "name": "t2",
    "fontSize": "44px",
    "lineHeight": 1.15,
    "fontWeight": 600,
    "letterSpacing": "-0.01em",
    "sample": "Elige cómo quieres practicar",
    "usage": "Titular de sección. Fluido: clamp(28px, 3.4vw, 44px)."
   },
   {
    "name": "t3",
    "fontSize": "22px",
    "lineHeight": 1.3,
    "fontWeight": 600,
    "sample": "Clases en directo de 20 minutos",
    "usage": "Título de tarjeta o bloque."
   },
   {
    "name": "t4",
    "fontSize": "18px",
    "lineHeight": 1.3,
    "fontWeight": 800,
    "sample": "Después del trabajo",
    "usage": "Título pequeño y fuerte: nombre de plan, franja horaria."
   },
   {
    "name": "faq-pregunta",
    "fontSize": "19px",
    "lineHeight": 1.3,
    "fontWeight": 800,
    "sample": "¿Necesito experiencia previa?",
    "usage": "Pregunta de las FAQ."
   }
  ]
 },
 {
  "name": "Texto",
  "family": "sans",
  "styles": [
   {
    "name": "lead",
    "fontSize": "20px",
    "lineHeight": 1.65,
    "fontWeight": 400,
    "sample": "Una pausa en mitad del día para volver al trabajo con la cabeza clara.",
    "usage": "Entradilla bajo t1/t2, en color muted."
   },
   {
    "name": "body",
    "fontSize": "18px",
    "lineHeight": 1.65,
    "fontWeight": 400,
    "sample": "Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz.",
    "usage": "Texto corrido base de la web (.mk)."
   },
   {
    "name": "small",
    "fontSize": "15px",
    "lineHeight": 1.6,
    "fontWeight": 400,
    "sample": "Cancela cuando quieras desde tu cuenta.",
    "usage": "Notas, letra pequeña de precios, etiquetas de menú."
   },
   {
    "name": "xs",
    "fontSize": "13px",
    "lineHeight": 1.6,
    "fontWeight": 400,
    "sample": "Horarios y plazas de ejemplo.",
    "usage": "Avisos legales y texto del pie."
   }
  ]
 },
 {
  "name": "Interfaz",
  "family": "sans",
  "styles": [
   {
    "name": "eyebrow",
    "fontSize": "13px",
    "lineHeight": 1.3,
    "fontWeight": 700,
    "letterSpacing": "0.08em",
    "sample": "PILATES · TOTAL BARRE · MINDFULNESS",
    "usage": "Antetítulo en MAYÚSCULAS (text-transform: uppercase) y color teal."
   },
   {
    "name": "boton",
    "fontSize": "17px",
    "lineHeight": 1.2,
    "fontWeight": 700,
    "sample": "Reservar clase",
    "usage": "Texto de botón; 15px en .btn.sm."
   },
   {
    "name": "nav",
    "fontSize": "15px",
    "lineHeight": 1.65,
    "fontWeight": 600,
    "sample": "Clases · Método · Precios",
    "usage": "Menú principal y enlaces de navegación."
   },
   {
    "name": "etiqueta",
    "fontSize": "15px",
    "lineHeight": 1.3,
    "fontWeight": 700,
    "sample": "Correo electrónico",
    "usage": "Etiquetas de campo y legend."
   },
   {
    "name": "chip",
    "fontSize": "14px",
    "lineHeight": 1.3,
    "fontWeight": 700,
    "sample": "Total Barre",
    "usage": "Chips, pastilla de créditos, huecos de calendario."
   },
   {
    "name": "stat",
    "fontSize": "40px",
    "lineHeight": 1,
    "fontWeight": 800,
    "sample": "6",
    "usage": "Cifra grande de créditos disponibles; 34px en móvil."
   },
   {
    "name": "hora",
    "fontSize": "22px",
    "lineHeight": 1.3,
    "fontWeight": 800,
    "sample": "13:30",
    "usage": "Hora de una clase en listados."
   }
  ]
 }
] as const

export const espacios = [
 {
  "name": "space-8",
  "value": "8px",
  "usage": "Hueco mínimo entre elementos (.g8)."
 },
 {
  "name": "space-12",
  "value": "12px",
  "usage": "Hueco en filas de chips, columnas del calendario (.g12)."
 },
 {
  "name": "space-16",
  "value": "16px",
  "usage": "Hueco estándar entre piezas de una tarjeta (.g16)."
 },
 {
  "name": "space-20",
  "value": "20px",
  "usage": "Hueco intermedio (.g20); margen lateral en móvil."
 },
 {
  "name": "space-24",
  "value": "24px",
  "usage": "Hueco de rejilla (.grid) y entre bloques (.g24); padding de tarjeta en móvil."
 },
 {
  "name": "space-32",
  "value": "32px",
  "usage": "Padding de .card; hueco entre bloques de página (.g32)."
 },
 {
  "name": "space-40",
  "value": "40px",
  "usage": "Margen lateral de secciones en escritorio y padding de .main."
 },
 {
  "name": "space-48",
  "value": "48px",
  "usage": "Hueco grande entre columnas (.g48); padding vertical de sección en móvil."
 },
 {
  "name": "space-64",
  "value": "64px",
  "usage": "Padding vertical de sección en tableta (≤900px)."
 },
 {
  "name": "space-88",
  "value": "88px",
  "usage": "Padding vertical de sección (.sec) en escritorio."
 },
 {
  "name": "content-max",
  "value": "1200px",
  "usage": "Ancho máximo del contenido (.in, cabecera, pie)."
 }
] as const

export const radios = [
 {
  "name": "radius-input",
  "value": "14px",
  "usage": "Campos de formulario, huecos de calendario y enlaces del menú lateral."
 },
 {
  "name": "radius-alert",
  "value": "16px",
  "usage": "Avisos (.alert)."
 },
 {
  "name": "radius-panel",
  "value": "20px",
  "usage": "Día del calendario, menú desplegable, tablas de datos y fotos de la galería."
 },
 {
  "name": "radius-video",
  "value": "24px",
  "usage": "Tarjeta de vídeo."
 },
 {
  "name": "radius-card",
  "value": "28px",
  "usage": "Tarjetas, imágenes y chat (24px en móvil)."
 },
 {
  "name": "radius-footer",
  "value": "40px",
  "usage": "Esquinas superiores del pie."
 },
 {
  "name": "radius-pill",
  "value": "999px",
  "usage": "Botones, chips, pastillas, barras y la cabecera flotante."
 }
] as const

export const sombras = [
 {
  "name": "shadow-header",
  "value": "0 10px 30px rgba(14,47,43,0.16)",
  "usage": "Cabecera convertida en píldora al hacer scroll."
 },
 {
  "name": "shadow-menu",
  "value": "0 8px 24px rgba(14,47,43,0.12)",
  "usage": "Menú desplegable móvil."
 },
 {
  "name": "shadow-hover",
  "value": "0 6px 16px rgba(14,47,43,0.18)",
  "usage": "Botón en hover (con translateY(-1px))."
 },
 {
  "name": "shadow-fab",
  "value": "0 6px 18px rgba(14,47,43,0.26)",
  "usage": "Botón flotante de Ayuda."
 },
 {
  "name": "shadow-chat",
  "value": "0 16px 40px rgba(14,47,43,0.25)",
  "usage": "Ventana flotante del chat de Chillsi."
 }
] as const
