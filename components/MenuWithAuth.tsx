import { cookies } from 'next/headers'
import { Menu } from './Menu'
 

export default async function MenuWithAuthPage() {
  const cookieStore = await cookies()
  const sessionid = cookieStore.has("sessionid")
  console.log(sessionid?"punya":"gapunya")

  const sesi = cookieStore.get("sessionid")
  console.log(sesi)

  return (
    <Menu isAuthenticated={sessionid} />
  )
}
