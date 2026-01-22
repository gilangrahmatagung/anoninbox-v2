"use client"
import { ErrMsg } from "@/lib/CommonMessage";
import { useState } from "react";
import { getCookie } from "cookies-next";


export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    async function loginSubmit(e: React.FormEvent) {
        e.preventDefault() // mencegah default browser submission

        try {
            const csrfToken: string = await getCookie("csrftoken") || ""
            const response = await fetch("http://localhost:8000/ipa/users/login/", {
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
            setErrMsg("Email atau password yang Anda masukkan salah. Silakan coba lagi.")
        }
        catch (error) {
            setErrMsg(ErrMsg.ServerError)
        }
    }

    return (
        <form onSubmit={loginSubmit}>
            <input type="email" name="email" placeholder="Email"
                value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" name="password" placeholder="Sandi"
                value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Masuk</button>

            {errMsg && (<div>{errMsg}</div>)}
        </form>
    )
}