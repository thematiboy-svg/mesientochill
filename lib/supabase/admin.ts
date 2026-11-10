import { createClient as createSupabase } from '@supabase/supabase-js'
import { supabaseUrl } from './env'

// Cliente con la clave de servicio: salta RLS. Solo en el servidor (nunca en componentes de cliente).
export function createAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.mesientochill_SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !key) return null
  return createSupabase(supabaseUrl, key, { auth: { persistSession: false, autoRefreshToken: false } })
}
