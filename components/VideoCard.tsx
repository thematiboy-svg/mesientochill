import Link from 'next/link'
import PlayIcon from './PlayIcon'
import { miniatura, youtubeId } from '../lib/youtube'

export type Video = { id: string; titulo: string; disciplina: string; nivel: string | null; minutos: number; zona?: string | null; url?: string | null }

const TH: Record<string, string> = { Pilates: '', 'Total Barre': 'c', Mindfulness: 's' }

export default function VideoCard({ v }: { v: Video }) {
  const yt = youtubeId(v.url)
  return (
    <Link className="vid" href={`/app/biblioteca/${v.id}`} style={{ textDecoration: 'none', color: 'var(--ink)' }}>
      <div className={'th ' + (TH[v.disciplina] ?? '')}>
        {yt && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={miniatura(yt)} alt="" loading="lazy" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <PlayIcon />
        <span className="chip" style={{ position: 'relative' }}>{yt ? `${v.minutos} min` : 'Próximamente'}</span>
      </div>
      <div className="bd"><span className="eyebrow" style={{ fontSize: 12 }}>{v.disciplina}</span><h3 className="t4" style={{ fontSize: 17 }}>{v.titulo}</h3><p className="small muted">{[v.nivel ?? 'Todos los niveles', v.zona].filter(Boolean).join(' · ')}</p></div>
    </Link>
  )
}
