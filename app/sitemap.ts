import type { MetadataRoute } from 'next'
import { SITE_URL, WEB_PUBLICA } from '../lib/site'

// Solo páginas públicas que queremos en Google (sin login, registro ni zona privada).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority,
  })
  if (!WEB_PUBLICA) {
    return [
      url('/landing', 1, 'weekly'),
      url('/landing/contacto', 0.5),
      url('/landing/aviso-legal', 0.1, 'yearly'),
      url('/landing/privacidad', 0.1, 'yearly'),
      url('/landing/cookies', 0.1, 'yearly'),
      url('/landing/accesibilidad', 0.1, 'yearly'),
    ]
  }
  return [
    url('/', 1, 'weekly'),
    url('/clases', 0.9, 'weekly'),
    url('/metodo', 0.8),
    url('/monica', 0.8),
    url('/precios', 0.9),
    url('/eventos', 0.7, 'weekly'),
    url('/ayuda', 0.6),
    url('/contacto', 0.5),
    url('/aviso-legal', 0.1, 'yearly'),
    url('/privacidad', 0.1, 'yearly'),
    url('/cookies', 0.1, 'yearly'),
    url('/accesibilidad', 0.1, 'yearly'),
  ]
}
