import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { supabaseUrl } from './env'

// Cliente con la clave service_role: se salta la seguridad por filas.
// Solo para el servidor (webhook de Stripe y datos de facturación). Nunca en el navegador.
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.mesientochill_SUPABASE_SERVICE_ROLE_KEY ||
  process.env.mesientochill_SUPABASE_SECRET_KEY ||
  ''

export function createAdminClient() {
  if (!supabaseUrl || !serviceKey) return null
  return createSupabaseClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
}
