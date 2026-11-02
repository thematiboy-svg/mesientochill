import Flash from '../../../../components/Flash'
import { cambiarPlan } from '../../../actions'
import { getContext } from '../../../../lib/data'

export const metadata = { title: 'Suscripción' }

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  const { profile } = (await getContext())!
  const directo = profile?.plan === 'directo'
  const desde = profile?.suscrita_desde ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(profile.suscrita_desde)).replace(/\./g, '') : ''
  return (
    <>
      <div className="stack g8"><h1 className="t2">Suscripción</h1><p className="lead">Gestiona tu plan y tu método de pago.</p></div>
      <Flash ok={sp.ok} error={sp.error} />
      <div className="grid c2">
        <div className="card sel stack g16" style={{ padding: 30 }}>
          <span className="eyebrow">Plan actual</span>
          <h2 className="t3" style={{ fontSize: 28 }}>{directo ? 'Directo y vídeos' : 'Solo vídeos'}</h2>
          <p style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{directo ? '49 €' : '39 €'}</span><span className="muted" style={{ fontWeight: 600 }}>/mes</span></p>
          <p className="small muted">Suscrita desde el {desde}. Próximo cobro: [fecha]. {directo ? '8 créditos al mes.' : 'Sin clases en directo.'}</p>
        </div>
        <div className="card stack g16">
          <span className="eyebrow">Cambiar de plan</span>
          <h2 className="t3" style={{ fontSize: 28 }}>{directo ? 'Solo vídeos · 39 €/mes' : 'Directo y vídeos · 49 €/mes'}</h2>
          <p className="muted" style={{ fontSize: 17 }}>{directo ? 'El cambio se refleja en tu acceso al momento. Perderás las reservas de clases en directo y los créditos.' : 'El cambio se refleja en tu acceso al momento. Tendrás 8 créditos al mes para reservar clases en directo.'}</p>
          <form action={cambiarPlan}><input type="hidden" name="plan" value={directo ? 'videos' : 'directo'} /><button className="btn b4 sm" type="submit">{directo ? 'Cambiar a solo vídeos' : 'Cambiar a directo y vídeos'}</button></form>
        </div>
      </div>
      <section className="card stack g16">
        <h2 className="t3">Método de pago</h2>
        <div className="wrapr between center g16"><p style={{ fontSize: 17 }}>Aún no hay ningún método de pago conectado.</p></div>
        <p className="small muted">Los pagos se gestionarán de forma segura con Stripe (pendiente de conectar).</p>
      </section>
      <section className="card blush stack g12">
        <h2 className="t3">Darte de baja</h2>
        <p style={{ fontSize: 16, color: '#4A3B37' }}>Puedes cancelar cuando quieras. Mantendrás el acceso hasta el final del periodo pagado.</p>
        <a href="mailto:hola@mesientochill.com?subject=Baja%20de%20mi%20suscripci%C3%B3n" style={{ fontWeight: 700, color: '#8A3A26', alignSelf: 'flex-start' }}>Solicitar la baja de mi suscripción</a>
      </section>
    </>
  )
}
