import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseUrl, supabaseAnonKey } from './lib/supabase/env'

export async function middleware(request: NextRequest) {
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
