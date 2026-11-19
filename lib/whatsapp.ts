// Avisos por WhatsApp con la API oficial de Meta (WhatsApp Cloud API).
// Requiere WHATSAPP_TOKEN y WHATSAPP_PHONE_ID; sin ellas no se envía nada y solo salen los emails.
// Solo se escribe a quien lo ha activado (profiles.avisos_whatsapp) y tiene teléfono.
// Las plantillas (nombre y texto) tienen que estar aprobadas en Meta: ver docs/WHATSAPP.md.

/** Pasa un teléfono escrito a mano al formato de Meta: solo dígitos con prefijo de país (34600000000). Sin prefijo se supone España. */
export function normalizarTelefono(t: string | null | undefined): string | null {
  if (!t) return null
  let d = t.trim().replace(/[^\d+]/g, '')
  if (d.startsWith('+')) d = d.slice(1)
  else if (d.startsWith('00')) d = d.slice(2)
  else if (/^[6789]\d{8}$/.test(d)) d = '34' + d
  return /^\d{8,15}$/.test(d) ? d : null
}

type Plantilla = 'msc_reserva_confirmada' | 'msc_clase_cancelada' | 'msc_plaza_libre'

async function enviarPlantilla(telefono: string | null | undefined, plantilla: Plantilla, params: string[]) {
  const token = process.env.WHATSAPP_TOKEN
  const phoneId = process.env.WHATSAPP_PHONE_ID
  const to = normalizarTelefono(telefono)
  if (!token || !phoneId || !to) return false
  try {
    const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: plantilla,
          language: { code: process.env.WHATSAPP_LANG || 'es' },
          components: [{ type: 'body', parameters: params.map((text) => ({ type: 'text', text: text.replace(/\s+/g, ' ').trim() || '-' })) }],
        },
      }),
    })
    if (!r.ok) console.error('WhatsApp:', plantilla, r.status, await r.text())
    return r.ok
  } catch (e) {
    console.error('WhatsApp:', plantilla, e)
    return false
  }
}

// Meta no admite parámetros vacíos: sin nombre, «Hola de nuevo».
const saludo = (nombre: string) => nombre.trim() || 'de nuevo'

export function whatsappReserva(tel: string | null | undefined, d: { nombre: string; disciplina: string; cuando: string; enlace: string }) {
  return enviarPlantilla(tel, 'msc_reserva_confirmada', [saludo(d.nombre), d.disciplina, d.cuando, d.enlace])
}

export function whatsappCancelacion(tel: string | null | undefined, d: { nombre: string; disciplina: string; cuando: string; enlace: string }) {
  return enviarPlantilla(tel, 'msc_clase_cancelada', [saludo(d.nombre), d.disciplina, d.cuando, d.enlace])
}

export function whatsappPlazaLibre(tel: string | null | undefined, d: { nombre: string; disciplina: string; cuando: string; enlace: string }) {
  return enviarPlantilla(tel, 'msc_plaza_libre', [saludo(d.nombre), d.disciplina, d.cuando, d.enlace])
}

/** Teléfono de WhatsApp de una persona si ha activado los avisos (null si no, o si la columna aún no existe). */
export async function telefonoAvisos(
  db: { from: (t: string) => any },
  userId: string,
): Promise<string | null> {
  const { data, error } = await db.from('profiles').select('telefono, avisos_whatsapp').eq('id', userId).maybeSingle()
  if (error || !data?.avisos_whatsapp) return null
  return data.telefono ?? null
}
