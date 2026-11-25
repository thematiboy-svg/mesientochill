import type { Metadata } from 'next'
import './tokens.css'
import { SIDE_ITEMS, ADMIN_ITEM } from '../../components/side-items'
import { intro, secciones, componentes, colores, tipos, espacios, radios, sombras } from './data'
import { NORMAS, NORMAS_COLOR, EJEMPLOS_COLOR } from './normas'
import Fundamentos from './Fundamentos'

// Sistema de diseño de MeSientoChill: colores, tipografía, espacios y componentes reales de la web.
// El contenido sale de ./data.ts (generado a partir del sistema de diseño) y los componentes
// se pintan con los estilos de app/globals.css, los mismos que usa la web.

export const metadata: Metadata = {
  title: 'Sistema de diseño',
  description: 'Colores, tipografía, espacios, componentes, logotipos e iconos de MeSientoChill.',
  alternates: { canonical: '/design-system' },
  robots: { index: false, follow: true },
}

const NAV = [
  ['marca', 'Marca'],
  ['normas', 'Normas de uso'],
  ['fundamentos', 'Fundamentos'],
  ['color', 'Color'],
  ['tipografia', 'Tipografía'],
  ['espacio', 'Espacio y forma'],
  ['componentes', 'Componentes'],
  ['logos', 'Logos e iconos'],
] as const

const DISCIPLINAS = [
  { id: 'pilates', nombre: 'Pilates', fondo: 'tint', idea: 'Fuerza, control y postura.', forma: 'Círculo mint con eje vertical coral: el centro y la columna.' },
  { id: 'total-barre', nombre: 'Total Barre', fondo: 'blush', idea: 'Tonificación sin impacto de forma dinámica.', forma: 'Barra ink, arco coral y cabeza coral: el cuerpo en la barra.' },
  { id: 'mindfulness', nombre: 'Mindfulness', fondo: 'sand', idea: 'Respiración y atención plena.', forma: 'Círculos concéntricos mint con punto coral: la respiración.' },
] as const

const px = (v: string | number) => (typeof v === 'number' ? `${v}px` : v)

