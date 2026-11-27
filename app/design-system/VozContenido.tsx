import { RASGOS, TONOS, VOCABULARIO, FORMATO, PATRONES_TEXTO, ANTES_DESPUES, CHECKLIST } from './voz'

// Voz y contenido: rasgos de la voz, tono según el momento, vocabulario,
// gramática y formato, patrones de textos de interfaz, antes/después y lista de comprobación.

export default function VozContenido() {
  return (
    <section className="sec tint" id="voz">
      <div className="in stack g48">
        <div className="stack g8" style={{ maxWidth: 820 }}>
          <span className="eyebrow">Voz y contenido</span>
          <h2 className="t2">Cómo hablamos</h2>
          <p className="lead">Somos la pausa del día: hablamos como Mónica en clase, de tú, con calma y diciendo las cosas claras. Los ejemplos entre comillas son textos reales de la web.</p>
        </div>

        <div className="stack g16">
          <h3 className="t4">Nuestra voz</h3>
          <div className="ds-voz">
            {RASGOS.map((r) => (
              <article key={r.rasgo} className="card stack g12">
                <h4 className="t3">{r.rasgo}</h4>
                <ul className="ds-reglas si"><li>{r.es}</li></ul>
                <ul className="ds-reglas no"><li>{r.noEs}</li></ul>
                <p className="ds-cita">{r.ej}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <h3 className="t4">Tono según el momento</h3>
          <p className="small muted">La voz es siempre la misma; el tono cambia según lo que la persona está haciendo.</p>
          <div className="ds-tabla ds-tabla-voz">
            {TONOS.map((t) => (
              <div key={t.momento}>
                <div className="stack" style={{ gap: 2 }}>
                  <b>{t.momento}</b>
                  <span className="xs muted">{t.donde}</span>
                </div>
                <span>{t.tono}</span>
                <span className="ds-cita">{t.ej}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <h3 className="t4">Vocabulario</h3>
          <div className="ds-tabla ds-tabla-vocab">
            <div className="ds-tabla-h">
              <span className="ds-tag si">Decimos</span>
              <span className="ds-tag no">No decimos</span>
              <span className="xs muted">Nota</span>
            </div>
            {VOCABULARIO.map((v) => (
              <div key={v.decimos}>
                <b>{v.decimos}</b>
                <span className="ds-tachado">{v.noDecimos}</span>
                <span className="small muted">{v.nota ?? ''}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <h3 className="t4">Gramática y formato</h3>
          <div className="ds-formato">
            {FORMATO.map((f) => (
              <div key={f.tema} className="card stack g8">
                <span className="eyebrow">{f.tema}</span>
                <p className="small">{f.regla}</p>
                <code className="ds-ejf">{f.ej}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <h3 className="t4">Textos de la interfaz</h3>
          <div className="grid c2" style={{ gap: 24 }}>
            {PATRONES_TEXTO.map((p) => (
              <article key={p.pieza} className="card stack g12">
                <h4 className="t3">{p.pieza}</h4>
                <p className="small muted">{p.regla}</p>
                <div className="stack g8">
                  <span className="ds-tag si">Sí</span>
                  <ul className="ds-reglas si">{p.si.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
                <div className="stack g8">
                  <span className="ds-tag no">No</span>
                  <ul className="ds-reglas no">{p.no.map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="stack g16">
          <h3 className="t4">Antes y después</h3>
          <div className="ds-ej">
            {ANTES_DESPUES.map((a) => (
              <div key={a.antes} className="card stack g12">
                <div className="stack g8">
                  <span className="ds-tag no">Antes</span>
                  <p className="ds-tachado">{a.antes}</p>
                </div>
                <div className="stack g8">
                  <span className="ds-tag si">Después</span>
                  <p className="t4">{a.despues}</p>
                </div>
                <p className="small muted">{a.porque}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card stack g16" style={{ maxWidth: 820 }}>
          <h3 className="t3">Antes de publicar un texto</h3>
          <ul className="ds-check">
            {CHECKLIST.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
