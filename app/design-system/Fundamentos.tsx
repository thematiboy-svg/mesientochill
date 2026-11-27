import { PRIMITIVOS, SEMANTICOS, CONTRASTE } from './fundamentos-color'

// Fundamentos: la base sobre la que se construyen todos los componentes.
// Color en dos capas (primitivos → semánticos), escala tipográfica por rol y por pantalla,
// espaciado, rejilla, radios, bordes, elevación, movimiento, iconos y accesibilidad.

const TIPO = [
  { grupo: 'Display y titulares', items: [
    { t: 't1', rol: 'Display / H1', d: 60, tb: 40, m: 34, w: 600, lh: '1.08', ls: '-0.02em', color: 'fg-default', uso: 'Titular del hero. Uno por página. Fluido con clamp(36px, 4.4vw, 60px).', ej: 'Tu pausa de 20 minutos' },
    { t: 't2', rol: 'H2 · Sección', d: 44, tb: 31, m: 28, w: 600, lh: '1.15', ls: '-0.01em', color: 'fg-default', uso: 'Titular de cada sección. Fluido con clamp(28px, 3.4vw, 44px).', ej: 'Elige cómo quieres practicar' },
    { t: 't3', rol: 'H3 · Tarjeta', d: 22, tb: 22, m: 22, w: 600, lh: '1.3', ls: '0', color: 'fg-default', uso: 'Título de tarjeta o bloque.', ej: 'Clases en directo' },
    { t: 't4', rol: 'H4 · Énfasis', d: 18, tb: 18, m: 18, w: 800, lh: '1.3', ls: '0', color: 'fg-default', uso: 'Nombre de plan, franja horaria, pasos.', ej: 'Después del trabajo' },
    { t: 'faq', rol: 'Pregunta', d: 19, tb: 19, m: 19, w: 800, lh: '1.3', ls: '0', color: 'fg-default', uso: 'Pregunta de las FAQ.', ej: '¿Necesito experiencia previa?' },
  ]},
  { grupo: 'Texto', items: [
    { t: 'lead', rol: 'Entradilla', d: 20, tb: 20, m: 20, w: 400, lh: '1.65', ls: '0', color: 'fg-muted', uso: 'Bajo t1 o t2. Máximo 2–3 líneas.', ej: 'Una pausa en mitad del día.' },
    { t: 'body', rol: 'Cuerpo', d: 18, tb: 18, m: 18, w: 400, lh: '1.65', ls: '0', color: 'fg-default', uso: 'Texto corrido. Línea de 60–75 caracteres (máx. 760px).', ej: 'Pilates, Total Barre y Mindfulness.' },
    { t: 'small', rol: 'Pequeño', d: 15, tb: 15, m: 15, w: 400, lh: '1.6', ls: '0', color: 'fg-muted', uso: 'Notas, letra pequeña de precios.', ej: 'Cancela cuando quieras.' },
    { t: 'xs', rol: 'Legal', d: 13, tb: 13, m: 13, w: 400, lh: '1.6', ls: '0', color: 'fg-muted', uso: 'Avisos legales y pie. Nunca más pequeño.', ej: 'Horarios de ejemplo.' },
  ]},
  { grupo: 'Interfaz', items: [
    { t: 'eyebrow', rol: 'Antetítulo', d: 13, tb: 13, m: 13, w: 700, lh: '1.3', ls: '0.08em', color: 'fg-brand', uso: 'Siempre en MAYÚSCULAS, encima de t1/t2.', ej: 'PILATES · MINDFULNESS' },
    { t: 'boton', rol: 'Botón', d: 17, tb: 17, m: 17, w: 700, lh: '1.2', ls: '0', color: '—', uso: '15px en botón pequeño (.sm).', ej: 'Reservar clase' },
    { t: 'nav', rol: 'Navegación', d: 15, tb: 15, m: 15, w: 600, lh: '1.65', ls: '0', color: 'fg-default', uso: 'Menú principal y enlaces de navegación.', ej: 'Clases · Precios' },
    { t: 'etiqueta', rol: 'Etiqueta', d: 15, tb: 15, m: 15, w: 700, lh: '1.3', ls: '0', color: 'fg-default', uso: 'Label de campo y legend.', ej: 'Correo electrónico' },
    { t: 'chip', rol: 'Chip', d: 14, tb: 14, m: 14, w: 700, lh: '1.3', ls: '0', color: 'fg-default', uso: 'Chips, pastillas, huecos de calendario.', ej: 'Pilates' },
    { t: 'stat', rol: 'Cifra', d: 40, tb: 40, m: 34, w: 800, lh: '1', ls: '0', color: 'fg-default', uso: 'Créditos y precios destacados.', ej: '49 €' },
  ]},
] as const

