import BoxDetail from "@/components/BoxRetrieve";


export default async function BoxPage({ params }: { params: { id: number } }) { // props otomatis dari route
    const {id} = await params
    return (
        <>
            <h1>Messages Inbox</h1>
            <BoxDetail id={id} />
        </>
    )
}