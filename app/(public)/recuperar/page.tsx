import { RecuperarForm } from '../../../components/AuthForms'

export const metadata = { title: 'Recuperar contraseña', robots: { index: false, follow: true } }

export default async function Page({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const sp = await searchParams
  return (
    <section className="sec tint" style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="in" style={{ maxWidth: 480 }}>
        <RecuperarForm email={sp.email ?? ''} />
      </div>
    </section>
  )
}
