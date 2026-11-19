import P from '../../_pages/P_accesibilidad'
// Páginas legales: accesibles desde el pie, pero fuera de los resultados de Google
export const metadata = { title: 'Accesibilidad', robots: { index: false, follow: true } }
export default function Page() {
  return <P />
}
