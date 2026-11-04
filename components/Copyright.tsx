'use client'
import { useEffect, useState } from 'react'

// Copyright del footer. El año se calcula en el navegador de cada visitante,
// así se actualiza solo al cambiar de año aunque la página se generara antes.
export default function Copyright({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const [year, setYear] = useState(2026)
  useEffect(() => { setYear(new Date().getFullYear()) }, [])
  return (
    <p className={className} style={style}>
      © MeSientoChill {year}, creado con amor por{' '}
      <a href="https://wabisabu.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3 }}>Carlos Matilla</a>
    </p>
  )
}