const PESOS = [
  [400, 'Regular', 'Cuerpo, entradillas y texto legal.'],
  [500, 'Medium', 'Cargado pero sin uso: reservado.'],
  [600, 'SemiBold', 'Titulares t1–t3 y navegación.'],
  [700, 'Bold', 'Interfaz: botones, etiquetas, chips, eyebrow.'],
  [800, 'ExtraBold', 'Énfasis: t4, cifras, horas, números de pasos.'],
] as const

const ESPACIO = [
  ['space-4', 4, '½ unidad. Solo ajustes ópticos (iconos, badges).'],
  ['space-8', 8, 'Entre icono y texto; huecos mínimos (.g8).'],
  ['space-12', 12, 'Filas de chips, columnas del calendario (.g12).'],
  ['space-16', 16, 'Entre piezas de una tarjeta (.g16).'],
  ['space-20', 20, 'Hueco intermedio; margen lateral en móvil.'],
  ['space-24', 24, 'Gutter de rejilla; padding de tarjeta en móvil.'],
  ['space-32', 32, 'Padding de tarjeta; entre bloques (.g32).'],
  ['space-40', 40, 'Margen lateral de sección en escritorio.'],
  ['space-48', 48, 'Entre columnas; padding vertical en móvil.'],
  ['space-64', 64, 'Padding vertical de sección en tableta.'],
  ['space-88', 88, 'Padding vertical de sección en escritorio.'],
] as const

const PATRONES = [
  ['Sección', '88px / 40px', '64px / 24px', '48px / 20px'],
  ['Tarjeta (padding)', '32px', '32px', '24px'],
  ['Gutter de rejilla', '24px', '24px', '24px'],
  ['Titular → texto', '16px', '16px', '16px'],
  ['Bloque → bloque', '48px', '48px', '32px'],
] as const

const BREAKPOINTS = [
  ['Móvil', '≤ 560px', '1 columna', '20px', 't1 34px · tarjetas con radio 24px'],
  ['Móvil grande', '561–900px', '1 columna', '24px', 'Menú en desplegable · sección 64px'],
  ['Tableta / portátil', '901–1199px', '2–3 columnas', '40px', 'Menú completo · menú lateral fijo en la zona privada'],
  ['Escritorio', '≥ 1200px', '3–4 columnas', 'auto (centrado)', 'Contenido a 1200px máximo'],
] as const

const RADIOS = [
  ['radius-input', 14, 'Campos, huecos de calendario, menú lateral'],
  ['radius-alert', 16, 'Avisos'],
  ['radius-panel', 20, 'Paneles, tablas, menús, fotos de galería'],
  ['radius-video', 24, 'Tarjeta de vídeo; tarjeta en móvil'],
  ['radius-card', 28, 'Tarjetas, imágenes, chat'],
  ['radius-footer', 40, 'Esquinas superiores del pie'],
  ['radius-pill', 999, 'Botones, chips, pastillas, barras'],
] as const

const BORDES = [
  ['border-1', '1px', 'Por defecto: tarjetas, tablas, chips, separadores.'],
  ['border-1.5', '1,5px', 'Campos de formulario (border-input).'],
  ['border-2', '2px', 'Botones b2/b4 y plan destacado (border-strong).'],
  ['focus-3', '3px + 3px de separación', 'Anillo de foco coral en todo lo interactivo.'],
] as const

