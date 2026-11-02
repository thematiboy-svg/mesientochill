import { createClient } from './supabase/server'

export type Profile = {
  id: string
  nombre: string
  apellidos: string
  telefono: string | null
  plan: 'videos' | 'directo'
  suscrita_desde: string
  nivel: 'nunca' | 'algo' | 'regular' | null
  molestias: string[]
  notas_salud: string | null
  consentimiento_salud: boolean
  objetivos: string[]
  franjas: string[]
}
export type Session = { id: string; disciplina: 'Pilates' | 'Total Barre' | 'Mindfulness'; starts_at: string; capacidad: number; cancelada: boolean }
export type Reservation = { id: string; session_id: string; estado: string; class_sessions: Session }
export type Credits = { disponibles: number; usados: number; perdidos: number; caducan: string }

export const TZ = 'Europe/Madrid'
export const fmtDia = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', timeZone: TZ }).format(new Date(iso)).replace('.', '')
export const fmtDiaMes = (iso: string) =>
  new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short', timeZone: TZ }).format(new Date(iso)).replace(/\./g, '')
export const fmtHora = (iso: string) => new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(new Date(iso))
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
export const franja = (iso: string) => {
  const h = Number(new Intl.DateTimeFormat('es-ES', { hour: '2-digit', hour12: false, timeZone: TZ }).format(new Date(iso)))
  return h < 13 ? 'Hora del café' : h < 17 ? 'Hora de la comida' : 'Después del trabajo'
}

export async function getContext() {
  const supabase = await createClient()
  if (!supabase) return null
  const { data } = await supabase.auth.getUser()
  if (!data.user) return null
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
  const { data: cr } = await supabase.rpc('creditos_mes', { p_user: data.user.id })
  const credits: Credits = (Array.isArray(cr) ? cr[0] : cr) ?? { disponibles: 8, usados: 0, perdidos: 0, caducan: '' }
  return { supabase, user: data.user, profile: profile as Profile | null, credits }
}
