import type { MetadataRoute } from 'next'
import { SITE_URL, WEB_PUBLICA } from '../lib/site'

// Solo páginas públicas que queremos en Google (sin login, registro, zona privada ni páginas legales).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const url = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${SITE_URL}${path}`, lastModified: now, changeFrequency, priority,
  })
  if (!WEB_PUBLICA) {
    return [
      url('/', 1, 'weekly'),
      url('/landing/contacto', 0.5),
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
  ]
}
