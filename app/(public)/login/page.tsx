import { LoginForm } from '../../../components/AuthForms'

export const metadata = { title: 'Iniciar sesión' }

export default async function Page({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const sp = await searchParams
  return (
    <section className="sec tint" style={{ paddingTop: 72, paddingBottom: 96 }}>
      <div className="in" style={{ maxWidth: 480 }}>
        <LoginForm configError={sp.error === 'config'} />
      </div>
    </section>
  )
}
