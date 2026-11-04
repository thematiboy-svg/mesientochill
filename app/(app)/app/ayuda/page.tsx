import P from '../../../_pages/A_ayudaapp'
import { getContext } from '../../../../lib/data'
export const metadata = { title: 'Ayuda' }
export default async function Page() {
  const ctx = await getContext()
  return <P nombre={ctx?.profile?.nombre || undefined} />
}
