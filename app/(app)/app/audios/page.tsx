import Flash from '../../../../components/Flash'
import { comprar } from '../../../actions'
import { getContext } from '../../../../lib/data'
import { hayStripe, tieneAcceso } from '../../../../lib/stripe'
import { alVolverDeCompra, euros, precioAudio } from '../../../../lib/compras'

export const metadata = { title: 'Audios de Mindfulness' }

type Audio = { id: string; titulo: string; descripcion: string; minutos: number | null }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const { supabase, user, profile } = (await getContext())!
  if (sp.session_id) await alVolverDeCompra(sp.session_id, user.id)

  const [{ data }, { data: mias }] = await Promise.all([
    supabase.from('audios').select('id, titulo, descripcion, minutos').order('created_at'),
    supabase.from('compras').select('audio_id, estado').not('audio_id', 'is', null).in('estado', ['procesando', 'pagada']),
  ])
  const audios = (data ?? []) as Audio[]
  const mio = new Map<string, string>(((mias ?? []) as { audio_id: string; estado: string }[]).map((c) => [c.audio_id, c.estado]))
  const activa = tieneAcceso(profile?.estado_suscripcion)
  const precio = euros(precioAudio(profile?.estado_suscripcion))
  const pagos = hayStripe()

  return (
    <>
      <div className="stack g8">
        <h1 className="t2">Audios de Mindfulness</h1>
        <p className="lead">Prácticas guiadas para descargar y escuchar cuando quieras. Se pagan una vez y son tuyas.</p>
      </div>
      <Flash ok={sp.ok} error={sp.error} />
      <p className="small muted">{activa ? `Precio de suscriptora o suscriptor: ${precio} (sin suscripción, 19 €).` : `Precio: ${precio}. Con una suscripción activa cada audio cuesta 17 €.`}</p>
      {audios.length === 0 ? (
        <div className="card tint stack g8"><h2 className="t4">Muy pronto</h2><p style={{ fontSize: 16, color: 'var(--soft)' }}>Estamos grabando los primeros audios. Te avisamos por email cuando estén disponibles.</p></div>
      ) : (
        <div className="grid c2">
          {audios.map((a) => {
            const estado = mio.get(a.id)
            return (
              <div key={a.id} className="card stack g12" style={{ padding: 28 }}>
                <h2 className="t3" style={{ fontSize: 24 }}>{a.titulo}</h2>
                {a.minutos && <span className="chip tint" style={{ alignSelf: 'flex-start' }}>{a.minutos} min</span>}
                {a.descripcion && <p className="muted" style={{ fontSize: 17 }}>{a.descripcion}</p>}
                {estado === 'pagada' ? (
                  <a className="btn b1 sm" href={`/api/audios/${a.id}/descarga`} style={{ alignSelf: 'flex-start' }}>Descargar</a>
                ) : estado === 'procesando' ? (
                  <p className="alert ok" role="status">Tu pago se está procesando. Podrás descargarlo en cuanto se confirme.</p>
                ) : (
                  <form action={comprar}>
                    <input type="hidden" name="tipo" value="audio" />
                    <input type="hidden" name="id" value={a.id} />
                    <button className="btn b2 sm" type="submit" disabled={!pagos}>Comprar por {precio}</button>
                  </form>
                )}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}
