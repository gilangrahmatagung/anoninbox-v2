import { cookies } from 'next/headers'
import { Menu } from './Menu'
 

export default async function MenuWithAuthPage() {
  const cookieStore = await cookies()
  const sessionid = cookieStore.has("sessionid")

  const sesi = cookieStore.get("sessionid")

  return (
    <Menu isAuthenticated={sessionid} />
  )
}
