'use server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { after } from 'next/server'
import { cap, fmtDiaMes, fmtHora } from '../lib/data'
import { emailReserva, enviarEmail } from '../lib/email'
import { telefonoAvisos, whatsappReserva } from '../lib/whatsapp'
import { asegurarZoom } from '../lib/zoom'
import { avisarListaEspera } from '../lib/avisos'
import { createAdminClient } from '../lib/supabase/admin'
import { createClient } from '../lib/supabase/server'

export type FormState = { error?: string; ok?: string; enlace?: { texto: string; href: string } } | undefined

const NO_CONFIG = 'Falta configurar Supabase (variables NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY, o las de la integración de Vercel).'

// Mensajes de Supabase en español (vienen en inglés)
function errorRegistro(e: { code?: string; status?: number; message: string }) {
  if (e.status === 429 || e.code?.startsWith('over_')) {
    const seg = e.message.match(/after (\d+) seconds?/)?.[1]
    return seg ? `Por seguridad, espera ${seg} segundos antes de volver a intentarlo.` : 'Has hecho varios intentos seguidos. Espera unos minutos y vuelve a intentarlo.'
  }
  if (e.code === 'weak_password') return 'La contraseña es demasiado fácil. Usa al menos 8 caracteres mezclando letras y números.'
  if (e.code === 'email_address_invalid' || e.code === 'validation_failed') return 'Revisa el email: no parece válido.'
  if (e.code === 'user_already_exists' || e.code === 'email_exists') return 'Ya hay una cuenta con este email. Inicia sesión o recupera tu contraseña.'
  return 'No hemos podido crear tu cuenta. Inténtalo de nuevo en unos minutos.'
}

export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  const supabase = await createClient()
  if (!supabase) return { error: NO_CONFIG }
  const email = String(fd.get('email') || '').trim()
  const password = String(fd.get('password') || '')
  const nombre = String(fd.get('nombre') || '').trim()
  const apellidos = String(fd.get('apellidos') || '').trim()
  const telefono = String(fd.get('telefono') || '').trim()
  const plan = fd.get('plan') === 'videos' ? 'videos' : 'directo'
  const avisos_whatsapp = fd.get('avisos_whatsapp') === 'on' && !!telefono
  if (!nombre || !apellidos) return { error: 'Escribe tu nombre y tus apellidos.' }
  if (!email) return { error: 'Escribe tu email.' }
  if (password.length < 8) return { error: 'La contraseña debe tener al menos 8 caracteres.' }
  if (!fd.get('privacidad')) return { error: 'Debes aceptar la política de privacidad y los términos del servicio.' }
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { nombre, apellidos, telefono, plan, avisos_whatsapp } } })
  if (error) return { error: errorRegistro(error) }
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
  if (error && (error.status === 429 || error.code?.startsWith('over_'))) return { error: errorRegistro(error) }
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

// Tras reservar: crea (si hace falta) la reunión de Zoom y envía el email de confirmación con el enlace.
// Se hace después de responder, para que la reserva no espere a Zoom ni al email.
async function avisarReserva(supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>, sessionId: string) {
  const [{ data: u }, { data: s }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('class_sessions').select('id, disciplina, starts_at').eq('id', sessionId).single(),
  ])
  if (!u.user?.email || !s) return
  const [{ data: p }, tel] = await Promise.all([
    supabase.from('profiles').select('nombre').eq('id', u.user.id).maybeSingle(),
    telefonoAvisos(supabase, u.user.id),
  ])
  const h = await headers()
  const web = h.get('origin') || `https://${h.get('host')}`
  const email = u.user.email
  after(async () => {
    const zoom = await asegurarZoom(s)
    const cuando = `${fmtDiaMes(s.starts_at)} a las ${fmtHora(s.starts_at)}`
    const m = emailReserva({ nombre: p?.nombre ?? '', disciplina: s.disciplina, cuando, inicio: s.starts_at, zoom, web })
    await Promise.all([
      enviarEmail({ to: email, subject: `Reserva confirmada: ${s.disciplina}, ${cap(cuando)}`, ...m }),
      tel ? whatsappReserva(tel, { nombre: p?.nombre ?? '', disciplina: s.disciplina, cuando, enlace: zoom || `${web}/app/reservas` }) : null,
    ])
  })
}

export async function reservar(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const session = String(fd.get('session'))
  const { data } = await supabase.rpc('reservar_clase', { p_session: session })
  if (data === 'ok') await avisarReserva(supabase, session)
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
  const reserva = String(fd.get('reserva'))
  const { data: antes } = await supabase.from('reservations').select('session_id, estado').eq('id', reserva).maybeSingle()
  const { data } = await supabase.rpc('cancelar_reserva', { p_reserva: reserva })
  // Se ha liberado una plaza: avisar a la lista de espera después de responder
  if ((data === 'ok' || data === 'tarde') && antes?.estado === 'reservada') {
    const h = await headers()
    const web = h.get('origin') || `https://${h.get('host')}`
    after(() => avisarListaEspera(antes.session_id, web))
  }
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
  const telefono = String(fd.get('telefono') || '').trim() || null
  const cambios = {
      nombre: String(fd.get('nombre') || ''),
      apellidos: String(fd.get('apellidos') || ''),
      telefono,
      nivel: ['nunca', 'algo', 'regular'].includes(nivel) ? nivel : null,
      molestias,
      notas_salud: String(fd.get('notas_salud') || '') || null,
      consentimiento_salud: fd.get('consentimiento') === 'on',
      objetivos: fd.getAll('objetivos').map(String),
      franjas: fd.getAll('franjas').map(String),
  }
  const avisos_whatsapp = fd.get('avisos_whatsapp') === 'on' && !!telefono
  const { error } = await supabase.from('profiles').update({ ...cambios, avisos_whatsapp }).eq('id', u.user.id)
  // Si la base de datos aún no tiene la columna avisos_whatsapp, guarda el resto igualmente
  if (error) await supabase.from('profiles').update(cambios).eq('id', u.user.id)
  revalidatePath('/app', 'layout')
  if (fd.get('avisos_whatsapp') === 'on' && !telefono) redirect('/app/perfil?ok=guardado&error=' + encodeURIComponent('Para recibir los avisos por WhatsApp, escribe tu número.'))
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

// Mónica cancela una clase desde «Gestionar clases». El trigger de la base de datos devuelve los créditos
// y llama a /api/clases/cancelada, que envía los emails y borra la reunión de Zoom.
export async function cancelarClase(fd: FormData) {
  const supabase = await createClient()
  if (!supabase) return
  const { data: esAdmin } = await supabase.rpc('es_admin')
  if (esAdmin !== true) redirect('/app/inicio')
  const admin = createAdminClient()
  if (!admin) redirect('/app/gestion?error=' + encodeURIComponent('Falta la clave de servicio de Supabase.'))
  const id = String(fd.get('session'))
  const { data } = await admin.from('class_sessions').update({ cancelada: true }).eq('id', id).eq('cancelada', false).gt('starts_at', new Date().toISOString()).select('id')
  revalidatePath('/app', 'layout')
  redirect(data && data.length ? '/app/gestion?ok=clase_cancelada' : '/app/gestion?error=' + encodeURIComponent('No se ha podido cancelar: la clase ya estaba cancelada o ya ha empezado.'))
}
