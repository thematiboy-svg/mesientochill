import Link from 'next/link'
import Flash from '../../../../components/Flash'
import { reservar, unirseLista } from '../../../actions'
import { cap, fmtHora, franja, getContext, TZ, type Session } from '../../../../lib/data'

export const metadata = { title: 'Clases en directo' }

const DISC = ['Pilates', 'Total Barre', 'Mindfulness']

function lunes(offset: number) {
  const d = new Date()
  const dow = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - dow + offset * 7)
  d.setUTCHours(0, 0, 0, 0)
  return d
}
const dayKey = (iso: string | Date) => new Intl.DateTimeFormat('en-CA', { timeZone: TZ }).format(new Date(iso))

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const ctx = (await getContext())!
  const { supabase, profile, credits } = ctx
  const semana = Number(sp.semana ?? 0) || 0
  const disc = DISC.includes(sp.disc ?? '') ? sp.disc! : ''
  const ini = lunes(semana)
  const fin = new Date(ini); fin.setUTCDate(fin.getUTCDate() + 7)
  const { data: sessions } = await supabase.from('class_sessions').select('*').gte('starts_at', ini.toISOString()).lt('starts_at', fin.toISOString()).eq('cancelada', false).order('starts_at')
  const ids = (sessions ?? []).map((s) => s.id)
  const { data: mine } = ids.length ? await supabase.from('reservations').select('id, session_id, estado').in('session_id', ids) : { data: [] }
  const { data: ocup } = ids.length ? await supabase.rpc('ocupacion', { p_ids: ids }) : { data: [] }
  const taken: Record<string, number> = {}
  ;(ocup ?? []).forEach((o: { session_id: string; ocupadas: number }) => (taken[o.session_id] = o.ocupadas))
  const myState: Record<string, string> = {}
  ;(mine ?? []).forEach((r) => (myState[r.session_id] = r.estado))
  const days = Array.from({ length: 5 }, (_, i) => { const d = new Date(ini); d.setUTCDate(d.getUTCDate() + i); return d })
  const label = (d: Date) => cap(new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', timeZone: 'UTC' }).format(d).replace('.', ''))
  const rango = `${new Intl.DateTimeFormat('es-ES', { day: 'numeric', timeZone: 'UTC' }).format(days[0])} – ${new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(days[4]).replace('.', '')}`
  const qs = (o: Record<string, string | number>) => '/app/directos?' + new URLSearchParams(Object.entries({ semana, disc, ...o }).filter(([, v]) => v !== '' && v !== 0).map(([k, v]) => [k, String(v)])).toString()
  const sel: Session | undefined = (sessions ?? []).find((s) => s.id === sp.sel)
  const back = qs({ semana })
  const directo = profile?.plan === 'directo'
  const free = (s: Session) => s.capacidad - (taken[s.id] ?? 0)

  return (
    <>
      <div className="page-h">
        <div className="stack g8"><h1 className="t2">Clases en directo</h1><p className="lead">Reserva con 1 crédito. Máximo 10 personas por clase y una clase al día.</p></div>
        {directo && <span className="cred"><span className="dot c"></span>{credits.disponibles} {credits.disponibles === 1 ? 'crédito disponible' : 'créditos disponibles'}</span>}
      </div>
      {!directo && <p className="alert err">Tu plan Solo vídeos no incluye clases en directo. Puedes cambiar de plan en <Link href="/app/suscripcion" style={{ textDecoration: 'underline' }}>Suscripción</Link>.</p>}
      <Flash ok={sp.ok} error={sp.error} />
      <div className="wrapr between center g16">
        <div className="wrapr g8">
          <Link className={'chip' + (!disc ? ' on' : '')} href={qs({ disc: '' })} style={{ textDecoration: 'none' }}>Todas</Link>
          {DISC.map((d) => <Link key={d} className={'chip' + (disc === d ? ' on' : '')} href={qs({ disc: d })} style={{ textDecoration: 'none' }}>{d}</Link>)}
        </div>
        <div className="wrapr center g12">
          <Link className="btn b4 sm" href={qs({ semana: semana - 1 })} aria-label="Semana anterior">←</Link>
          <b>{rango}</b>
          <Link className="btn b4 sm" href={qs({ semana: semana + 1 })} aria-label="Semana siguiente">→</Link>
        </div>
      </div>
      <div className="cal">
        {days.map((d) => (
          <div className="day" key={d.toISOString()}>
            <h4>{label(d)}</h4>
            {(sessions ?? []).filter((s) => dayKey(s.starts_at) === dayKey(d) && (!disc || s.disciplina === disc)).map((s) => {
              const st = myState[s.id]
              const cls = st === 'reservada' ? 'mine' : st === 'lista_espera' ? 'wait' : free(s) <= 0 ? 'full' : ''
              const txt = st === 'reservada' ? 'Reservada' : st === 'lista_espera' ? 'En lista de espera' : free(s) <= 0 ? 'Completa · lista de espera' : `${free(s)} libres`
              return (
                <Link key={s.id} className={'slot ' + cls} href={qs({ sel: s.id })} style={{ textDecoration: 'none' }}>
                  {s.disciplina}<small>{fmtHora(s.starts_at)} · {txt}</small>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div className="wrapr g16 small" style={{ fontWeight: 600 }}>
        <span className="chip tint">Libre</span><span className="chip on">Reservada por ti</span><span className="chip" style={{ background: '#F4EFEB', borderColor: '#E3DED8' }}>Completa</span><span className="chip warn">En lista de espera</span>
      </div>
      <div className="grid c2">
        <div className="card stack g16">
          <span className="eyebrow">Clase seleccionada</span>
          {sel ? (
            <>
              <h2 className="t3" style={{ fontSize: 26 }}>{sel.disciplina} · {cap(new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', timeZone: TZ }).format(new Date(sel.starts_at)))}, {fmtHora(sel.starts_at)}</h2>
              <p className="muted" style={{ fontSize: 17 }}>{franja(sel.starts_at)} · 20 minutos con Mónica Muñoz · {free(sel)} plazas libres de {sel.capacidad}</p>
              {myState[sel.id] === 'reservada' ? (
                <p className="alert ok">Ya tienes esta clase reservada. Puedes cancelarla en <Link href="/app/reservas" style={{ textDecoration: 'underline' }}>Mis reservas</Link>.</p>
              ) : free(sel) > 0 ? (
                <form action={reservar}><input type="hidden" name="session" value={sel.id} /><input type="hidden" name="back" value={back} /><button className="btn b1 full" type="submit" disabled={!directo}>Reservar con 1 crédito</button></form>
              ) : (
                <p className="alert err">Esta clase está completa. Apúntate a la lista de espera.</p>
              )}
              <p className="small muted">Puedes cancelar hasta 24 horas antes y no pierdes el crédito.</p>
            </>
          ) : (
            <p className="muted" style={{ fontSize: 17 }}>Elige una clase en el calendario para ver los detalles y reservarla.</p>
          )}
        </div>
        <div className="card tint stack g12">
          <span className="eyebrow">Si la clase está completa</span>
          <h2 className="t3">Lista de espera</h2>
          <p className="muted" style={{ fontSize: 17 }}>Apúntate y, si se libera una plaza, avisamos por email a las tres primeras personas. Se la queda quien la reserve primero.</p>
          {sel && free(sel) <= 0 && !myState[sel.id] ? (
            <form action={unirseLista}><input type="hidden" name="session" value={sel.id} /><input type="hidden" name="back" value={back} /><button className="btn b4 sm" type="submit" style={{ alignSelf: 'flex-start' }}>Apuntarme a la lista de espera</button></form>
          ) : (
            <span className="small muted">Disponible al elegir una clase completa.</span>
          )}
        </div>
      </div>
    </>
  )
}
