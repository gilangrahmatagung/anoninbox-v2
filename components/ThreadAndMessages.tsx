"use client"
import { ThreadAndMessagesSchema, MessageSchema } from "@/app/schemas/schema"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"


export default function ThreadAndMessages({box_id,}:{box_id: number}){
    const {data, error, isLoading} = useSWR(`/api/boxes/${box_id}/threads/`, dashboardFetcher)

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <ul>
            {data && data.map((thread: ThreadAndMessagesSchema)=>(
                <li key={thread.id}>
                    <ul>
                        <li>User email: {thread.user_email}</li>
                        <li>Non user email: {thread.non_user_email}</li>
                        <li>Messages: 
                            <ul>
                                {thread.messages && thread.messages.map((message: MessageSchema)=>(
                                    <li key={message.id}>
                                        {message.message_title}:{message.message_body}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>
                </li>
            ))}
        </ul>
    )
}