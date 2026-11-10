'use client'
import Link from 'next/link'
import { useActionState, useState } from 'react'
import { nuevaContrasena, recuperarContrasena, signIn, signUp, type FormState } from '../app/actions'

// Campo de contraseña con botón para mostrarla u ocultarla mientras se escribe
function Clave(props: React.InputHTMLAttributes<HTMLInputElement>) {
  const [ver, setVer] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'block' }}>
      <input {...props} className="in-t" type={ver ? 'text' : 'password'} style={{ paddingRight: 56 }} />
      <button type="button" onClick={() => setVer((v) => !v)} aria-label={ver ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={ver} aria-controls={props.id}
        style={{ position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)', width: 44, height: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, borderRadius: 10, color: 'var(--teal)', cursor: 'pointer' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />
          {ver && <path d="M3 3l18 18" />}
        </svg>
      </button>
    </span>
  )
}

function Msg({ s }: { s: FormState }) {
  if (!s) return null
  const enlace = s.enlace && <> <Link href={s.enlace.href} style={{ fontWeight: 700, color: 'inherit', textDecoration: 'underline' }}>{s.enlace.texto}</Link></>
  if (s.error) return <p className="alert err" role="alert">{s.error}{enlace}</p>
  if (s.ok) return <p className="alert ok" role="status">{s.ok}{enlace}</p>
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
      <div className="field"><label htmlFor="l-p">Contraseña</label><Clave id="l-p" name="password" autoComplete="current-password" placeholder="Tu contraseña" required /></div>
      <Link href="/recuperar" className="small" style={{ fontWeight: 700 }}>¿Has olvidado tu contraseña?</Link>
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
          <div className="field"><label htmlFor="r-t">WhatsApp</label><input id="r-t" name="telefono" className="in-t" type="tel" inputMode="tel" autoComplete="tel" placeholder="+34 600 000 000" /></div>
          <div className="field"><label htmlFor="r-p">Contraseña</label><Clave id="r-p" name="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength={8} required /></div>
          <label className="opt" style={{ alignItems: 'flex-start', fontSize: 14 }}><input type="checkbox" name="privacidad" /><span>He leído y acepto la <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'underline' }}>política de privacidad</Link> y los términos del servicio.</span></label>
          <button className="btn b1 full" type="submit" disabled={pending}>{pending ? 'Creando tu cuenta…' : 'Crear mi cuenta'}</button>
          <p className="small muted" style={{ textAlign: 'center' }}>El pago con Stripe se activará en la siguiente fase. ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link></p>
        </div>
      </div>
    </form>
  )
}

export function RecuperarForm({ email = '' }: { email?: string }) {
  const [state, action, pending] = useActionState(recuperarContrasena, undefined)
  return (
    <form className="card stack g20" style={{ padding: 40 }} action={action}>
      <div className="stack g8">
        <h1 className="t2" style={{ fontSize: 34 }}>Recuperar contraseña</h1>
        <p className="muted" style={{ fontSize: 17 }}>Escribe tu email y te enviamos un enlace para crear una contraseña nueva.</p>
      </div>
      <Msg s={state} />
      <div className="field"><label htmlFor="rc-e">Email</label><input id="rc-e" name="email" className="in-t" type="email" autoComplete="email" placeholder="tu@email.com" defaultValue={email} required /></div>
      <button className="btn b1 full" type="submit" disabled={pending}>{pending ? 'Enviando…' : 'Enviar enlace'}</button>
      <hr className="hr" />
      <p className="small muted" style={{ textAlign: 'center' }}>¿Ya la recuerdas? <Link href="/login" style={{ fontWeight: 700 }}>Iniciar sesión</Link></p>
    </form>
  )
}

export function NuevaContrasenaForm({ error }: { error?: boolean }) {
  const [state, action, pending] = useActionState(nuevaContrasena, undefined)
  return (
    <form className="card stack g20" style={{ padding: 40 }} action={action}>
      <div className="stack g8">
        <h1 className="t2" style={{ fontSize: 34 }}>Nueva contraseña</h1>
        <p className="muted" style={{ fontSize: 17 }}>Elige una contraseña nueva para entrar en MeSientoChill.</p>
      </div>
      {error && !state && <p className="alert err" role="alert">El enlace ha caducado o ya se ha usado. <Link href="/recuperar" style={{ fontWeight: 700, color: 'inherit', textDecoration: 'underline' }}>Pedir un enlace nuevo</Link></p>}
      <Msg s={state} />
      <div className="field"><label htmlFor="nc-p">Contraseña nueva</label><Clave id="nc-p" name="password" autoComplete="new-password" placeholder="Mínimo 8 caracteres" minLength={8} required /></div>
      <div className="field"><label htmlFor="nc-p2">Repite la contraseña</label><Clave id="nc-p2" name="password2" autoComplete="new-password" placeholder="La misma contraseña" minLength={8} required /></div>
      <button className="btn b1 full" type="submit" disabled={pending}>{pending ? 'Guardando…' : 'Guardar y entrar'}</button>
    </form>
  )
}
