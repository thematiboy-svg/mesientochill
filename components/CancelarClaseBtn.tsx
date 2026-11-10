'use client'
import { useFormStatus } from 'react-dom'

function Boton({ texto }: { texto: string }) {
  const { pending } = useFormStatus()
  return <button className="btn b4 sm" type="submit" disabled={pending}>{pending ? 'Cancelando…' : texto}</button>
}

/** Botón de cancelar clase con confirmación antes de enviar. */
export default function CancelarClaseBtn({ action, sessionId, aviso }: { action: (fd: FormData) => void; sessionId: string; aviso: string }) {
  return (
    <form action={action} onSubmit={(e) => { if (!window.confirm(aviso)) e.preventDefault() }}>
      <input type="hidden" name="session" value={sessionId} />
      <Boton texto="Cancelar clase" />
    </form>
  )
}
