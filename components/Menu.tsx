import Link from "next/link"

export const Menu = ()=>{


    return (
        <nav>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
            
            <Link href="/users/login">Login</Link>
        </nav>
    )
}