export default function DesignSystemPage() {
  const grupos = Array.from(new Set(componentes.map((c) => c.grupo)))
  return (
    <>
      <header className="ds-top">
        <div className="in">
          <img src="/logo.svg" alt="MeSientoChill" width={233} height={48} />
          <nav className="ds-nav" aria-label="Secciones">
            {NAV.map(([id, label]) => (
              <a key={id} className="chip" href={`#${id}`}>{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section className="sec" id="marca">
          <div className="in stack g48">
            <div className="stack g16" style={{ maxWidth: 820 }}>
              <span className="eyebrow">Sistema de diseño</span>
              <h1 className="t1">MeSientoChill</h1>
              <div className="lead ds-prose" dangerouslySetInnerHTML={{ __html: intro }} />
              <div className="wrapr g12" style={{ marginTop: 8 }}>
                <a className="btn b1 sm" href="/design-system/tokens.json" download>Descargar tokens.json</a>
                <a className="btn b2 sm" href="#componentes">Ver componentes</a>
              </div>
            </div>
            <div className="grid c2" style={{ gap: 32 }}>
              {secciones.map((s) => (
                <article key={s.titulo} className="card stack g12">
                  <h2 className="t3">{s.titulo}</h2>
                  <div className="ds-prose small" dangerouslySetInnerHTML={{ __html: s.html }} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec blush" id="normas">
          <div className="in stack g48">
            <div className="stack g8" style={{ maxWidth: 820 }}>
              <span className="eyebrow">Normas de uso</span>
              <h2 className="t2">Qué sí y qué no</h2>
              <p className="lead">Reglas para que todo lo que se haga con la marca se vea igual. Los contrastes son los medidos con la paleta real.</p>
            </div>

            <div className="stack g16">
              <h3 className="t4">Combinaciones de color</h3>
              <div className="ds-ej">
                {EJEMPLOS_COLOR.map((e) => (
                  <div key={e.nota} className="card stack g12">
                    <div className="ds-ej-par">
                      <div>
                        <span className="ds-tag si">Sí</span>
                        <span className="ds-ej-m" style={{ color: e.bien.fg, background: e.bien.bg }}>{e.bien.txt}</span>
                      </div>
                      <div>
                        <span className="ds-tag no">No</span>
                        <span className="ds-ej-m" style={{ color: e.mal.fg, background: e.mal.bg }}>{e.mal.txt}</span>
                      </div>
                    </div>
                    <p className="small muted">{e.nota}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack g16">
              <h3 className="t4">Color por color</h3>
              <div className="ds-tabla">
                {Object.entries(NORMAS_COLOR).map(([token, n]) => {
                  const c = colores.find((x) => x.name === token)
                  return (
                    <div key={token}>
                      <div className="ds-tabla-c">
                        <i style={{ background: c?.value }} />
                        <b>{token}</b>
                      </div>
                      <ul className="ds-reglas si">{n.si.map((r) => <li key={r}>{r}</li>)}</ul>
                      <ul className="ds-reglas no">{n.no.map((r) => <li key={r}>{r}</li>)}</ul>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid c2" style={{ gap: 24 }}>
              {NORMAS.map((a) => (
                <article key={a.area} className="card stack g16">
                  <h3 className="t3">{a.area}</h3>
                  <div className="stack g8">
                    <span className="ds-tag si">Sí</span>
                    <ul className="ds-reglas si">{a.si.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                  <div className="stack g8">
                    <span className="ds-tag no">No</span>
                    <ul className="ds-reglas no">{a.no.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Fundamentos />

        <section className="sec white" id="color">
          <div className="in stack g32">
            <div className="stack g8">
              <span className="eyebrow">Color</span>
              <h2 className="t2">Paleta</h2>
              <p className="lead">Tema claro. Los nombres son los de las variables CSS (<code>var(--teal)</code>).</p>
            </div>
            <div className="ds-sw">
              {colores.map((c) => (
                <div key={c.name}>
                  <i style={{ background: c.value }} />
                  <div>
                    <b>{c.name}</b>
                    <span className="ds-hex">{c.value}</span>
                    <span className="muted">{c.usage}</span>
                    {NORMAS_COLOR[c.name] && (
                      <ul className="ds-no">
                        {NORMAS_COLOR[c.name].no.map((n) => (
                          <li key={n}>{n}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="tipografia">
          <div className="in stack g32">
            <div className="stack g8">
              <span className="eyebrow">Tipografía</span>
              <h2 className="t2">Montserrat</h2>
              <p className="lead">Una sola familia, de Google Fonts, en pesos 400, 500, 600, 700 y 800.</p>
            </div>
            {tipos.map((g) => (
              <div key={g.name} className="stack g8">
                <h3 className="t4">{g.name}</h3>
                <div className="ds-type">
                  {g.styles.map((s) => (
                    <div key={s.name}>
                      <div className="ds-meta">
                        <b>{s.name}</b>
                        {s.fontSize} · {s.lineHeight} · {s.fontWeight}
                        {'letterSpacing' in s ? ` · ${s.letterSpacing}` : ''}
                        <br />
                        {s.usage}
                      </div>
                      <div
                        className="ds-sample"
                        style={{
                          fontSize: s.fontSize,
                          lineHeight: s.lineHeight,
                          fontWeight: s.fontWeight,
                          letterSpacing: 'letterSpacing' in s ? s.letterSpacing : undefined,
                          textTransform: s.name === 'eyebrow' ? 'uppercase' : undefined,
                          color: s.name === 'eyebrow' ? 'var(--teal)' : s.name === 'lead' ? 'var(--muted)' : undefined,
                        }}
                      >
                        {s.sample}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="sec tint" id="espacio">
          <div className="in stack g48">
            <div className="stack g8">
              <span className="eyebrow">Espacio y forma</span>
              <h2 className="t2">Espacios, radios y sombras</h2>
            </div>
            <div className="stack g16">
              <h3 className="t4">Espacios</h3>
              <div className="ds-bars">
                {espacios.map((e) => (
                  <div key={e.name}>
                    <b>{e.name}</b>
                    <span className="ds-hex">{e.value}</span>
                    <span className="stack g4" style={{ gap: 4, minWidth: 0 }}>
                      {e.name !== 'content-max' && <i style={{ width: px(e.value) }} />}
                      <span className="xs muted">{e.usage}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack g16">
              <h3 className="t4">Radios</h3>
              <div className="ds-shapes">
                {radios.map((r) => (
                  <div key={r.name}>
                    <i style={{ borderRadius: r.value }} />
                    <span><b>{r.name}</b> · {r.value}</span>
                    <span className="xs muted">{r.usage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack g16">
              <h3 className="t4">Sombras</h3>
              <div className="ds-shapes ds-shadow">
                {sombras.map((s) => (
                  <div key={s.name}>
                    <i style={{ boxShadow: s.value, borderRadius: 20 }} />
                    <span><b>{s.name}</b></span>
                    <span className="xs muted">{s.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="sec white" id="componentes">
          <div className="in stack">
            <div className="stack g8" style={{ paddingBottom: 24 }}>
              <span className="eyebrow">Componentes</span>
              <h2 className="t2">Piezas de la web</h2>
              <p className="lead">Cada ejemplo usa las mismas clases y estilos que la web.</p>
            </div>
            {grupos.map((g) =>
              componentes
                .filter((c) => c.grupo === g)
                .map((c) => (
                  <article key={c.id} className="ds-comp" id={`c-${c.id}`}>
                    <div className="ds-comp-h">
                      <h3 className="t3">{c.nombre}</h3>
                      <span className="chip tint">{c.grupo}</span>
                    </div>
                    <div className="ds-cols">
                      <div className="ds-guide" dangerouslySetInnerHTML={{ __html: c.guia }} />
                      <div className="ds-prev">
                        <div dangerouslySetInnerHTML={{ __html: c.preview }} />
                      </div>
                    </div>
                  </article>
                )),
            )}
          </div>
        </section>

        <section className="sec" id="logos">
          <div className="in stack g48">
            <div className="stack g8">
              <span className="eyebrow">Logos e iconos</span>
              <h2 className="t2">Logotipo</h2>
            </div>
            <div className="ds-logos">
              <div style={{ background: 'var(--white)' }}>
                <img src="/logo.svg" alt="Logotipo de MeSientoChill" width={621} height={128} />
                <span className="small muted">logo.svg · sobre fondos claros</span>
              </div>
              <div style={{ background: 'var(--ink)', borderColor: 'var(--ink)' }}>
                <img src="/logo-blanco.svg" alt="Logotipo de MeSientoChill en blanco" width={621} height={128} />
                <span className="small" style={{ color: 'var(--footer-note)' }}>logo-blanco.svg · sobre ink y teal</span>
              </div>
              <div style={{ background: 'var(--white)' }}>
                <img src="/simbolo.svg" alt="Símbolo de MeSientoChill" width={96} height={96} style={{ maxHeight: 96 }} />
                <span className="small muted">simbolo.svg · hero y favicon</span>
              </div>
            </div>
            <div className="stack g16" id="iconos-disciplina">
              <h3 className="t4">Iconos de disciplina</h3>
              <p className="small muted">Uno por disciplina, en una rejilla de 96×96 con trazo grueso (8px; 6px en Mindfulness) y los colores de marca: mint, coral e ink. Se usan a 72px sobre las tarjetas de disciplina, encima del título. No se recolorean ni se usan como icono de interfaz.</p>
              <div className="ds-disc">
                {DISCIPLINAS.map((d) => (
                  <div key={d.id} className={`card ${d.fondo} stack g12`}>
                    <img src={`/iconos/${d.id}.svg`} alt="" width={72} height={72} />
                    <h4 className="t3">{d.nombre}</h4>
                    <p className="small muted">{d.idea}</p>
                    <p className="ds-meta">{d.forma}</p>
                    <a className="small" href={`/iconos/${d.id}.svg`} download>Descargar {d.id}.svg</a>
                  </div>
                ))}
              </div>
            </div>
            <div className="stack g16">
              <h3 className="t4">Iconos</h3>
              <p className="small muted">Trazo de 2px en una rejilla de 24×24, puntas redondeadas, en currentColor.</p>
              <div className="ds-icons">
                {[...SIDE_ITEMS, ADMIN_ITEM].map((i) => (
                  <div key={i.href}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: i.svg }} />
                    <span style={{ textAlign: 'center', lineHeight: 1.35 }}>{i.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="ft">
        <div className="ft-in">
          <img src="/logo-blanco.svg" alt="MeSientoChill" width={233} height={48} />
          <span className="small" style={{ color: 'var(--footer-note)' }}>Sistema de diseño · MeSientoChill</span>
        </div>
      </footer>
    </>
  )
}
