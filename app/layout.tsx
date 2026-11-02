import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'MeSientoChill · 20 minutos para cambiar tu energía', template: '%s · MeSientoChill' },
  description: 'Pilates, Total Barre y Mindfulness en directo con Mónica Muñoz. Una pausa de 20 minutos para volver al trabajo con la cabeza clara.',
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
