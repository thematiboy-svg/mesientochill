import { redirect } from 'next/navigation'
import CancelarClaseBtn from '../../../../components/CancelarClaseBtn'
import Flash from '../../../../components/Flash'
import { cap, fmtDiaMes, fmtHora, franja, getContext } from '../../../../lib/data'
import { createAdminClient } from '../../../../lib/supabase/admin'
import { cancelarClase } from '../../../actions'

export const metadata = { title: 'Gestionar clases' }

type Fila = { id: string; disciplina: string; starts_at: string; capacidad: number; cancelada: boolean; reservations: { estado: string; created_at: string; user_id: string }[] }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const ctx = (await getContext())!
  if (!ctx.admin) redirect('/app/inicio')
  const admin = createAdminClient()
  if (!admin) return <p className="alert err">Falta la clave de servicio de Supabase en Vercel.</p>
  const desde = new Date(Date.now() - 60 * 60_000).toISOString()
  const hasta = new Date(Date.now() + 28 * 24 * 3600_000).toISOString()
  const { data } = await admin
    .from('class_sessions')
    .select('id, disciplina, starts_at, capacidad, cancelada, reservations(estado, created_at, user_id)')
    .gte('starts_at', desde)
    .lte('starts_at', hasta)
    .order('starts_at')
  const clases = (data ?? []) as Fila[]
  const ids = [...new Set(clases.flatMap((c) => c.reservations.map((r) => r.user_id)))]
  const { data: perfiles } = ids.length ? await admin.from('profiles').select('id, nombre, apellidos').in('id', ids) : { data: [] }
  const nombre = Object.fromEntries((perfiles ?? []).map((p) => [p.id, `${p.nombre} ${p.apellidos}`.trim() || 'Sin nombre']))
  const ahora = Date.now()
  return (
    <>
      <div className="stack g8"><h1 className="t2">Gestionar clases</h1><p className="lead">Tus clases de las próximas 4 semanas, con quién se ha apuntado. Si cancelas una, avisamos por email a todas las personas apuntadas y les devolvemos el crédito.</p></div>
      <Flash ok={sp.ok} error={sp.error} />
      {clases.length === 0 ? <p className="card muted">No hay clases programadas en las próximas 4 semanas.</p> : (
        <div className="stack g16">
          {clases.map((c) => {
            const plaza = c.reservations.filter((r) => r.estado === 'reservada')
            const lista = c.reservations.filter((r) => r.estado === 'lista_espera').sort((a, b) => a.created_at.localeCompare(b.created_at))
            const empezada = new Date(c.starts_at).getTime() <= ahora
            const cuando = `${cap(fmtDiaMes(c.starts_at))} a las ${fmtHora(c.starts_at)}`
            const n = plaza.length + lista.length
            const aviso = `¿Cancelar la clase de ${c.disciplina} del ${cuando}?\n\n${n === 0 ? 'No hay nadie apuntado.' : `Avisaremos por email a ${n} ${n === 1 ? 'persona' : 'personas'} y devolveremos el crédito a quien tenía plaza.`}\n\nNo se puede deshacer.`
            return (
              <article key={c.id} className={'card stack g12' + (c.cancelada ? ' blush' : '')}>
                <div className="wrapr between center g12">
                  <div className="stack" style={{ gap: 4 }}>
                    <h2 className="t4" style={{ fontSize: 20 }}>{c.disciplina} · {cuando}</h2>
                    <p className="small muted">{franja(c.starts_at)} · {plaza.length} de {c.capacidad} plazas{lista.length ? ` · ${lista.length} en lista de espera` : ''}</p>
                  </div>
                  {c.cancelada ? <span className="chip warn">Cancelada</span> : empezada ? <span className="chip">Ya ha empezado</span> : <CancelarClaseBtn action={cancelarClase} sessionId={c.id} aviso={aviso} />}
                </div>
                {plaza.length === 0 && lista.length === 0 ? (
                  <p className="small muted">Todavía no se ha apuntado nadie.</p>
                ) : (
                  <details>
                    <summary className="small" style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--teal)' }}>Ver quién se ha apuntado</summary>
                    <div className="wrapr g24" style={{ marginTop: 12, alignItems: 'flex-start' }}>
                      {plaza.length > 0 && <div className="stack" style={{ gap: 4 }}><b className="small">Con plaza</b><ol className="small" style={{ paddingLeft: 20 }}>{plaza.map((r) => <li key={r.user_id}>{nombre[r.user_id] ?? 'Sin nombre'}</li>)}</ol></div>}
                      {lista.length > 0 && <div className="stack" style={{ gap: 4 }}><b className="small">Lista de espera</b><ol className="small" style={{ paddingLeft: 20 }}>{lista.map((r) => <li key={r.user_id}>{nombre[r.user_id] ?? 'Sin nombre'}</li>)}</ol></div>}
                    </div>
                  </details>
                )}
              </article>
            )
          })}
        </div>
      )}
    </>
  )
}
