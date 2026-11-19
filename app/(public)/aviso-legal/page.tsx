import P from '../../_pages/P_aviso_legal'
// Páginas legales: accesibles desde el pie, pero fuera de los resultados de Google
export const metadata = { title: 'Aviso legal', robots: { index: false, follow: true } }
export default function Page() {
  return <P />
}
