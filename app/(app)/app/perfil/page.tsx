import Link from 'next/link'
import Flash from '../../../../components/Flash'
import { guardarPerfil } from '../../../actions'
import { getContext } from '../../../../lib/data'

export const metadata = { title: 'Mi perfil y cuestionario' }

const NIVELES = [['nunca', 'Nunca he practicado'], ['algo', 'Algo de experiencia'], ['regular', 'Practico con regularidad']]
const MOLESTIAS = ['Espalda', 'Cuello', 'Hombros', 'Otras', 'Ninguna']
const OBJETIVOS = ['Reducir el estrés', 'Mejorar la postura', 'Ganar fuerza', 'Hacer pausas durante el día']
const FRANJAS = ['Hora del café', 'Hora de la comida', 'Después del trabajo']

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const { profile: p, user } = (await getContext())!
  return (
    <>
      <div className="stack g8"><h1 className="t2">Mi perfil y cuestionario</h1><p className="lead">Con esta información Mónica adapta las clases a ti.</p></div>
      {sp.error && <p className="alert err" role="alert">{sp.error}</p>}
      {sp.bienvenida && <p className="alert ok">¡Bienvenida a MeSientoChill! Completa tu cuestionario para que Mónica pueda adaptar las clases a ti.</p>}
      <Flash ok={sp.ok} error={sp.error} />
      <form className="stack g24" action={guardarPerfil}>
        <section className="card stack g20">
          <h2 className="t3">Datos personales</h2>
          <div className="grid c2" style={{ gap: 16 }}>
            <div className="field"><label htmlFor="p-n">Nombre</label><input id="p-n" name="nombre" className="in-t" type="text" defaultValue={p?.nombre ?? ''} /></div>
            <div className="field"><label htmlFor="p-a">Apellidos</label><input id="p-a" name="apellidos" className="in-t" type="text" defaultValue={p?.apellidos ?? ''} /></div>
            <div className="field"><label htmlFor="p-e">Email</label><input id="p-e" className="in-t" type="email" value={user.email ?? ''} readOnly /></div>
            <div className="field"><label htmlFor="p-t">WhatsApp</label><input id="p-t" name="telefono" className="in-t" type="tel" inputMode="tel" autoComplete="tel" placeholder="+34 600 000 000" defaultValue={p?.telefono ?? ''} /></div>
          </div>
          <label className="opt" style={{ alignItems: 'flex-start', fontSize: 14 }}><input type="checkbox" name="avisos_whatsapp" defaultChecked={!!p?.avisos_whatsapp} /><span>Quiero recibir también por WhatsApp los avisos de mis clases: reservas, clases canceladas y plazas libres. Puedes desactivarlo cuando quieras en tu perfil.</span></label>
        </section>
        <section className="card stack g20">
          <h2 className="t3">Tu nivel</h2>
          <fieldset className="opts row">{NIVELES.map(([v, l]) => <label className="opt" key={v}><input type="radio" name="nivel" value={v} defaultChecked={p?.nivel === v} /> {l}</label>)}</fieldset>
        </section>
        <section className="card stack g20">
          <h2 className="t3">Molestias o lesiones</h2>
          <fieldset className="opts">{MOLESTIAS.map((m) => <label className="opt" key={m}><input type="checkbox" name="molestias" value={m} defaultChecked={p?.molestias?.includes(m)} /> {m}</label>)}</fieldset>
          <div className="field"><label htmlFor="p-o">Cuéntanos más (opcional)</label><textarea id="p-o" name="notas_salud" className="in-t" placeholder="Algo que Mónica deba saber" defaultValue={p?.notas_salud ?? ''} /></div>
          <label className="opt" style={{ alignItems: 'flex-start', fontSize: 14, background: 'var(--tint)', borderRadius: 16, padding: '14px 16px' }}><input type="checkbox" name="consentimiento" defaultChecked={p?.consentimiento_salud} />Doy mi consentimiento explícito para que MeSientoChill trate estos datos de salud. Usamos estas respuestas solo para recomendarte clases. Puedes retirarlas cuando quieras.</label>
          <p className="small muted">Las clases no sustituyen el consejo médico.</p>
        </section>
        <section className="card stack g20">
          <h2 className="t3">Tus objetivos</h2>
          <fieldset className="opts row">{OBJETIVOS.map((o) => <label className="opt" key={o}><input type="checkbox" name="objetivos" value={o} defaultChecked={p?.objetivos?.includes(o)} /> {o}</label>)}</fieldset>
        </section>
        <section className="card stack g20">
          <h2 className="t3">Franjas preferidas</h2>
          <fieldset className="opts row">{FRANJAS.map((f) => <label className="opt" key={f}><input type="checkbox" name="franjas" value={f} defaultChecked={p?.franjas?.includes(f)} /> {f}</label>)}</fieldset>
        </section>
        <div className="wrapr g12"><button className="btn b1" type="submit">Guardar cambios</button><Link className="btn b4" href="/app/inicio">Cancelar</Link></div>
      </form>
    </>
  )
}
