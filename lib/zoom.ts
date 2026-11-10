import { createAdminClient } from './supabase/admin'

// Zoom con una app «Server-to-Server OAuth». Variables (Vercel, Sensitive):
// ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET y, opcional, ZOOM_USER (email de la cuenta de Mónica; por defecto la dueña de la app).
// Permisos de la app: meeting:write:meeting:admin y meeting:delete:meeting:admin.

let token: { valor: string; caduca: number } | null = null

export const zoomConfigurado = () => !!(process.env.ZOOM_ACCOUNT_ID && process.env.ZOOM_CLIENT_ID && process.env.ZOOM_CLIENT_SECRET)

async function tokenZoom() {
  if (token && token.caduca > Date.now() + 60_000) return token.valor
  const basic = Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`).toString('base64')
  const r = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(process.env.ZOOM_ACCOUNT_ID!)}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}` },
    cache: 'no-store',
  })
  if (!r.ok) throw new Error(`Zoom token ${r.status}: ${await r.text()}`)
  const j = (await r.json()) as { access_token: string; expires_in: number }
  token = { valor: j.access_token, caduca: Date.now() + j.expires_in * 1000 }
  return token.valor
}

async function zoom(path: string, init: RequestInit = {}) {
  const r = await fetch(`https://api.zoom.us/v2${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${await tokenZoom()}`, 'Content-Type': 'application/json', ...init.headers },
    cache: 'no-store',
  })
  if (!r.ok && r.status !== 404) throw new Error(`Zoom ${path} ${r.status}: ${await r.text()}`)
  return r.status === 204 ? null : r.json().catch(() => null)
}

/** Devuelve el enlace de Zoom de la clase; si aún no existe, crea la reunión en Zoom y lo guarda. null si Zoom no está configurado o falla. */
export async function asegurarZoom(s: { id: string; disciplina: string; starts_at: string }): Promise<string | null> {
  const admin = createAdminClient()
  if (!admin || !zoomConfigurado()) return null
  try {
    const { data: hay } = await admin.from('class_zoom').select('join_url').eq('session_id', s.id).maybeSingle()
    if (hay) return hay.join_url
    const user = encodeURIComponent(process.env.ZOOM_USER || 'me')
    const m = (await zoom(`/users/${user}/meetings`, {
      method: 'POST',
      body: JSON.stringify({
        topic: `MeSientoChill · ${s.disciplina} con Mónica`,
        type: 2,
        start_time: new Date(s.starts_at).toISOString().replace(/\.\d{3}Z$/, 'Z'),
        duration: 20,
        timezone: 'Europe/Madrid',
        settings: { join_before_host: false, waiting_room: false, mute_upon_entry: true, host_video: true, approval_type: 2 },
      }),
    })) as { id: number; join_url: string }
    const { error } = await admin.from('class_zoom').insert({ session_id: s.id, meeting_id: String(m.id), join_url: m.join_url })
    if (error) {
      // Otra reserva creó la reunión a la vez: usamos la suya y borramos la nuestra
      await zoom(`/meetings/${m.id}`, { method: 'DELETE' }).catch(() => null)
      const { data: otra } = await admin.from('class_zoom').select('join_url').eq('session_id', s.id).maybeSingle()
      return otra?.join_url ?? null
    }
    return m.join_url
  } catch (e) {
    console.error('Zoom:', e)
    return null
  }
}

/** Enlaces de Zoom de las clases reservadas por la persona (RLS). Crea los que falten. Devuelve { session_id: join_url }. */
export async function enlacesZoom(
  supabase: { from: (t: string) => any }, // eslint-disable-line @typescript-eslint/no-explicit-any
  sesiones: { id: string; disciplina: string; starts_at: string }[],
): Promise<Record<string, string>> {
  if (sesiones.length === 0) return {}
  const { data } = await supabase.from('class_zoom').select('session_id, join_url').in('session_id', sesiones.map((s) => s.id))
  const mapa: Record<string, string> = Object.fromEntries(((data ?? []) as { session_id: string; join_url: string }[]).map((z) => [z.session_id, z.join_url]))
  for (const s of sesiones) {
    if (!mapa[s.id]) {
      const url = await asegurarZoom(s)
      if (url) mapa[s.id] = url
    }
  }
  return mapa
}

/** Borra la reunión de Zoom de una clase (si la hay) y su enlace guardado. */
export async function borrarZoom(sessionId: string) {
  const admin = createAdminClient()
  if (!admin) return
  const { data } = await admin.from('class_zoom').select('meeting_id').eq('session_id', sessionId).maybeSingle()
  if (!data) return
  try {
    if (zoomConfigurado()) await zoom(`/meetings/${data.meeting_id}`, { method: 'DELETE' })
    await admin.from('class_zoom').delete().eq('session_id', sessionId)
  } catch (e) {
    console.error('Zoom (borrar):', e)
  }
}
