import Flash from '../../../../components/Flash'
import { cancelarReserva } from '../../../actions'
import { cap, fmtDiaMes, fmtHora, getContext, type Reservation } from '../../../../lib/data'

export const metadata = { title: 'Mis reservas y créditos' }

const RESULT: Record<string, [string, string]> = {
  asistio: ['Asististe', 'Usado'],
  no_asistio: ['No asististe', 'Perdido'],
  cancelada: ['Cancelada por ti con más de 24 horas', 'Devuelto'],
  cancelada_tarde: ['Cancelada con menos de 24 horas', 'Perdido'],
  cancelada_monica: ['Cancelada por Mónica', 'Devuelto'],
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const { supabase, credits } = (await getContext())!
  const { data } = await supabase
    .from('reservations')
    .select('id, session_id, estado, class_sessions!inner(id, disciplina, starts_at, capacidad, cancelada)')
    .order('starts_at', { referencedTable: 'class_sessions', ascending: true })
  const all = (data ?? []) as unknown as Reservation[]
  const now = Date.now()
  const proximas = all.filter((r) => ['reservada', 'lista_espera'].includes(r.estado) && new Date(r.class_sessions.starts_at).getTime() >= now)
  const historial = all.filter((r) => !proximas.includes(r)).reverse()
  const fecha = (iso: string) => `${cap(fmtDiaMes(iso))} · ${fmtHora(iso)}`
  const caduca = credits.caducan ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' }).format(new Date(credits.caducan)).replace('.', '') : ''
  return (
    <>
      <div className="stack g8"><h1 className="t2">Mis reservas y créditos</h1><p className="lead">Tus clases reservadas y el uso de tus 8 créditos mensuales.</p></div>
      <Flash ok={sp.ok} error={sp.error} />
      <div className="grid c4">
        <div className="card tint stat"><b>{credits.disponibles}</b><span className="small muted" style={{ fontWeight: 700 }}>Disponibles</span></div>
        <div className="card stat"><b>{credits.usados}</b><span className="small muted" style={{ fontWeight: 700 }}>Usados</span></div>
        <div className="card blush stat"><b>{credits.perdidos}</b><span className="small muted" style={{ fontWeight: 700 }}>Perdidos (no asististe)</span></div>
        <div className="card stat"><b>{caduca}</b><span className="small muted" style={{ fontWeight: 700 }}>Caducan a fin de mes</span></div>
      </div>
      <section className="card stack g16">
        <h2 className="t3">Próximas reservas</h2>
        {proximas.length === 0 ? <p className="muted" style={{ fontSize: 17 }}>No tienes reservas próximas.</p> : (
          <div className="scroll-x"><table className="tbl" style={{ minWidth: 560 }}>
            <thead><tr><th>Clase</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {proximas.map((r) => (
                <tr key={r.id}>
                  <td><b>{r.class_sessions.disciplina}</b></td>
                  <td>{fecha(r.class_sessions.starts_at)}</td>
                  <td>{r.estado === 'reservada' ? <span className="chip tint">Reservada</span> : <span className="chip warn">En lista de espera</span>}</td>
                  <td><form action={cancelarReserva}><input type="hidden" name="reserva" value={r.id} /><button className="linkbtn" type="submit">{r.estado === 'reservada' ? 'Cancelar' : 'Salir de la lista'}</button></form></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        )}
      </section>
      <section className="card stack g16">
        <h2 className="t3">Historial</h2>
        {historial.length === 0 ? <p className="muted" style={{ fontSize: 17 }}>Todavía no hay clases en tu historial.</p> : (
          <div className="scroll-x"><table className="tbl" style={{ minWidth: 560 }}>
            <thead><tr><th>Clase</th><th>Fecha</th><th>Resultado</th><th>Crédito</th></tr></thead>
            <tbody>
              {historial.map((r) => {
                const [res, cr] = RESULT[r.estado] ?? ['Pasada', '—']
                return (
                  <tr key={r.id}>
                    <td><b>{r.class_sessions.disciplina}</b></td><td>{fecha(r.class_sessions.starts_at)}</td><td>{res}</td>
                    <td>{cr === 'Perdido' ? <span className="chip warn">Perdido</span> : cr}</td>
                  </tr>
                )
              })}
            </tbody>
          </table></div>
        )}
      </section>
      <div className="card tint stack g8"><h3 className="t4">Recuerda</h3><p style={{ fontSize: 16, color: 'var(--soft)' }}>Solo puedes reservar una clase al día. Cancela hasta 24 horas antes y no pierdes el crédito. Si Mónica cancela una clase, tampoco. Si reservas y no asistes, pierdes el crédito de esa clase.</p></div>
    </>
  )
}
