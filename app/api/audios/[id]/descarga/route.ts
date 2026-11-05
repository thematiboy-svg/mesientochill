import { createClient } from '../../../../../lib/supabase/server'
import { createAdminClient } from '../../../../../lib/supabase/admin'

// Descarga de un audio comprado: comprueba la compra y redirige a un enlace temporal de Supabase Storage.
export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const admin = createAdminClient()
  if (!supabase || !admin) return new Response('No disponible.', { status: 503 })
  const { data: u } = await supabase.auth.getUser()
  if (!u.user) return new Response('Inicia sesión para descargar.', { status: 401 })

  // Con la sesión de la usuaria: la seguridad por filas solo deja ver sus propias compras.
  const { data: compra } = await supabase.from('compras').select('id').eq('audio_id', id).eq('estado', 'pagada').limit(1).maybeSingle()
  if (!compra) return new Response('No has comprado este audio.', { status: 403 })

  const { data: audio } = await admin.from('audios').select('titulo, archivo').eq('id', id).maybeSingle()
  if (!audio) return new Response('Audio no encontrado.', { status: 404 })
  const ext = audio.archivo.includes('.') ? audio.archivo.slice(audio.archivo.lastIndexOf('.')) : ''
  const { data, error } = await admin.storage
    .from('audios')
    .createSignedUrl(audio.archivo, 60, { download: `${audio.titulo}${ext}` })
  if (error || !data) {
    console.error('[audios] Enlace de descarga', error)
    return new Response('No hemos podido preparar la descarga.', { status: 500 })
  }
  return Response.redirect(data.signedUrl, 303)
}
