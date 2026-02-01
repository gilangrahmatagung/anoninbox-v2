import Logout from "@/app/users/Logout"
import Link from "next/link"
import { cookies } from "next/headers"


export const Menu = async ()=>{
    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.has('sessionid')
    console.log("IS AUTH?")
    console.log(isAuthenticated)

    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>

            { isAuthenticated? (
                <>
                    <Link href="/dashboard">Dashboard</Link>
                    <Logout />
                </>
            ) : (
                <Link href="/users/login">
                    <button>Login App</button>
                </Link>
            )}
            
        </nav>
    )
}