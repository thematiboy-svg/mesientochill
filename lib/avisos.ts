import { cap, fmtDiaMes, fmtHora } from './data'
import { emailCancelacion, emailPlazaLibre, enviarEmail } from './email'
import { createAdminClient } from './supabase/admin'
import { borrarZoom } from './zoom'
import { telefonoAvisos, whatsappCancelacion, whatsappPlazaLibre } from './whatsapp'

type Admin = NonNullable<ReturnType<typeof createAdminClient>>
const cuando = (iso: string) => `${fmtDiaMes(iso)} a las ${fmtHora(iso)}`

async function destinatario(admin: Admin, userId: string) {
  const [{ data: u }, { data: p }, tel] = await Promise.all([
    admin.auth.admin.getUserById(userId),
    admin.from('profiles').select('nombre').eq('id', userId).maybeSingle(),
    telefonoAvisos(admin, userId),
  ])
  return u.user?.email ? { email: u.user.email, nombre: (p?.nombre as string | undefined) ?? '', tel } : null
}

/** Mónica ha cancelado una clase: email a quien tenía plaza o estaba en lista de espera, se vacía la lista y se borra la reunión de Zoom. Solo una vez por clase. */
export async function avisarCancelacion(sessionId: string, web: string) {
  const admin = createAdminClient()
  if (!admin) return { ok: false, motivo: 'sin clave de servicio' }
  // Marca la clase como avisada; si ya lo estaba (o no está cancelada), no hace nada
  const { data: s } = await admin
    .from('class_sessions')
    .update({ avisada_at: new Date().toISOString() })
    .eq('id', sessionId)
    .eq('cancelada', true)
    .is('avisada_at', null)
    .select('id, disciplina, starts_at')
    .maybeSingle()
  if (!s) return { ok: false, motivo: 'no cancelada o ya avisada' }
  await borrarZoom(s.id)
  if (new Date(s.starts_at).getTime() < Date.now()) return { ok: true, enviados: 0 }
  const { data: rs } = await admin.from('reservations').select('id, user_id, estado').eq('session_id', s.id).in('estado', ['cancelada_monica', 'lista_espera'])
  let enviados = 0
  for (const r of rs ?? []) {
    const d = await destinatario(admin, r.user_id)
    if (!d) continue
    const m = emailCancelacion({ nombre: d.nombre, disciplina: s.disciplina, cuando: cuando(s.starts_at), enLista: r.estado === 'lista_espera', web })
    if (await enviarEmail({ to: d.email, subject: `Clase cancelada: ${s.disciplina}, ${cap(cuando(s.starts_at))}`, ...m })) enviados++
    if (d.tel) await whatsappCancelacion(d.tel, { nombre: d.nombre, disciplina: s.disciplina, cuando: cuando(s.starts_at), enlace: `${web}/app/directos` })
  }
  await admin.from('reservations').delete().eq('session_id', s.id).eq('estado', 'lista_espera')
  return { ok: true, enviados }
}

/** Se ha liberado una plaza: email a las tres primeras personas de la lista de espera (si la clase sigue con hueco). */
export async function avisarListaEspera(sessionId: string, web: string) {
  const admin = createAdminClient()
  if (!admin) return
  const { data: s } = await admin.from('class_sessions').select('id, disciplina, starts_at, capacidad, cancelada').eq('id', sessionId).maybeSingle()
  if (!s || s.cancelada || new Date(s.starts_at).getTime() <= Date.now()) return
  const { count } = await admin.from('reservations').select('id', { count: 'exact', head: true }).eq('session_id', s.id).eq('estado', 'reservada')
  if ((count ?? 0) >= s.capacidad) return
  const { data: lista } = await admin.from('reservations').select('user_id').eq('session_id', s.id).eq('estado', 'lista_espera').order('created_at').limit(3)
  for (const r of lista ?? []) {
    const d = await destinatario(admin, r.user_id)
    if (!d) continue
    const m = emailPlazaLibre({ nombre: d.nombre, disciplina: s.disciplina, cuando: cuando(s.starts_at), sessionId: s.id, web })
    await Promise.all([
      enviarEmail({ to: d.email, subject: `Plaza libre: ${s.disciplina}, ${cap(cuando(s.starts_at))}`, ...m }),
      d.tel ? whatsappPlazaLibre(d.tel, { nombre: d.nombre, disciplina: s.disciplina, cuando: cuando(s.starts_at), enlace: `${web}/app/directos?sel=${s.id}` }) : null,
    ])
  }
}
