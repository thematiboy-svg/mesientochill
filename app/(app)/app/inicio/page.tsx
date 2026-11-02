import Link from 'next/link'
import PlayIcon from '../../../../components/PlayIcon'
import { cap, fmtDiaMes, fmtHora, franja, getContext, type Reservation } from '../../../../lib/data'

export const metadata = { title: 'Inicio' }

const TH: Record<string, string> = { Pilates: '', 'Total Barre': 'c', Mindfulness: 's' }

export default async function Page() {
  const ctx = (await getContext())!
  const { supabase, profile, credits } = ctx
  const directo = profile?.plan === 'directo'
  const { data: next } = await supabase
    .from('reservations')
    .select('id, session_id, estado, class_sessions!inner(id, disciplina, starts_at, capacidad, cancelada)')
    .eq('estado', 'reservada')
    .gte('class_sessions.starts_at', new Date().toISOString())
    .order('starts_at', { referencedTable: 'class_sessions', ascending: true })
    .limit(1)
  const prox = (next as unknown as Reservation[] | null)?.[0]
  const { data: videos } = await supabase.from('videos').select('id, titulo, disciplina, nivel, minutos').limit(3)
  const total = 8
  return (
    <>
      <div className="page-h">
        <div className="stack g8">
          <span className="chip tint" style={{ alignSelf: 'flex-start' }}>Plan {directo ? 'Directo y vídeos' : 'Solo vídeos'}</span>
          <h1 className="t2">Hola, {profile?.nombre || 'bienvenida'}</h1>
          <p className="lead">{directo ? (prox ? `Tu próxima clase es el ${cap(fmtDiaMes(prox.class_sessions.starts_at))}.` : 'Aún no tienes ninguna clase reservada.') : 'Tienes toda la biblioteca de vídeos a tu disposición.'}</p>
        </div>
        <Link className="btn b1" href={directo ? '/app/directos' : '/app/biblioteca'}>{directo ? 'Reservar otra clase' : 'Ir a la biblioteca'}</Link>
      </div>
      {directo && (
        <div className="wrapr g24" style={{ alignItems: 'stretch' }}>
          <div className="card tint stack g16" style={{ flex: '2 1 420px', minWidth: 0 }}>
            <span className="eyebrow">Tu próxima clase</span>
            {prox ? (
              <>
                <div className="wrapr g20 center">
                  <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{cap(fmtDiaMes(prox.class_sessions.starts_at)).split(' ').slice(0, 2).join(' ')}<br />{fmtHora(prox.class_sessions.starts_at)}</span>
                  <div className="stack g8" style={{ flex: '1 1 220px' }}>
                    <h2 className="t3" style={{ fontSize: 28 }}>{prox.class_sessions.disciplina}</h2>
                    <p className="muted" style={{ fontSize: 17 }}>{franja(prox.class_sessions.starts_at)} · 20 minutos con Mónica Muñoz</p>
                    <span className="chip" style={{ alignSelf: 'flex-start' }}><span className="dot m"></span>Reservada · 1 crédito</span>
                  </div>
                </div>
                <div className="wrapr g12">
                  <Link className="btn b1 sm" href="/app/reservas">Ver detalles</Link>
                  <Link className="btn b4 sm" href="/app/reservas">Cancelar (hasta 24 h antes)</Link>
                </div>
              </>
            ) : (
              <p className="muted" style={{ fontSize: 17 }}>Reserva tu primera pausa de 20 minutos.</p>
            )}
          </div>
          <div className="card stack g16" style={{ flex: '1 1 280px', minWidth: 0 }}>
            <span className="eyebrow">Créditos de este mes</span>
            <div className="stat"><b>{credits.disponibles} <span className="muted" style={{ fontSize: 20, fontWeight: 600 }}>de {total}</span></b></div>
            <div className="bar" role="img" aria-label={`${credits.disponibles} de ${total} créditos disponibles`}><i style={{ width: `${(credits.disponibles / total) * 100}%` }}></i></div>
            <p className="small muted">Caducan a fin de mes. Los no usados no se acumulan.</p>
            <Link href="/app/reservas" className="small" style={{ fontWeight: 700 }}>Ver mis reservas y créditos</Link>
          </div>
        </div>
      )}
      <section className="stack g16">
        <div className="wrapr between center g12"><h2 className="t3">Sigue practicando</h2><Link href="/app/biblioteca" className="small" style={{ fontWeight: 700 }}>Ir a la biblioteca</Link></div>
        <div className="grid c4">
          {(videos ?? []).map((v) => (
            <article className="vid" key={v.id}>
              <div className={'th ' + (TH[v.disciplina] ?? '')}><PlayIcon /><span className="chip">{v.minutos} min</span></div>
              <div className="bd"><span className="eyebrow" style={{ fontSize: 12 }}>{v.disciplina}</span><h3 className="t4" style={{ fontSize: 17 }}>{v.titulo}</h3><p className="small muted">{v.nivel ?? 'Todos los niveles'}</p></div>
            </article>
          ))}
        </div>
      </section>
      <div className="grid c2">
        <Link className="card sand stack g8" href="/app/eventos" style={{ textDecoration: 'none', color: 'var(--ink)' }}><span className="eyebrow">Eventos</span><h3 className="t3">Próximo evento: [fecha y lugar]</h3><p className="small muted">{directo ? '30,40 €' : '34,20 €'} para suscriptoras y suscriptores.</p></Link>
        <Link className="card blush stack g8" href="/app/ayuda" style={{ textDecoration: 'none', color: 'var(--ink)' }}><span className="eyebrow" style={{ color: '#8A3A26' }}>Ayuda</span><h3 className="t3">¿Tienes dudas?</h3><p className="small" style={{ color: '#4A3B37' }}>Pregunta a Chillsi o escríbenos por el formulario de Contacto.</p></Link>
      </div>
    </>
  )
}
