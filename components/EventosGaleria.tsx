'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// Fotos de eventos anteriores (public/eventos). Cuadrícula; las verticales ocupan dos filas. Al pulsar se abre en una lightbox con navegación (flechas, teclado y deslizar en móvil).
const FOTOS: { src: string; w: number; h: number; alt: string }[] = [
  { src: '/eventos/evento-01.jpg', w: 666, h: 1185, alt: 'Mónica guía una clase de Pilates con piernas elevadas en una sala luminosa con velas y plantas' },
  { src: '/eventos/evento-02.jpg', w: 788, h: 575, alt: 'Grupo sentado en esterillas escuchando en una sala con plantas' },
  { src: '/eventos/evento-03.jpg', w: 790, h: 368, alt: 'Grupo sonriente con pelotas de playa tras una clase' },
  { src: '/eventos/evento-04.jpg', w: 789, h: 566, alt: 'Grupo haciendo un ejercicio de Total Barre en fila en un estudio con barra' },
  { src: '/eventos/evento-05.jpg', w: 792, h: 480, alt: 'Relajación final en una gran sala de madera con techo de cañizo' },
  { src: '/eventos/evento-06.jpg', w: 788, h: 581, alt: 'Relajación tumbados en esterillas en un parque entre árboles' },
  { src: '/eventos/evento-07.jpg', w: 632, h: 970, alt: 'Clase al aire libre sobre césped con equilibrio y pierna extendida' },
  { src: '/eventos/evento-08.jpg', w: 1400, h: 1047, alt: 'Relajación sobre toallas en el césped a la sombra de los árboles' },
  { src: '/eventos/evento-09.jpg', w: 1400, h: 873, alt: 'Relajación en círculo en un pabellón amplio' },
  { src: '/eventos/evento-10.jpg', w: 790, h: 565, alt: 'Grupo con los brazos en alto en una clase en la playa' },
]

export default function EventosGaleria({ titulo = 'Fotos de eventos anteriores' }: { titulo?: string }) {
  const [abierta, setAbierta] = useState<number | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)
  const origen = useRef<HTMLElement | null>(null)
  const toque = useRef<number | null>(null)
  const n = FOTOS.length

  const ir = useCallback((d: number) => setAbierta((i) => (i === null ? i : (i + d + n) % n)), [n])
  const cerrar = useCallback(() => setAbierta(null), [])

  useEffect(() => {
    const dlg = dialogo.current
    if (!dlg) return
    if (abierta !== null && !dlg.open) dlg.showModal()
    if (abierta === null && dlg.open) {
      dlg.close()
      origen.current?.focus()
    }
  }, [abierta])

  useEffect(() => {
    if (abierta === null) return
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') ir(1)
      else if (e.key === 'ArrowLeft') ir(-1)
    }
    window.addEventListener('keydown', tecla)
    // Precarga las fotos vecinas
    for (const d of [1, -1]) new Image().src = FOTOS[(abierta + d + n) % n].src
    return () => window.removeEventListener('keydown', tecla)
  }, [abierta, ir, n])

  const f = abierta === null ? null : FOTOS[abierta]
  return (
    <section className="stack g16" aria-label={titulo}>
      <h2 className="t3">{titulo}</h2>
      <div className="galeria">
        {FOTOS.map((foto, i) => (
          <a
            key={foto.src}
            href={foto.src}
            className={foto.h > foto.w ? 'alta' : undefined}
            aria-label={`Ampliar foto ${i + 1} de ${n}: ${foto.alt}`}
            onClick={(e) => { e.preventDefault(); origen.current = e.currentTarget; setAbierta(i) }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={foto.src} alt={foto.alt} width={foto.w} height={foto.h} loading="lazy" decoding="async" />
          </a>
        ))}
      </div>
      <dialog
        ref={dialogo}
        className="lightbox"
        aria-label="Fotos de eventos"
        onClose={cerrar}
        onClick={(e) => { if (e.target === e.currentTarget) cerrar() }}
        onTouchStart={(e) => { toque.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (toque.current === null) return
          const dx = e.changedTouches[0].clientX - toque.current
          toque.current = null
          if (Math.abs(dx) > 50) ir(dx < 0 ? 1 : -1)
        }}
      >
        {f && (
          <>
            <button type="button" className="lb-cerrar" onClick={cerrar} aria-label="Cerrar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <button type="button" className="lb-nav lb-prev" onClick={() => ir(-1)} aria-label="Foto anterior">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg>
            </button>
            <figure className="lb-fig">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={f.src} src={f.src} alt={f.alt} width={f.w} height={f.h} />
              <figcaption><span aria-live="polite">{abierta! + 1} / {n}</span> · {f.alt}</figcaption>
            </figure>
            <button type="button" className="lb-nav lb-next" onClick={() => ir(1)} aria-label="Foto siguiente">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
            </button>
          </>
        )}
      </dialog>
    </section>
  )
}
