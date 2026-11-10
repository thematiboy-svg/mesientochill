import type { Metadata } from 'next'
import './globals.css'
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from '../lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'MeSientoChill · Pilates, Total Barre y Mindfulness online en 20 minutos', template: '%s · MeSientoChill' },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['pilates online', 'clases de pilates en directo', 'total barre online', 'mindfulness online', 'pausa activa', 'estrés laboral', 'Mónica Muñoz', 'clases de 20 minutos'],
  authors: [{ name: 'Mónica Muñoz' }],
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: SITE_NAME,
    url: './',
    title: 'MeSientoChill · 20 minutos para cambiar tu energía',
    description: SITE_DESCRIPTION,
    images: [{ url: '/monica-estudio.jpg', alt: 'Mónica Muñoz, instructora de MeSientoChill' }],
  },
  twitter: { card: 'summary_large_image', title: 'MeSientoChill · 20 minutos para cambiar tu energía', description: SITE_DESCRIPTION, images: ['/monica-estudio.jpg'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  // Pega aquí el código de Google Search Console (opción «Etiqueta HTML») o ponlo en GOOGLE_SITE_VERIFICATION.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
        <div className="mk">{children}</div>
      </body>
    </html>
  )
}
