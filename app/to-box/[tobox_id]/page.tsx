import StartThread from "@/components/StartThread"
import ThreadWithSender from "@/components/ThreadWithSender"
import ToBox from "@/components/ToBoxRetrieve"
import { cookies } from "next/headers"


export default async function ToBoxPage({ params }: { params: { tobox_id: number } }){
    const {tobox_id} = await params

    const cookieStore = await cookies()
    const isAuthenticated = cookieStore.has("sessionid")

    // persiapan component ketika otentik
    // perlu tahu info if this user has a thread in this box

    // PAGE
    if (isAuthenticated) {
        return (
            <>
                <h2>Box: </h2>
                <ToBox box_id={tobox_id} />
                <ThreadWithSender box_id={tobox_id} />
            </>
        )   
    }
    
    else {
        return (
            <>
                <h2>Box: </h2>
                <ToBox box_id={tobox_id} />
                <h2>Pesan kamu:</h2>
                <StartThread box_id={tobox_id} isAuthenticated={false} />
            </>
        )
    }
}