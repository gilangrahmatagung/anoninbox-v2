'use client'
import { baseUrl } from '@/app/schemas/schema'
import { ErrMsg } from '@/lib/CommonMessage'
import { getCookie } from 'cookies-next/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
 

export default function CheckUserVerificationPage() {
    const tokenParam = useSearchParams().get("token")
    const emailParam = useSearchParams().get("email")
    
    const [succMsg, setSuccMsg] = useState("")
    const [errMsg, setErrMsg] = useState("")
    
    async function CheckUserVerificationSubmit(token: string, email: string){
        const csrfToken: string = await getCookie("csrftoken") || ""

        try{
            const response = await fetch(`${baseUrl}/users/check-verification/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "X-CSRFToken": csrfToken
                },
                body: JSON.stringify({email: email, verification_token: token})
            })
            const responseData = await response.json()

            if (response.ok){
                setErrMsg("")
                setSuccMsg("Verifikasi akun berhasil. Silakan menuju halaman login.")
            } else {
                setSuccMsg("")
                setErrMsg("Verifikasi akun gagal. Periksa kembali token verifikasi.")
            }
        }
        catch(err){
            setSuccMsg("")
            setErrMsg(ErrMsg.ServerError)
        }
    }

    useEffect(()=>{
        if (!tokenParam || !emailParam) {setErrMsg("Masukkan email dan token yang sesuai.")}
        else {CheckUserVerificationSubmit(tokenParam,emailParam)}
    }, [])

    return (
        <>
            {succMsg && (<div>{succMsg}</div>)}
            {errMsg && (<div>{errMsg}</div>)}
        </>
    )
}