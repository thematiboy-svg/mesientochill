import P from '../../_pages/P_ayuda'
import JsonLd from '../../../components/JsonLd'
import { FAQS } from '../../../components/Faqs'
import { faqJsonLd } from '../../../lib/site'
export const metadata = { title: 'Ayuda y preguntas frecuentes', description: 'Resolvemos tus dudas sobre las clases online de Pilates, Total Barre y Mindfulness de MeSientoChill: reservas, créditos, lista de espera y más.' }
export default function Page() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <P />
    </>
  )
}
