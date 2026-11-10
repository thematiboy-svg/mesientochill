import P from '../_pages/P_home'
import JsonLd from '../../components/JsonLd'
import { orgJsonLd } from '../../lib/site'

export const metadata = { alternates: { canonical: '/' } }

export default function Page() {
  return (
    <>
      <JsonLd data={orgJsonLd()} />
      <P />
    </>
  )
}
