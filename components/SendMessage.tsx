"use client"
import { postFetcher } from "@/lib/Fetcher"
import React, { useState } from "react"
import useSWRMutation from "swr/mutation"
import { baseUrl, MessageCreateSchema } from "@/app/schemas/schema"


export default function SendMessage({box_id, thread_id}:{box_id: number, thread_id: number}){
    // Form post
    const[title, setTitle] = useState("")
    const[body, setBody] = useState("")

    const {trigger, isMutating, error} = useSWRMutation(`/api/boxes/${box_id}/threads/${thread_id}`, postFetcher)

    async function sendMessageSubmit(e: React.FormEvent){
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
        <>
            <form onSubmit={sendMessageSubmit}>
                <input type="text" name="title" placeholder="Judul (Opsional)" 
                value={title} onChange={e=>setTitle(e.target.value)} />
                <input type="text" name="body" placeholder="Pesan"
                value={body} onChange={e=>setBody(e.target.value)} />
                
                <button type="submit">
                    {isMutating? "Menyimpan...":"Kirim Pesan"}
                </button>
                {error && (<div>{error.message}</div>)}
            </form>
        </>
    )
}