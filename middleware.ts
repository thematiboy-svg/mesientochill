import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseUrl, supabaseAnonKey } from './lib/supabase/env'
import { WEB_PUBLICA } from './lib/site'

// Mientras solo esté publicada la landing, la web queda oculta:
// - Quien entra en cualquier página de la web va a /landing.
// - /web1 (o /web1/lo-que-sea) guarda un permiso en el navegador y abre la web; dura 90 días.
// - /web1/salir quita el permiso.
// Para publicar la web, pon WEB_PUBLICA a true en lib/site.ts.
const PERMISO_WEB = 'msc_web'

function landingOWeb(request: NextRequest): NextResponse | null {
  const path = request.nextUrl.pathname
  if (path === '/web1/salir') {
    const r = NextResponse.redirect(new URL('/landing', request.url))
    r.cookies.delete(PERMISO_WEB)
    return r
  }
  if (path === '/web1' || path.startsWith('/web1/')) {
    const destino = path.slice('/web1'.length) || '/'
    const r = NextResponse.redirect(new URL(destino + request.nextUrl.search, request.url))
    r.cookies.set(PERMISO_WEB, '1', { path: '/', maxAge: 60 * 60 * 24 * 90, httpOnly: true, sameSite: 'lax', secure: request.nextUrl.protocol === 'https:' })
    return r
  }
  if (WEB_PUBLICA) return null
  // Siempre abiertos: la landing, las API de sus formularios y los archivos (iconos, imágenes…)
  const abierto = path === '/landing' || path.startsWith('/landing/') || path.startsWith('/api/') || /\.[a-z0-9]+$/i.test(path)
  if (abierto || request.cookies.get(PERMISO_WEB)) return null
  return NextResponse.redirect(new URL('/landing', request.url))
}

export async function middleware(request: NextRequest) {
  const desvio = landingOWeb(request)
  if (desvio) return desvio
  const url = supabaseUrl
  const key = supabaseAnonKey
  let response = NextResponse.next({ request })
  if (!url || !key) {
    if (request.nextUrl.pathname.startsWith('/app')) {
      return NextResponse.redirect(new URL('/login?error=config', request.url))
    }
    return response
  }
  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  const { data } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  if (!data.user && path.startsWith('/app')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (data.user && (path === '/login' || path === '/registro')) {
    return NextResponse.redirect(new URL('/app/inicio', request.url))
  }
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
