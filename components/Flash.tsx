const OK: Record<string, string> = {
  reservada: 'Clase reservada. Te hemos descontado 1 crédito.',
  lista: 'Te has apuntado a la lista de espera.',
  cancelada: 'Cancelamos tu reserva y te devolvemos el crédito.',
  cancelada_tarde: 'Faltaban menos de 24 horas: la reserva se ha cancelado y pierdes el crédito de esta clase.',
  guardado: 'Cambios guardados.',
  plan: 'Plan actualizado.',
  pago: 'Pago completado. ¡Bienvenida a MeSientoChill!',
}
export default function Flash({ ok, error }: { ok?: string; error?: string }) {
  if (error) return <p className="alert err" role="alert">{error}</p>
  if (ok && OK[ok]) return <p className="alert ok" role="status">{OK[ok]}</p>
  return null
}
