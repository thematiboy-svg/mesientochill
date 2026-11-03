import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseUrl, supabaseAnonKey } from './env'

export const hasSupabase = () => !!(supabaseUrl && supabaseAnonKey)

/** Cliente de Supabase para servidor. Devuelve null si faltan las variables de entorno. */
export async function createClient() {
  if (!hasSupabase()) return null
  const cookieStore = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Llamado desde un Server Component: el middleware refresca la sesión.
        }
      },
    },
  })
}