const ELEVACION = [
  ['0 · Plano', 'none', 'Tarjetas, secciones. La web es plana: se separa con color y borde.'],
  ['1 · Hover', '0 6px 16px rgba(14,47,43,.18)', 'Botón en hover (con subida de 1px).'],
  ['2 · Menú', '0 8px 24px rgba(14,47,43,.12)', 'Desplegables.'],
  ['3 · Flotante', '0 10px 30px rgba(14,47,43,.16)', 'Cabecera en píldora al hacer scroll.'],
  ['4 · Botón flotante', '0 6px 18px rgba(14,47,43,.26)', 'Botón de Ayuda.'],
  ['5 · Ventana', '0 16px 40px rgba(14,47,43,.25)', 'Chat de Chillsi.'],
] as const

const CAPAS = [
  ['Base', 'auto', 'Contenido de la página'],
  ['Desplegable', '5', 'Menú móvil'],
  ['Cabecera', '40', 'Cabecera fija (sticky)'],
  ['Flotante', '50', 'Botón de Ayuda y chat'],
  ['Modal', 'top layer', 'Lightbox de la galería (<dialog>)'],
] as const

const MOVIMIENTO = [
  ['duration-fast', '180ms', 'ease', 'Color, fondo, borde y sombra de botones, chips y enlaces.'],
  ['duration-fade', '200ms', 'ease', 'Aparición de capas (opacidad).'],
  ['duration-base', '300ms', 'ease', 'Desplazamientos (menú, flechas).'],
  ['duration-emphasis', '350ms', 'cubic-bezier(.2,.8,.2,1)', 'Indicador del menú activo. Entra rápido y frena suave.'],
] as const

const ICONOS = [
  ['16px', 'Dentro de chips y texto pequeño'],
  ['22px', 'Menú lateral y botones con icono'],
  ['24px', 'Tamaño base de la rejilla; acciones del lightbox'],
  ['26–28px', 'Avisos destacados y navegación del lightbox'],
  ['72px', 'Iconos de disciplina: rejilla 96, trazo 8px (6px en Mindfulness), colores de marca'],
] as const

const A11Y = [
  ['Contraste', 'Texto normal ≥ 4,5:1 y texto grande (≥ 24px, o ≥ 19px en negrita) ≥ 3:1. Toda la paleta de texto pasa AA; ink y muted llegan a AAA.'],
  ['Foco visible', 'Anillo coral de 3px en botones, chips, campos, casillas, FAQ y lightbox (3px de separación; 2px en campos, que además pasan a borde teal). Sobre cream da 2,0:1: acompáñalo siempre del cambio de color del propio control.'],
  ['Área táctil', 'Mínimo 44 × 44px. Botón 52px de alto, botón pequeño 44px, campos 52px.'],
  ['Movimiento', 'Con prefers-reduced-motion se quitan las transiciones y el botón deja de subir en hover.'],
  ['Texto', 'Nunca menos de 13px. Nunca blanco sobre coral (2,1:1). Mint como texto solo a 24px o más.'],
  ['Idioma', 'lang="es". Textos alternativos descriptivos en todas las fotos; iconos decorativos con aria-hidden.'],
] as const

const sw = (v: string) => ({ background: v })

