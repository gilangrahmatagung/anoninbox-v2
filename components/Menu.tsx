"use client"
import Logout from "@/app/users/Logout"
import Link from "next/link"
import { useState } from "react"


export const Menu = ({isAuthenticated}:{isAuthenticated: boolean})=>{
    const [showMenu, setShowMenu] = useState(false)

    return (
        <>
            <button onClick={()=>{setShowMenu(!showMenu)}}>
                {showMenu? "Tutup menu":"Menu"}
            </button>
            {showMenu && (
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
            )}
        </>
    )
}