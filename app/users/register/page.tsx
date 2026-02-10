"use client"
import { baseUrl, UserSchema } from "@/app/schemas/schema"
import { ErrMsg } from "@/lib/CommonMessage"
import { getCookie } from "cookies-next"
import React, { useState } from "react"


export default function RegisterPage(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [errMsg, setErrMsg] = useState("")
    const [succMsg, setSuccMsg] = useState("")

    async function registerSubmit(e: React.FormEvent){
        e.preventDefault()

        // sedikit validasi
        const userData: UserSchema = {
            email: email,
            password: password
        }

        if (password!==confirmPassword){
            setErrMsg("Sandi konfirmasi tidak cocok. Silakan periksa kembali.")

            setPassword("")
            setConfirmPassword("")
        }
        
        else {
            try{
                const csrfToken: string = await getCookie("csrftoken") || ""
                const response = await fetch(`${baseUrl}/users/register/`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "X-CSRFToken": csrfToken
                    },
                    body: JSON.stringify(userData)
                })
                const responseData = await response.json()
    
                if (response.ok){
                    setErrMsg("")
                    setSuccMsg("Kami telah mengirimkan tautan verifikasi ke email terdaftar. Silakan lakukan verifikasi.")

                    setEmail("")
                    setConfirmPassword("")
                    setPassword("")
                }
                else {
                    setSuccMsg("")
                    setErrMsg("Email yang kamu masukkan telah terdaftar.")

                    setEmail("")
                    setConfirmPassword("")
                    setPassword("")
                }
            }
            
            catch(err) {
                setSuccMsg("")
                setErrMsg(ErrMsg.ServerError)

                setEmail("")
                setConfirmPassword("")
                setPassword("")
            }
        }
    }

    return (
        <form onSubmit={registerSubmit}>
            <input type="email" name="email" placeholder="Email" required
            value={email} onChange={e=>setEmail(e.target.value)}/>
            <input type="password" name="password" placeholder="Sandi" required
            value={password} onChange={e=>setPassword(e.target.value)} />
            <input type="password" name="confirmPassword" placeholder="Konfirmasi sandi" required
            value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
            
            <button type="submit">Daftar</button>

            {succMsg && (
                <div>{succMsg}</div>
            )}
            {errMsg && (
                <div>{errMsg}</div>
            )}
        </form>
    )
}