// URL y clave pública de Supabase.
// Acepta los nombres estándar y los que crea la integración Supabase de Vercel
// para este proyecto (con el prefijo «mesientochill_»).
// Se leen con nombres literales para que Next.js pueda incrustarlos en el código.
export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_mesientochill_SUPABASE_URL ||
  ''

export const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_mesientochill_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_mesientochill_SUPABASE_PUBLISHABLE_KEY ||
  ''
