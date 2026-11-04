// Preguntas frecuentes de MeSientoChill. Se usan en /ayuda y en /landing:
// para añadir o cambiar una pregunta, edítala aquí y cambia en las dos.
export const FAQS: { q: string; a: string }[] = [
  { q: '¿Necesito experiencia?', a: 'No. En cada clase se explica el ejercicio y se proponen alternativas.' },
  { q: '¿Qué necesito?', a: 'Un espacio para moverte, ropa cómoda y conexión a internet. En el caso de Total Barre puedes utilizar una silla.' },
  { q: '¿Y si no puedo conectarme en directo?', a: 'Las clases se graban para verlas cuando quieras. Puedes cancelar tu reserva hasta 24 horas antes sin perder el crédito. Si no asistes a una clase reservada, pierdes el crédito de esa clase.' },
  { q: '¿Qué pasa si la clase está completa?', a: 'El máximo es de 10 personas. Puedes apuntarte a la lista de espera y, si se libera una plaza, avisamos por email a las tres primeras personas en espera. Se la queda quien la reserve primero.' },
  { q: '¿Puedo hacerlo si tengo molestias o una lesión?', a: 'Consulta antes con tu médico. Las clases no sustituyen un tratamiento médico ni fisioterapia.' },
  { q: '¿Tengo que comunicar mis lesiones al darme de alta?', a: 'Sí. Al registrarte te pedimos que nos cuentes cualquier lesión, dolor o condición de salud que tengas, para que Mónica pueda adaptar las clases a ti.' },
  { q: '¿Hay una entrevista antes de empezar?', a: 'Sí. Mónica hace una entrevista personal por videoconferencia a cada nueva persona antes de comenzar con las clases.' },
  { q: '¿Quién puede apuntarse y qué responsabilidad tengo?', a: 'Tienes que ser mayor de edad. Haces los ejercicios bajo tu propia responsabilidad: MeSientoChill no se hace responsable de lesiones ni de otros inconvenientes derivados de la práctica.' },
  { q: '¿Puedo apuntarme si estoy embarazada?', a: 'No. MeSientoChill no ofrece clases específicas para embarazadas, por lo que no es posible unirse durante el embarazo. Te recomendamos buscar a un profesional que imparta clases especializadas para esta etapa.' },
  { q: '¿Qué conexión necesito?', a: 'Una buena conexión a internet, para evitar cortes de imagen y sonido durante las clases.' },
  { q: '¿Cómo me doy de baja?', a: 'Desde tu cuenta, cuando quieras.' },
  { q: '¿Se devuelve el dinero?', a: 'No. Una vez contratado el mes, no se devuelve el importe, ya sea porque el formato no te guste o por cualquier otro inconveniente.' },
]

export default function Faqs({ abierta = 0 }: { abierta?: number | null }) {
  return (
    <div className="faq">
      {FAQS.map((f, i) => (
        <details key={f.q} open={i === abierta}>
          <summary><h3>{f.q}</h3></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
