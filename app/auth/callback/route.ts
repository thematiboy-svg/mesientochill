import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '../../../lib/supabase/server'

// Enlaces de los emails de Supabase (p. ej. recuperar contraseña): canjea el código por una sesión y sigue a `next`.
export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const code = url.searchParams.get('code')
  const pedido = url.searchParams.get('next') || '/app/inicio'
  const next = pedido.startsWith('/') && !pedido.startsWith('//') ? pedido : '/app/inicio'
  const supabase = await createClient()
  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) return NextResponse.redirect(new URL(next, url.origin))
  }
  const destino = next === '/nueva-contrasena' ? '/nueva-contrasena?error=enlace' : '/login'
  return NextResponse.redirect(new URL(destino, url.origin))
}
