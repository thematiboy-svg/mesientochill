import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContext } from '../../../../../lib/data'
import { embed, youtubeId } from '../../../../../lib/youtube'

export const metadata = { title: 'Vídeo' }

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound()
  const ctx = (await getContext())!
  const { data: v } = await ctx.supabase.from('videos').select('id, titulo, disciplina, nivel, minutos, zona, url').eq('id', id).maybeSingle()
  if (!v) notFound()
  const yt = youtubeId(v.url)
  return (
    <>
      <Link href="/app/biblioteca" className="small" style={{ fontWeight: 700 }}>← Volver a la biblioteca</Link>
      <div className="stack g8">
        <span className="eyebrow">{v.disciplina}</span>
        <h1 className="t2">{v.titulo}</h1>
        <p className="muted">{[`${v.minutos} min`, v.nivel ?? 'Todos los niveles', v.zona].filter(Boolean).join(' · ')}</p>
      </div>
      {yt ? (
        <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 24, overflow: 'hidden', background: '#0E2F2B' }}>
          <iframe src={embed(yt)} title={v.titulo} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
        </div>
      ) : (
        <p className="card muted">Este vídeo estará disponible muy pronto.</p>
      )}
    </>
  )
}
