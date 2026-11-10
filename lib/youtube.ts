/** Saca el id de un vídeo de YouTube de un enlace (watch, youtu.be, embed, shorts, live) o del id suelto. */
export function youtubeId(url?: string | null): string | null {
  if (!url) return null
  const s = url.trim()
  if (/^[\w-]{11}$/.test(s)) return s
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:embed|shorts|live)\/)([\w-]{11})/)
  return m ? m[1] : null
}

export const miniatura = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`

// youtube-nocookie: modo de privacidad mejorada; rel=0 sugiere vídeos del mismo canal al terminar
export const embed = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
