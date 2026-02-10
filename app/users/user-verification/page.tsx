"use client"
import { baseUrl } from "@/app/schemas/schema"
import { ErrMsg } from "@/lib/CommonMessage"
import { getCookie } from "cookies-next/client"
import React, { useState } from "react"


export default function UserVerificationPage(){
    const [email, setEmail] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSuccMsg] = useState("")

    async function UserVerificationSubmit(e: React.FormEvent) {
        e.preventDefault()

        try{
            const csrfToken: string = await getCookie("csrftoken") || ""

            const response = await fetch(`${baseUrl}/users/ask-verification/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({email: email})
            })
            const responseData = await response.json()

            if (response.ok){
                setErrMsg("")
                setSuccMsg("Tautan verifikasi akun telah dikirim ke email terdaftar. Silakan periksa email.")
            } else {
                setSuccMsg("")
                setErrMsg("Email belum terdaftar, lakukan pendaftaran sebelum verifikasi akun.")
            }
        }
        catch(err){
            setSuccMsg("")
            setErrMsg(ErrMsg.ServerError)
        }
    }
    return (
        <form onSubmit={UserVerificationSubmit}>
            <input type="email" name="email" placeholder="email" required
            value={email} onChange={e=>setEmail(e.target.value)}/>
            <button type="submit">Verifikasi</button>

            {succMsg && (<div>{succMsg}</div>)}
            {errMsg && (<div>{errMsg}</div>)}
        </form>
    )
}