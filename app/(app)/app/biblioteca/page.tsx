import Link from 'next/link'
import VideoCard, { type Video } from '../../../../components/VideoCard'
import { getContext } from '../../../../lib/data'

export const metadata = { title: 'Biblioteca' }

const DISCIPLINAS = ['Pilates', 'Total Barre', 'Mindfulness']

export default async function Page({ searchParams }: { searchParams: Promise<{ d?: string }> }) {
  const sp = await searchParams
  const ctx = (await getContext())!
  const filtro = DISCIPLINAS.includes(sp.d ?? '') ? sp.d! : null
  let q = ctx.supabase.from('videos').select('id, titulo, disciplina, nivel, minutos, zona, url').order('disciplina').order('titulo')
  if (filtro) q = q.eq('disciplina', filtro)
  const { data } = await q
  const videos = (data ?? []) as Video[]
  return (
    <>
      <div className="stack g8"><h1 className="t2">Biblioteca de vídeos</h1><p className="lead">Clases grabadas y directos grabados para practicar cuando quieras.</p></div>
      <nav className="wrapr g8" aria-label="Filtrar por disciplina">
        {[null, ...DISCIPLINAS].map((d) => (
          <Link key={d ?? 'todo'} href={d ? `/app/biblioteca?d=${encodeURIComponent(d)}` : '/app/biblioteca'} className={'chip' + (d === filtro ? ' on' : '')} aria-current={d === filtro ? 'page' : undefined} style={{ textDecoration: 'none' }}>
            {d ?? 'Todo'}
          </Link>
        ))}
      </nav>
      {videos.length > 0 ? (
        <div className="grid c4">{videos.map((v) => <VideoCard key={v.id} v={v} />)}</div>
      ) : (
        <p className="card muted">Todavía no hay vídeos{filtro ? ` de ${filtro}` : ''}. Muy pronto encontrarás aquí las clases.</p>
      )}
    </>
  )
}
