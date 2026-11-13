// Fotos de eventos anteriores (public/eventos). Cuadrícula; las verticales ocupan dos filas. Al pulsar se abre la foto entera.
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
  return (
    <section className="stack g16" aria-label={titulo}>
      <h2 className="t3">{titulo}</h2>
      <div className="galeria">
        {FOTOS.map((f) => (
          <a key={f.src} href={f.src} target="_blank" rel="noopener noreferrer" className={f.h > f.w ? 'alta' : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt={f.alt} width={f.w} height={f.h} loading="lazy" decoding="async" />
          </a>
        ))}
      </div>
    </section>
  )
}
