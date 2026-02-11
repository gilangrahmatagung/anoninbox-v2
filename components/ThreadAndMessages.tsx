"use client"
import { ThreadAndMessagesSchema, MessageSchema } from "@/app/schemas/schema"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import SendMessage from "./SendMessage"


export default function ThreadAndMessages({box_id,}:{box_id: number}){
    const {data, error, isLoading} = useSWR(`/api/boxes/${box_id}/threads/`, dashboardFetcher)

    if (error) return <div>Data tidak ditemukan. Silakan login untuk melihat pesan yang masuk dalam Box.</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <ul>
            {data.length===0? "Belum ada pesan yang masuk ke dalam Box. Bagikan Box kamu ke teman-temanmu."
            :data.map((thread: ThreadAndMessagesSchema)=>(
                <li key={thread.id}>
                    <ul>
                        {thread.messages && thread.messages.map((message: MessageSchema)=>(
                            <li key={message.id}>
                                {message.message_title}:{message.message_body}
                            </li>
                        ))}
                    </ul>
                    <SendMessage box_id={box_id} thread_id={thread.id} />
                </li>
            ))}
        </ul>
    )
}