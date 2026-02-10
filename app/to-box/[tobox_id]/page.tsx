import StartThread from "@/components/StartThread"
import ToBox from "@/components/ToBoxRetrieve"


export default async function ToBoxPage({ params }: { params: { tobox_id: number } }){
    const {tobox_id} = await params

    return (
        <>
            <h2>Box: </h2>
            <ToBox box_id={tobox_id} />
            <h2>Pesan kamu:</h2>
            <StartThread box_id={tobox_id}/>
        </>
    )
}