"use client"
import { MessageCreateSchema } from "@/app/schemas/schema";
import { postFetcher } from "@/lib/Fetcher";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";


export default function StartThread({box_id,}:{box_id: number}){
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const {trigger, isMutating, error} = useSWRMutation(`/api/boxes/${box_id}/threads/`, postFetcher)
    
    async function startThreadSubmit(e: React.FormEvent) {
        e.preventDefault()

        const messageData: MessageCreateSchema = {
            message_title: title,
            message_body: body
        }

        await trigger(messageData)

        setTitle("")
        setBody("")
    }

    return (
        <form onSubmit={startThreadSubmit}>
            <input type="text" name="title" placeholder="Judul (opsional)"
            value={title} onChange={e=>setTitle(e.target.value)} />
            <input type="text" name="body" placeholder="Pesan"
            value={body} onChange={e=>setBody(e.target.value)} />

            <button type="submit">
                {isMutating? "Menyimpan...":"Kirim Pesan"}
            </button>
            {error && (<div>{error.message}</div>)}
        </form>
    )

}