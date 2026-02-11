"use client"
import { MessageSchema, ThreadAndMessagesSchema } from "@/app/schemas/schema"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import StartThread from "./StartThread"
import SendMessage from "./SendMessage"


export default function ThreadWithSender({box_id,}:{box_id: number}){
    const {data, error, isLoading} = useSWR(`/api/boxes/${box_id}/threads-with-sender/`, dashboardFetcher)

    if (data&&data.length>0) {
        
        return (
            <>
                <h2>Pesan kamu:</h2>
                <ul>
                    {data.map((thread: ThreadAndMessagesSchema)=>(
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
            </>
        )

    } else {
        return (
            <>
                <h2>Memulai pesan:</h2>
                <StartThread box_id={box_id} isAuthenticated={true}/>
            </>
        )
    }
}