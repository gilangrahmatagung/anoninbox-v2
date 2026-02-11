"use client"
import { ThreadCreateSchema } from "@/app/schemas/schema";
import { postFetcher } from "@/lib/Fetcher";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";


export default function StartThread({box_id, isAuthenticated}:{box_id: number, isAuthenticated: boolean}){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [email, setEmail] = useState("")

    const [succMsg, setSuccMsg] = useState("")

    const {trigger, isMutating, error} = useSWRMutation(`/api/boxes/${box_id}/threads/`, postFetcher)
    
    async function startThreadSubmit(e: React.FormEvent) {
        e.preventDefault()

        const messageData: ThreadCreateSchema = {
            non_user_email: email,
            message_title: title,
            message_body: body
        }

        // sedikit validasi
        if (title===""){delete messageData.message_title}
        if (email===""){delete messageData.non_user_email}

        await trigger(messageData)

        setTitle("")
        setBody("")
        setEmail("")

        setSuccMsg("Pesan telah dikirim.")
    }

    return (
        <form onSubmit={startThreadSubmit}>
            <input type="text" name="title" placeholder="Judul (opsional)"
            value={title} onChange={e=>setTitle(e.target.value)} />
            
            {!isAuthenticated&&(
                <input type="email" name="email" placeholder="Email (opsional)" 
                value={email} onChange={e=>setEmail(e.target.value)} />
            )}
            
            <input type="text" name="body" placeholder="Pesan" required
            value={body} onChange={e=>setBody(e.target.value)} />

            <button type="submit">
                {isMutating? "Menyimpan...":"Kirim Pesan"}
            </button>
            {succMsg && (<div>{succMsg}</div>)}
            {error && (<div>{error.message}</div>)}
        </form>
    )

}