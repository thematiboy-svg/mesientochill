import { RegisterForm } from '../../../components/AuthForms'

export const metadata = { title: 'Empieza con MeSientoChill' }

export default function Page() {
  return (
    <section className="sec tint" style={{ paddingTop: 56 }}>
      <div className="in stack g32">
        <div className="wrapr g12 small" style={{ fontWeight: 700 }}>
          <span className="chip on">1 · Plan</span><span className="chip">2 · Tus datos</span><span className="chip">3 · Pago</span><span className="chip">4 · Cuestionario</span>
        </div>
        <RegisterForm />
      </div>
    </section>
  )
}
