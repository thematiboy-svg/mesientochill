import Flash from '../../../../components/Flash'
import { abrirPortal, cambiarPlan, iniciarSuscripcion } from '../../../actions'
import { getContext } from '../../../../lib/data'
import { getStripe, hayStripe, tieneAcceso } from '../../../../lib/stripe'
import { sincronizarSuscripcion } from '../../../../lib/suscripcion'

export const metadata = { title: 'Suscripción' }

const fecha = (iso: string | null | undefined) =>
  iso ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/Madrid' }).format(new Date(iso)).replace(/\./g, '') : ''

/** Al volver de Stripe Checkout, copia ya la suscripción (el webhook puede tardar unos segundos). */
async function alVolverDelPago(sessionId: string | undefined, userId: string) {
  const stripe = getStripe()
  if (!stripe || !sessionId) return
  try {
    const s = await stripe.checkout.sessions.retrieve(sessionId)
    if (s.client_reference_id !== userId || !s.subscription) return
    await sincronizarSuscripcion(typeof s.subscription === 'string' ? s.subscription : s.subscription.id)
  } catch (e) {
    console.error('[stripe] Vuelta del pago', e)
  }
}

const PLANES = [
  { plan: 'videos', nombre: 'Solo vídeos', precio: '39 €', texto: 'Biblioteca de clases grabadas y directos grabados.' },
  { plan: 'directo', nombre: 'Directo y vídeos', precio: '49 €', texto: 'Todo lo anterior más clases en directo con 8 créditos al mes.' },
] as const

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams
  let ctx = (await getContext())!
  if (sp.session_id) {
    await alVolverDelPago(sp.session_id, ctx.user.id)
    ctx = (await getContext())!
  }
  const { profile } = ctx
  const stripe = hayStripe()
  const activa = tieneAcceso(profile?.estado_suscripcion)
  const directo = profile?.plan === 'directo'
  const impago = profile?.estado_suscripcion === 'past_due'

  if (stripe && !activa) {
    return (
      <>
        <div className="stack g8"><h1 className="t2">Suscripción</h1><p className="lead">Elige tu plan para empezar. Puedes cambiarlo o darte de baja cuando quieras.</p></div>
        <Flash ok={sp.ok} error={sp.error} />
        {profile?.estado_suscripcion === 'canceled' && <p className="alert err" role="status">Tu suscripción terminó{profile.periodo_fin ? ` el ${fecha(profile.periodo_fin)}` : ''}. Puedes volver cuando quieras.</p>}
        <div className="grid c2">
          {PLANES.map((p) => (
            <form key={p.plan} action={iniciarSuscripcion} className={`card stack g16${p.plan === (profile?.plan ?? 'directo') ? ' sel' : ''}`} style={{ padding: 30 }}>
              <input type="hidden" name="plan" value={p.plan} />
              <h2 className="t3" style={{ fontSize: 28 }}>{p.nombre}</h2>
              <p style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{p.precio}</span><span className="muted" style={{ fontWeight: 600 }}>/mes</span></p>
              <p className="muted" style={{ fontSize: 17 }}>{p.texto}</p>
              <button className={`btn ${p.plan === 'directo' ? 'b1' : 'b2'} sm`} type="submit" style={{ alignSelf: 'flex-start' }}>Suscribirme a {p.nombre.toLowerCase()}</button>
            </form>
          ))}
        </div>
        <p className="small muted">El pago se hace de forma segura en Stripe. Se renueva cada mes hasta que te des de baja.</p>
      </>
    )
  }

  const proximo = profile?.cancela_al_final
    ? `Tu suscripción termina el ${fecha(profile.periodo_fin)}; no habrá más cobros.`
    : profile?.periodo_fin ? `Próximo cobro: ${fecha(profile.periodo_fin)}.` : ''
  return (
    <>
      <div className="stack g8"><h1 className="t2">Suscripción</h1><p className="lead">Gestiona tu plan y tu método de pago.</p></div>
      <Flash ok={sp.ok} error={sp.error} />
      {impago && <p className="alert err" role="alert">No hemos podido cobrar tu última cuota. Stripe volverá a intentarlo; actualiza tu método de pago para no perder el acceso.</p>}
      <div className="grid c2">
        <div className="card sel stack g16" style={{ padding: 30 }}>
          <span className="eyebrow">Plan actual</span>
          <h2 className="t3" style={{ fontSize: 28 }}>{directo ? 'Directo y vídeos' : 'Solo vídeos'}</h2>
          <p style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>{directo ? '49 €' : '39 €'}</span><span className="muted" style={{ fontWeight: 600 }}>/mes</span></p>
          <p className="small muted">Suscrita desde el {fecha(profile?.suscrita_desde)}. {proximo} {directo ? '8 créditos al mes.' : 'Sin clases en directo.'}</p>
        </div>
        {stripe && !impago && (
          <div className="card stack g16">
            <span className="eyebrow">Cambiar de plan</span>
            <h2 className="t3" style={{ fontSize: 28 }}>{directo ? 'Solo vídeos · 39 €/mes' : 'Directo y vídeos · 49 €/mes'}</h2>
            <p className="muted" style={{ fontSize: 17 }}>{directo
              ? 'El cambio se aplica al momento: perderás las clases en directo y los créditos. Lo que ya has pagado de más se descuenta de tu próximo recibo.'
              : 'El cambio se aplica al momento y tendrás 8 créditos al mes para reservar clases en directo. Hoy te cobramos solo la parte proporcional de la diferencia.'}</p>
            <form action={cambiarPlan}><input type="hidden" name="plan" value={directo ? 'videos' : 'directo'} /><button className="btn b4 sm" type="submit">{directo ? 'Cambiar a solo vídeos' : 'Cambiar a directo y vídeos'}</button></form>
          </div>
        )}
      </div>
      <section className="card stack g16">
        <h2 className="t3">Método de pago y facturas</h2>
        {stripe ? (
          <>
            <p style={{ fontSize: 17 }}>Cambia tu tarjeta y descarga tus facturas en la página segura de Stripe.</p>
            <form action={abrirPortal}><button className="btn b2 sm" type="submit">Gestionar pagos y facturas</button></form>
          </>
        ) : (
          <>
            <div className="wrapr between center g16"><p style={{ fontSize: 17 }}>Aún no hay ningún método de pago conectado.</p></div>
            <p className="small muted">Los pagos se gestionarán de forma segura con Stripe (pendiente de conectar).</p>
          </>
        )}
      </section>
      <section className="card blush stack g12">
        <h2 className="t3">{profile?.cancela_al_final ? 'Volver a activar' : 'Darte de baja'}</h2>
        <p style={{ fontSize: 16, color: '#4A3B37' }}>{profile?.cancela_al_final
          ? `Has pedido la baja. Mantienes el acceso hasta el ${fecha(profile.periodo_fin)}. Si cambias de idea, puedes seguir con tu suscripción.`
          : 'Puedes cancelar cuando quieras. Mantendrás el acceso hasta el final del periodo pagado.'}</p>
        {stripe ? (
          <form action={abrirPortal}><button className="linkbtn" type="submit" style={{ fontWeight: 700, color: '#8A3A26' }}>{profile?.cancela_al_final ? 'Seguir con mi suscripción' : 'Darme de baja'}</button></form>
        ) : (
          <a href="mailto:hola@mesientochill.com?subject=Baja%20de%20mi%20suscripci%C3%B3n" style={{ fontWeight: 700, color: '#8A3A26', alignSelf: 'flex-start' }}>Solicitar la baja de mi suscripción</a>
        )}
      </section>
    </>
  )
}
