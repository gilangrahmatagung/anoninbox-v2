import BoxRetrieve from "@/components/BoxRetrieve";
import ThreadAndMessages from "@/components/ThreadAndMessages";


export default async function BoxPage({ params }: { params: { id: number } }) { // props otomatis dari route
    const {id} = await params
    return (
        <>
            <h1>Messages Inbox</h1>
            <p>Detail Box:</p>
            <BoxRetrieve box_id={id} />
            <hr />
            <p>Pesan yang masuk:</p>
            <ThreadAndMessages box_id={id} />
        </>
    )
}