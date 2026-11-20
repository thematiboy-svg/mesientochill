'use client'
import { useEffect, useState } from 'react'

// Muestra un email sin que aparezca en el HTML: se monta en el navegador, así los bots que leen la página no lo recogen.
// Sin JavaScript se ve «usuario [arroba] dominio».
export default function EmailProtegido({ usuario, dominio }: { usuario: string; dominio: string }) {
  const [email, setEmail] = useState<string | null>(null)
  useEffect(() => setEmail(`${usuario}@${dominio}`), [usuario, dominio])
  if (!email) return <span>{usuario} [arroba] {dominio}</span>
  return <a href={`mailto:${email}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{email}</a>
}
