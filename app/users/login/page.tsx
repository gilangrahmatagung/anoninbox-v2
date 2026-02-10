"use client"
import { ErrMsg } from "@/lib/CommonMessage";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { baseUrl } from "@/app/schemas/schema";
import Link from "next/link";


export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    async function loginSubmit(e: React.FormEvent) {
        e.preventDefault() // mencegah default browser submission

        try {
            const csrfToken: string = await getCookie("csrftoken") || ""
            const response = await fetch(`${baseUrl}/users/login/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                credentials: "include", // (1) ikutkan cookie saat request dan (2) simpan cookie dari response
                body: JSON.stringify({ email, password })
            })
            const responseData = await response.json()

            if (response.ok) {
                window.location.href = "/dashboard"
            }
            else{
                setErrMsg("Email atau password yang Anda masukkan salah. Silakan coba lagi.")
            }
        }
        catch (error) {
            setErrMsg(ErrMsg.ServerError)
        }
    }

    return (
        <form onSubmit={loginSubmit}>
            <input type="email" name="email" placeholder="Email" required
                value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Sandi" required
                value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Masuk</button>
            <p>Belum punya akun? <Link href={"/users/register"}>Mendaftar akun baru</Link></p>
            <p>Lupa sandi? <Link href={"/users/password-reset"}>Atur ulang sandi</Link></p>

            {errMsg && (<div>{errMsg}</div>)}
        </form>
    )
}