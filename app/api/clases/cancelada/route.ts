import { NextResponse, type NextRequest } from 'next/server'
import { avisarCancelacion } from '../../../../lib/avisos'

// Lo llama la base de datos (trigger on_class_cancelada) cuando Mónica marca una clase como cancelada.
// No necesita secreto: comprueba en la base de datos que la clase está cancelada y solo avisa una vez.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { session_id?: string } | null
  const id = body?.session_id ?? ''
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'session_id' }, { status: 400 })
  const r = await avisarCancelacion(id, request.nextUrl.origin)
  return NextResponse.json(r)
}
