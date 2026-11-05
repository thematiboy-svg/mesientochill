import Flash from '../../../../components/Flash'
import { comprar } from '../../../actions'
import { getContext } from '../../../../lib/data'
import { hayStripe, tieneAcceso } from '../../../../lib/stripe'
import { alVolverDeCompra, euros, precioEvento } from '../../../../lib/compras'

export const metadata = { title: 'Eventos' }

type Evento = { id: string; titulo: string; descripcion: string; lugar: string; starts_at: string; aforo: number; precio_cents: number }

const fecha = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Madrid' }).format(new Date(iso))

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const { supabase, user, profile } = (await getContext())!
  if (sp.session_id) await alVolverDeCompra(sp.session_id, user.id)

  const { data } = await supabase
    .from('eventos')
    .select('id, titulo, descripcion, lugar, starts_at, aforo, precio_cents')
    .gt('starts_at', new Date().toISOString())
    .order('starts_at')
  const eventos = (data ?? []) as Evento[]
  const ids = eventos.map((e) => e.id)
  const [{ data: plazas }, { data: mias }] = await Promise.all([
    ids.length ? supabase.rpc('plazas_evento', { p_ids: ids }) : Promise.resolve({ data: [] }),
    ids.length ? supabase.from('compras').select('evento_id, estado').in('evento_id', ids).in('estado', ['procesando', 'pagada']) : Promise.resolve({ data: [] }),
  ])
  const ocupadas = new Map<string, number>(((plazas ?? []) as { evento_id: string; ocupadas: number }[]).map((p) => [p.evento_id, p.ocupadas]))
  const mia = new Map<string, string>(((mias ?? []) as { evento_id: string; estado: string }[]).map((c) => [c.evento_id, c.estado]))

  const activa = tieneAcceso(profile?.estado_suscripcion)
  const nota = !activa
    ? 'Con una suscripción activa tienes un 10 % (Solo vídeos) o un 20 % (Directo y vídeos) de descuento.'
    : profile?.plan === 'directo' ? 'Precio con tu 20 % de descuento del plan Directo y vídeos.' : 'Precio con tu 10 % de descuento del plan Solo vídeos.'
  const pagos = hayStripe()

  return (
    <>
      <div className="stack g8"><h1 className="t2">Eventos de la comunidad</h1><p className="lead">Cuatro días al año para ti y para la comunidad.</p></div>
      <Flash ok={sp.ok} error={sp.error} />
      {eventos.length === 0 && (
        <div className="card tint stack g8"><h2 className="t4">Aún no hay eventos programados</h2><p style={{ fontSize: 16, color: 'var(--soft)' }}>Te avisamos por email cuando abramos el próximo.</p></div>
      )}
      {eventos.map((e, i) => {
        const libres = Math.max(e.aforo - (ocupadas.get(e.id) ?? 0), 0)
        const estado = mia.get(e.id)
        const precio = precioEvento(e.precio_cents, profile?.plan, profile?.estado_suscripcion)
        return (
          <div key={e.id} className="card blush wrapr center" style={{ gap: '24px 40px', padding: 36 }}>
            <div className="stack g12" style={{ flex: '1 1 320px', minWidth: 0 }}>
              <span className="eyebrow" style={{ color: '#8A3A26' }}>{i === 0 ? 'Próximo evento' : 'Más adelante'}</span>
              <h2 className="t2" style={{ fontSize: 32 }}>{e.titulo}</h2>
              <p style={{ fontSize: 17, color: '#4A3B37', fontWeight: 700 }}>{fecha(e.starts_at)}{e.lugar ? ` · ${e.lugar}` : ''}</p>
              {e.descripcion && <p style={{ fontSize: 17, color: '#4A3B37' }}>{e.descripcion}</p>}
            </div>
            <div className="card stack g12" style={{ flex: '1 1 280px', minWidth: 0 }}>
              <p style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}><span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{euros(precio)}</span><span className="muted" style={{ fontWeight: 600 }}>por persona</span></p>
              <p className="small muted">{nota}{precio !== e.precio_cents ? ` Precio general: ${euros(e.precio_cents)}.` : ''}</p>
              {estado === 'pagada' ? (
                <p className="alert ok" role="status">Tienes tu plaza. ¡Nos vemos allí!</p>
              ) : estado === 'procesando' ? (
                <p className="alert ok" role="status">Tu pago se está procesando. Tu plaza está guardada.</p>
              ) : libres === 0 ? (
                <button className="btn full" disabled>Plazas agotadas</button>
              ) : (
                <form action={comprar} className="stack g8">
                  <input type="hidden" name="tipo" value="evento" />
                  <input type="hidden" name="id" value={e.id} />
                  <button className="btn b3 full" type="submit" disabled={!pagos}>Reservar mi plaza</button>
                  <span className="small muted">{libres === 1 ? 'Queda 1 plaza.' : `Quedan ${libres} plazas.`} El pago se hace de forma segura en Stripe.</span>
                </form>
              )}
            </div>
          </div>
        )
      })}
      <section className="stack g16"><h2 className="t3">Fotos de los anteriores</h2><div className="grid c4"><div className="ph" style={{ aspectRatio: '4/3', borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: '4/3', borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: '4/3', borderRadius: 20 }}>[FOTO]</div><div className="ph" style={{ aspectRatio: '4/3', borderRadius: 20 }}>[FOTO]</div></div></section>
    </>
  )
}
