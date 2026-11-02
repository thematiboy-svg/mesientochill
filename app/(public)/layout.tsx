import SiteHeader from '../../components/SiteHeader'
import SiteFooter from '../../components/SiteFooter'
import { createClient } from '../../lib/supabase/server'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } }
  return (
    <>
      <SiteHeader loggedIn={!!data.user} />
      {children}
      <SiteFooter />
    </>
  )
}
