'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { createClient } from '../lib/supabase/server'

export type FormState = { error?: string; ok?: string; enlace?: { texto: string; href: string } } | undefined

const NO_CONFIG = 'Falta configurar Supabase (variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY, o las de la integración de Vercel).'

export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const email = String(fd.get('email') || '').trim()
  const password = String(fd.get('password') || '')
  const nombre = String(fd.get('nombre') || '').trim()
  const apellidos = String(fd.get('apellidos') || '').trim()
  const telefono = String(fd.get('telefono') || '').trim()
  const plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  if (!nombre || !apellidos) return { error: 'Escribe tu nombre y tus apellidos.' }
  if (!email) return { error: 'Escribe tu email.' }
  if (password.length < 8) return { error: 'La contraseña debe tener al menos 8 caracteres.' }
  if (!fd.get('privacidad')) return { error: 'Debes aceptar la política de privacidad y los términos del servicio.' }
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nombre, apellidos, telefono, plan } } })
  if (error) return { error: error.message }
  // Si el email ya tiene cuenta, Supabase responde sin error pero no envía ningún email (identities vacío)
  if (data.user && !data.session && data.user.identities?.length === 0) return { error: 'Ya hay una cuenta con este email. Inicia sesión con tu contraseña o, si no la recuerdas, crea una nueva.', enlace: { texto: 'Recuperar mi contraseña', href: `/recuperar?email=${encodeURIComponent(email)}` } }
  if (!data.session) return { ok: 'Te hemos enviado un email para confirmar tu cuenta. Después podrás iniciar sesión.' }
  redirect('/app/perfil?bienvenida=1')
}

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const { error } = await supabase.auth.signInWithPassword({
    email: String(fd.get('email') || '').trim(),
    password: String(fd.get('password') || ''),
  })
  if (error) return { error: 'Email o contraseña incorrectos.' }
  redirect('/app/inicio')
}

export async function recuperarContrasena(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const email = String(fd.get('email') || '').trim()
  if (!email) return { error: 'Escribe tu email.' }
  const h = await headers()
  const origen = h.get('origin') || `https://${h.get('host')}`
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origen}/auth/callback?next=/nueva-contrasena` })
  if (error && error.status === 429) return { error: 'Has pedido varios enlaces seguidos. Espera unos minutos y vuelve a intentarlo.' }
  // Mismo mensaje exista o no la cuenta
  return { ok: 'Si hay una cuenta con ese email, te hemos enviado un enlace para crear una contraseña nueva. Revisa también la carpeta de spam. El enlace funciona en este mismo navegador.' }
}

export async function nuevaContrasena(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const password = String(fd.get('password') || '')
  if (password.length < 8) return { error: 'La contraseña debe tener al menos 8 caracteres.' }
  if (password !== String(fd.get('password2') || '')) return { error: 'Las dos contraseñas no coinciden.' }
  const { data } = await supabase.auth.getUser()
  if (!data.user) return { error: 'El enlace ha caducado o se abrió en otro navegador. Pide uno nuevo.', enlace: { texto: 'Pedir un enlace nuevo', href: '/recuperar' } }
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.code === 'same_password' ? 'La contraseña nueva tiene que ser distinta de la anterior.' : 'No hemos podido guardar la contraseña. Inténtalo de nuevo.' }
  redirect('/app/inicio')
}

export async function signOut() {
  const supabase = await createClient()
  if (supabase) await supabase.auth.signOut()
  redirect('/')
}

export async function reservar(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const session = String(fd.get('session'))
  const { data } = await supabase.rpc('reservar_clase', { p_session: session })
  const back = String(fd.get('back') || '/app/directos')
  revalidatePath('/app', 'layout')
  redirect(`${back}${back.includes('?') ? '&' : '?'}${data === 'ok' ? 'ok=reservada' : 'error=' + encodeURIComponent(String(data))}&sel=${session}`)
}

export async function unirseLista(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const session = String(fd.get('session'))
  const { data } = await supabase.rpc('unirse_lista', { p_session: session })
  const back = String(fd.get('back') || '/app/directos')
  revalidatePath('/app', 'layout')
  redirect(`${back}${back.includes('?') ? '&' : '?'}${data === 'ok' ? 'ok=lista' : 'error=' + encodeURIComponent(String(data))}&sel=${session}`)
}

export async function cancelarReserva(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data } = await supabase.rpc('cancelar_reserva', { p_reserva: String(fd.get('reserva')) })
  revalidatePath('/app', 'layout')
  redirect(`/app/reservas?${data === 'ok' ? 'ok=cancelada' : data === 'tarde' ? 'ok=cancelada_tarde' : 'error=' + encodeURIComponent(String(data))}`)
}

export async function guardarPerfil(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const nivel = String(fd.get('nivel') || '')
  const molestias = fd.getAll('molestias').map(String).filter((m) => m !== 'Ninguna')
  const tieneSalud = molestias.length > 0 || !!String(fd.get('notas_salud') || '').trim()
  if (tieneSalud && fd.get('consentimiento') !== 'on') {
    redirect('/app/perfil?error=' + encodeURIComponent('Para guardar tus datos de salud necesitamos tu consentimiento explícito.'))
  }
  await supabase
    .from('profiles')
    .update({
      nombre: String(fd.get('nombre') || ''),
      apellidos: String(fd.get('apellidos') || ''),
      telefono: String(fd.get('telefono') || '') || null,
      nivel: ['nunca', 'algo', 'regular'].includes(nivel) ? nivel : null,
      molestias,
      notas_salud: String(fd.get('notas_salud') || '') || null,
      consentimiento_salud: fd.get('consentimiento') === 'on',
      objetivos: fd.getAll('objetivos').map(String),
      franjas: fd.getAll('franjas').map(String),
    })
    .eq('id', u.user.id)
  revalidatePath('/app', 'layout')
  redirect('/app/perfil?ok=guardado')
}

export async function cambiarPlan(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) redirect('/login')
  const plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  await supabase.from('profiles').update({ plan }).eq('id', u.user.id)
  revalidatePath('/app', 'layout')
  redirect('/app/suscripcion?ok=plan')
}
