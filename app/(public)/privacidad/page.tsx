import P from '../../_pages/P_privacidad'
// Páginas legales: accesibles desde el pie, pero fuera de los resultados de Google
export const metadata = { title: 'Política de privacidad', robots: { index: false, follow: true } }
export default function Page() {
  return <P />
}
