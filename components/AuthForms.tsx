'use client'
import Link from 'next/link'
import { useActionState } from 'react'
import { signIn, signUp, type FormState } from '../app/actions'

function Msg({ s }: { s: FormState }) {
  if (!s) return null
  if (s.error) return <p className="alert err" role="alert">{s.error}</p>
  if (s.ok) return <p className="alert ok" role="status">{s.ok}</p>
  return null
}

export function LoginForm({ configError }: { configError?: boolean }) {
  const [state, action, pending] = useActionState(signIn, undefined)
  return (
    <form className="card stack g20" style={{ padding: 40 }} action={action}>
      <div className="stack g8">
        <h1 className="t2" style={{ fontSize: 34 }}>Iniciar sesión</h1>
        <p className="muted" style={{ fontSize: 17 }}>Entra para reservar tus clases y ver tus vídeos.</p>
      </div>
      {configError && <p className="alert err">Falta configurar Supabase. Revisa el archivo .env.local.</p>}
      <Msg s={state} />
      <div className="field"><label htmlFor="l-e">Email</label><input id="l-e" name="email" className="in-t" type="email" autoComplete="email" placeholder="tu@email.com" required /></div>
      <div className="field"><label htmlFor="l-p">Contraseña</label><input id="l-p" name="password" className="in-t" type="password" autoComplete="current-password" placeholder="Tu contraseña" required /></div>
      <Link href="/ayuda" className="small" style={{ fontWeight: 700 }}>¿Has olvidado tu contraseña?</Link>
      <button className="btn b1 full" type="submit" disabled={pending}>{pending ? 'Entrando…' : 'Entrar'}</button>
      <hr className="hr" />
      <p className="small muted" style={{ textAlign: 'center' }}>¿Todavía no tienes cuenta? <Link href="/registro" style={{ fontWeight: 700 }}>Empezar</Link></p>
    </form>
  )
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(signUp, undefined)
  return (
    <form className="stack g32" action={action}>
      <div className="wrapr" style={{ gap: '32px 48px', alignItems: 'flex-start' }}>
        <div className="stack g20" style={{ flex: '1 1 420px', minWidth: 0 }}>
          <h1 className="t2" style={{ fontSize: 'clamp(30px,3.6vw,44px)' }}>Empieza con MeSientoChill</h1>
          <p className="lead" style={{ color: 'var(--soft)' }}>Elige tu plan. Podrás cambiarlo o darte de baja desde tu cuenta.</p>
          <fieldset className="opts" style={{ gap: 16 }}>
            <label className="card stack g8" style={{ cursor: 'pointer' }}>
              <span className="opt" style={{ minHeight: 0 }}><input type="radio" name="plan" value="videos" /><b style={{ fontSize: 20 }}>Solo vídeos</b><span style={{ marginLeft: 'auto', fontSize: 24, fontWeight: 800 }}>39 €<small style={{ fontSize: 14, fontWeight: 600 }}> /mes</small></span></span>
              <span className="small muted">Biblioteca de clases grabadas y directos grabados.</span>
            </label>
            <label className="card sel stack g8" style={{ cursor: 'pointer', padding: 30 }}>
              <span className="opt" style={{ minHeight: 0 }}><input type="radio" name="plan" value="directo" defaultChecked /><b style={{ fontSize: 20 }}>Directo y vídeos</b><span style={{ marginLeft: 'auto', fontSize: 24, fontWeight: 800 }}>49 €<small style={{ fontSize: 14, fontWeight: 600 }}> /mes</small></span></span>
              <span className="small muted">Todo lo anterior más clases en directo con 8 créditos al mes.</span>
            </label>
          </fieldset>
        </div>
        <div className="card stack g20" style={{ flex: '1 1 380px', minWidth: 0, padding: 36 }}>
          <h2 className="t3">Tus datos</h2>
          <Msg s={state} />
          <div className="field"><label htmlFor="r-n">Nombre</label><input id="r-n" name="nombre" className="in-t" type="text" autoComplete="given-name" placeholder="Tu nombre" required /></div>
          <div className="field"><label htmlFor="r-a">Apellidos</label><input id="r-a" name="apellidos" className="in-t" type="text" autoComplete="family-name" placeholder="Tus apellidos" required /></div>
          <div className="field"><label htmlFor="r-e">Email</label><input id="r-e" name="email" className="in-t" type="email" autoComplete="email" placeholder="tu@email.com" required /></div>
          <div className="field"><label htmlFor="r-t">WhatsApp</label><input id="r-t" name="telefono" className="in-t" type="tel" inputMode="tel" autoComplete="tel" placeholder="600 123 456" /></div>
          <div className="field"><label htmlFor="r-p">Contraseña</label><input id="r-p" name="password" className="in-t" type="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength={8} required /></div>
          <label className="opt" style={{ alignItems: 'flex-start', fontSize: 14 }}><input type="checkbox" name="privacidad" /><span>He leído y acepto la <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'underline' }}>política de privacidad</Link> y los términos del servicio.</span></label>
          <button className="btn b1 full" type="submit" disabled={pending}>{pending ? 'Creando tu cuenta…' : 'Crear mi cuenta'}</button>
          <p className="small muted" style={{ textAlign: 'center' }}>El pago con Stripe se activará en la siguiente fase. ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </form>
  )
}
