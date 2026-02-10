'use client'
import { baseUrl } from '@/app/schemas/schema'
import { ErrMsg } from '@/lib/CommonMessage'
import { getCookie } from 'cookies-next/client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
 

export default function CheckPasswordResetPage() {
    const tokenParam = useSearchParams().get("token")
    const emailParam = useSearchParams().get("email")

    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const [succMsg, setSuccMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    
    useEffect(()=>{
        if (!tokenParam || !emailParam) {setErrMsg("Masukkan email dan token yang sesuai. Periksa tautan yang terkirim melalui email.")}
    }, [])

    async function CheckPasswordResetSubmit(e: React.FormEvent){
        e.preventDefault()

        const csrfToken: string = await getCookie("csrftoken") || ""

        if (newPassword!==confirmPassword){
            setSuccMsg("")
            setErrMsg("Sandi konfirmasi tidak cocok. Silakan periksa lagi.")
        }
        else{
            try{
                const response = await fetch(`${baseUrl}/users/check-password-reset/`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "X-CSRFToken": csrfToken
                    },
                    body: JSON.stringify({
                        "email": emailParam,
                        "verification_token": tokenParam,
                        "password": newPassword
                    })
                })
                const responseData = await response.json()
    
                if (response.ok){
                    setErrMsg("")
                    setSuccMsg("Pengaturan ulang sandi berhasil. Silakan menuju halaman login.")
                } else {
                    setSuccMsg("")
                    setErrMsg("Pengaturan ulang sandi gagal. Periksa kembali token.")
                }
            }
            catch(err){
                setSuccMsg("")
                setErrMsg(ErrMsg.ServerError)
            }
        } 
    }

    return (
        <>
            <form onSubmit={CheckPasswordResetSubmit}>
                <input type="password" name='password' placeholder='Sandi' required
                value={newPassword} onChange={e=>setNewPassword(e.target.value)}/>
                <input type="password" name='confirmPassword' placeholder='Konfirmasi sandi' required
                value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                <button type='submit'>Atur ulang</button>
            </form>
            {succMsg && (<div>{succMsg}</div>)}
            {errMsg && (<div>{errMsg}</div>)}
        </>
    )
}