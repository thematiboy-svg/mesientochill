// Datos comunes para SEO (Google, redes sociales) y para saber qué parte está publicada.

// Dominio principal. Se puede cambiar con NEXT_PUBLIC_SITE_URL (sin barra final).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mesientochill.com').replace(/\/$/, '')
export const SITE_NAME = 'MeSientoChill'
// Otras formas de escribir la marca, para que Google las asocie a la web
export const SITE_ALT_NAMES = ['Me Siento Chill', 'Mesientochill']
// Perfiles oficiales en redes (los mismos que el pie de página)
export const SITE_SOCIAL = [
  'https://www.instagram.com/mesientochill_/',
  'https://www.tiktok.com/@mesientochill',
  'https://www.youtube.com/@MeSientoChill',
  'https://www.facebook.com/share/1A94zMU8V8/',
]
export const SITE_DESCRIPTION =
  'Clases online de Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz. Pausas de 20 minutos, máximo 10 personas, desde casa o la oficina.'

// Mientras solo esté publicada la landing, la web queda oculta (ver middleware.ts).
// Para publicar la web, pon WEB_PUBLICA a true: el sitemap y robots.txt se adaptan solos.
export const WEB_PUBLICA = false

// Datos estructurados (schema.org) que Google usa para entender quién es MeSientoChill.
export function orgJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        sameAs: SITE_SOCIAL,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        email: 'info@mesientochill.com',
        description: SITE_DESCRIPTION,
        founder: { '@id': `${SITE_URL}/#monica` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#monica`,
        name: 'Mónica Muñoz',
        jobTitle: 'Instructora de Pilates, Total Barre y Mindfulness',
        image: `${SITE_URL}/monica-estudio.jpg`,
        worksFor: { '@id': `${SITE_URL}/#org` },
        knowsAbout: ['Pilates', 'Total Barre', 'Mindfulness', 'Gestión del estrés', 'Yoga'],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#web`,
        url: SITE_URL,
        name: SITE_NAME,
        alternateName: SITE_ALT_NAMES,
        inLanguage: 'es-ES',
        publisher: { '@id': `${SITE_URL}/#org` },
      },
    ],
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
}