export default function Fundamentos() {
  return (
    <section className="sec" id="fundamentos">
      <div className="in stack g48">
        <div className="stack g8" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Fundamentos</span>
          <h2 className="t2">La base de todo</h2>
          <p className="lead">Los valores con los que se construye cada pantalla. El color funciona en dos capas: <b>primitivos</b> (la paleta, con su nombre de color) y <b>semánticos</b> (para qué se usa cada color). En los componentes se usan siempre los semánticos.</p>
        </div>

        {/* COLOR */}
        <div className="stack g24" id="f-color">
          <h3 className="t3">1. Color · Arquitectura</h3>
          <div className="ds-flow">
            <div><b>Primitivos</b><span>teal, coral, cream…</span><small>Qué color es</small></div>
            <i aria-hidden="true">→</i>
            <div><b>Semánticos</b><span>bg-page, fg-muted, border-input…</span><small>Para qué sirve</small></div>
            <i aria-hidden="true">→</i>
            <div><b>Componentes</b><span>.btn.b1, .card, .alert…</span><small>Dónde se aplica</small></div>
          </div>
        </div>

        <div className="stack g32">
          <h3 className="t3">2. Color · Primitivos</h3>
          {PRIMITIVOS.map((g) => (
            <div key={g.grupo} className="stack g12">
              <div className="stack g8"><h4 className="t4">{g.grupo}</h4><p className="small muted">{g.nota}</p></div>
              <div className="ds-prim">
                {g.items.map((c) => (
                  <div key={g.grupo + c.token}>
                    <i style={sw(c.valor)} />
                    <div><b>{c.token}</b><span className="ds-hex">{c.valor}</span><span className="ds-rol">{c.rol}</span><span className="ds-meta">{c.uso}</span></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stack g32">
          <div className="stack g8"><h3 className="t3">3. Color · Semánticos</h3><p className="small muted">Nombre del rol → primitivo al que apunta. Disponibles como variables CSS (<code className="ds-code">var(--bg-page)</code>) y en tokens.json.</p></div>
          <div className="ds-sem-grid">
            {SEMANTICOS.map((g) => (
              <div key={g.grupo} className="ds-tabla ds-sem">
                <div className="ds-sem-h"><b>{g.grupo}</b><span className="ds-meta">{g.prefijo}-*</span></div>
                {g.items.map((i) => (
                  <div key={i.token}>
                    <span className="ds-tabla-c"><i style={sw(i.valor)} /><b className="ds-code">{i.token}</b></span>
                    <span className="ds-meta">→ {i.ref} · {i.valor}<br />{i.uso}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <div className="stack g8"><h3 className="t3">4. Color · Contraste</h3><p className="small muted">Medido con la fórmula WCAG 2.1. AAA ≥ 7:1 · AA ≥ 4,5:1 · AA grande ≥ 3:1 (solo texto ≥ 24px).</p></div>
          <div className="ds-contr">
            {CONTRASTE.map((c) => (
              <div key={c.fg + c.bg} style={{ background: c.bgv, color: c.fgv }}>
                <b>Aa</b>
                <span>{c.fg} / {c.bg}</span>
                <em className={c.nivel === 'No' ? 'no' : ''}>{c.ratio}:1 · {c.nivel}</em>
              </div>
            ))}
          </div>
        </div>

        {/* TIPOGRAFÍA */}
        <div className="stack g24" id="f-tipo">
          <h3 className="t3">5. Tipografía</h3>
          <div className="grid c2" style={{ gap: 24 }}>
            <div className="card tint stack g12">
              <span className="eyebrow">Familia única</span>
              <p style={{ fontSize: 'clamp(40px, 11vw, 64px)', fontWeight: 700, lineHeight: 1, overflowWrap: 'anywhere' }}>Montserrat</p>
              <p className="small muted">Google Fonts. Respaldo: sans-serif. Una sola familia para titulares, texto e interfaz: la jerarquía se hace con tamaño y peso, no con otra fuente.</p>
              <p style={{ fontSize: 22, letterSpacing: '.02em' }}>Aa Bb Cc Ññ 0123456789 € · ¿?¡!</p>
            </div>
            <div className="ds-tabla">
              {PESOS.map(([w, n, u]) => (
                <div key={w} style={{ gridTemplateColumns: '96px 140px minmax(0,1fr)' }}>
                  <span style={{ fontWeight: w, fontSize: 28, lineHeight: 1 }}>Aa</span>
                  <span><b>{n}</b><br /><span className="ds-meta">{w}</span></span>
                  <span className="ds-meta">{u}</span>
                </div>
              ))}
            </div>
          </div>
          {TIPO.map((g) => (
            <div key={g.grupo} className="stack g8">
              <h4 className="t4">{g.grupo}</h4>
              <div className="ds-tscale">
                <div className="ds-tscale-h"><span>Token · Rol</span><span>Muestra</span><span>Escritorio</span><span>Tableta</span><span>Móvil</span><span>Peso · Interl. · Tracking</span><span>Color</span></div>
                {g.items.map((s) => (
                  <div key={s.t}>
                    <span><b className="ds-code">{s.t}</b><br /><span className="ds-meta">{s.rol}</span></span>
                    <span className="ds-sample" style={{ fontSize: Math.min(s.d, 44), fontWeight: s.w, lineHeight: s.lh, letterSpacing: s.ls, textTransform: s.t === 'eyebrow' ? 'uppercase' : undefined }}>{s.ej}</span>
                    <span>{s.d}px</span><span>{s.tb}px</span><span>{s.m}px</span>
                    <span className="ds-meta">{s.w} · {s.lh} · {s.ls}</span>
                    <span className="ds-meta">{s.color}<br />{s.uso}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ESPACIADO */}
        <div className="stack g24" id="f-espacio">
          <div className="stack g8"><h3 className="t3">6. Espaciado</h3><p className="small muted">Base de 4px; casi todo es múltiplo de 8. Usa solo valores de la escala.</p></div>
          <div className="ds-tabla">
            {ESPACIO.map(([n, v, u]) => (
              <div key={n} style={{ gridTemplateColumns: '120px 64px 200px minmax(0,1fr)', alignItems: 'center' }}>
                <b className="ds-code">{n}</b><span>{v}px</span>
                <span><i className="ds-bar" style={{ width: Math.min(v * 2, 176) }} /></span>
                <span className="ds-meta">{u}</span>
              </div>
            ))}
          </div>
          <h4 className="t4">Patrones de espaciado</h4>
          <div className="ds-tabla">
            <div className="ds-th" style={{ gridTemplateColumns: 'minmax(0,1.4fr) repeat(3,minmax(0,1fr))' }}><span>Elemento</span><span>Escritorio</span><span>Tableta</span><span>Móvil</span></div>
            {PATRONES.map((r) => (
              <div key={r[0]} style={{ gridTemplateColumns: 'minmax(0,1.4fr) repeat(3,minmax(0,1fr))' }}>{r.map((c, i) => <span key={i} className={i ? 'ds-meta' : ''}>{i ? c : <b>{c}</b>}</span>)}</div>
            ))}
          </div>
        </div>

        {/* LAYOUT */}
        <div className="stack g24" id="f-layout">
          <div className="stack g8"><h3 className="t3">7. Rejilla y puntos de ruptura</h3><p className="small muted">Contenido centrado a 1200px. Rejillas fluidas con auto-fit: 3 columnas (mín. 260px), 2 columnas (mín. 340px) y 4 columnas (mín. 220px); gutter de 24px.</p></div>
          <div className="ds-tabla">
            <div className="ds-th" style={{ gridTemplateColumns: '160px 120px 120px 140px minmax(0,1fr)' }}><span>Pantalla</span><span>Ancho</span><span>Columnas</span><span>Margen</span><span>Cambios</span></div>
            {BREAKPOINTS.map((r) => (
              <div key={r[0]} style={{ gridTemplateColumns: '160px 120px 120px 140px minmax(0,1fr)' }}>{r.map((c, i) => <span key={i} className={i ? 'ds-meta' : ''}>{i ? c : <b>{c}</b>}</span>)}</div>
            ))}
          </div>
          <div className="ds-grid-demo" aria-hidden="true">{Array.from({ length: 12 }).map((_, i) => <i key={i} />)}</div>
          <p className="ds-meta">Rejilla de referencia de 12 columnas a 1200px (gutter 24px) para maquetar en Figma.</p>
        </div>

        {/* RADIOS Y BORDES */}
        <div className="grid c2" style={{ gap: 32 }} id="f-forma">
          <div className="stack g16">
            <h3 className="t3">8. Radios</h3>
            <div className="ds-radios">
              {RADIOS.map(([n, v, u]) => (
                <div key={n}><i style={{ borderRadius: Math.min(v, 48) }} /><b className="ds-code">{n}</b><span>{v}px</span><span className="ds-meta">{u}</span></div>
              ))}
            </div>
            <p className="ds-meta">Regla de anidado: radio interior = radio exterior − padding (tarjeta 28px con imagen a 0 de margen → la imagen hereda 28px).</p>
          </div>
          <div className="stack g16">
            <h3 className="t3">9. Bordes</h3>
            <div className="ds-tabla">
              {BORDES.map(([n, v, u]) => (
                <div key={n} style={{ gridTemplateColumns: '64px 120px minmax(0,1fr)', alignItems: 'center' }}>
                  <i className="ds-bw" style={n.startsWith('focus') ? { border: '1px solid var(--line)', outline: '3px solid var(--coral)', outlineOffset: 3 } : { borderWidth: n === 'border-1' ? 1 : n === 'border-1.5' ? 1.5 : 2, borderColor: n === 'border-1' ? 'var(--line)' : n === 'border-1.5' ? 'var(--input-border)' : 'var(--teal)' }} />
                  <span><b className="ds-code">{n}</b><br /><span className="ds-meta">{v}</span></span>
                  <span className="ds-meta">{u}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ELEVACIÓN */}
        <div className="stack g16" id="f-elevacion">
          <div className="stack g8"><h3 className="t3">10. Elevación y capas</h3><p className="small muted">Las sombras son siempre de color ink, nunca negras. Más altura = más difuminado.</p></div>
          <div className="ds-elev">
            {ELEVACION.map(([n, v, u]) => (
              <div key={n}><i style={{ boxShadow: v }} /><b>{n}</b><span className="ds-meta">{u}</span><span className="ds-hex" style={{ textTransform: 'none' }}>{v}</span></div>
            ))}
          </div>
          <div className="ds-tabla">
            <div className="ds-th" style={{ gridTemplateColumns: '160px 120px minmax(0,1fr)' }}><span>Capa</span><span>z-index</span><span>Uso</span></div>
            {CAPAS.map((r) => (
              <div key={r[0]} style={{ gridTemplateColumns: '160px 120px minmax(0,1fr)' }}><b>{r[0]}</b><span className="ds-code">{r[1]}</span><span className="ds-meta">{r[2]}</span></div>
            ))}
          </div>
        </div>

        {/* MOVIMIENTO E ICONOS */}
        <div className="grid c2" style={{ gap: 32 }}>
          <div className="stack g16" id="f-movimiento">
            <h3 className="t3">11. Movimiento</h3>
            <div className="ds-tabla">
              {MOVIMIENTO.map(([n, d, e, u]) => (
                <div key={n} style={{ gridTemplateColumns: '150px minmax(0,1fr)' }}>
                  <span><b className="ds-code">{n}</b><br /><span className="ds-meta">{d}</span></span>
                  <span className="ds-meta"><b style={{ color: 'var(--ink)' }}>{e}</b><br />{u}</span>
                </div>
              ))}
            </div>
            <p className="ds-meta">Interacción: el botón sube 1px y gana sombra en hover; al pulsar vuelve a 0. Sin animaciones decorativas en bucle.</p>
          </div>
          <div className="stack g16" id="f-iconos">
            <h3 className="t3">12. Iconografía</h3>
            <div className="card stack g12" style={{ padding: 24 }}>
              <p className="small">Rejilla 24 × 24 · trazo 2px · extremos y uniones redondeados · sin relleno · color <code className="ds-code">currentColor</code>.</p>
              <div className="wrapr g16 center" style={{ color: 'var(--teal)' }}>
                {[16, 22, 24, 28].map((s) => (
                  <svg key={s} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6z" /><path d="m9 12 2 2 4-4" /></svg>
                ))}
              </div>
            </div>
            <div className="ds-tabla">
              {ICONOS.map(([s, u]) => (
                <div key={s} style={{ gridTemplateColumns: '96px minmax(0,1fr)' }}><b>{s}</b><span className="ds-meta">{u}</span></div>
              ))}
            </div>
          </div>
        </div>

        {/* ACCESIBILIDAD */}
        <div className="stack g16" id="f-a11y">
          <h3 className="t3">13. Accesibilidad</h3>
          <div className="grid" style={{ gap: 16 }}>
            {A11Y.map(([t, d]) => (
              <div key={t} className="card stack g8" style={{ padding: 24 }}><h4 className="t4">{t}</h4><p className="small muted">{d}</p></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
