import { NuevaContrasenaForm } from '../../../components/AuthForms'

export const metadata = { title: 'Nueva contraseña', robots: { index: false, follow: true } }

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams
  return (
    <section className="sec tint" style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="in" style={{ maxWidth: 480 }}>
        <NuevaContrasenaForm error={!!sp.error} />
      </div>
    </section>
  )
}
