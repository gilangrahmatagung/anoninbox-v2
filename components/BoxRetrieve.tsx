"use client"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import { BoxSchema, originWeb } from "@/app/schemas/schema"
import { handleCopy } from "@/lib/Utils"


export default function BoxRetrieve({box_id,}:{box_id: number}){
    const {data, error, isLoading} = useSWR<BoxSchema>(`/api/boxes/${box_id}`, dashboardFetcher)

    if (error) return <div>Box tidak ditemukan. Pastikan kamu sudah login.</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <>
            <h2>Judul: {data?.box_title}</h2>
            <p>Deskripsi: {data?.box_description}</p>
            <p>Dibuat pada: {data?.created_at}</p>
            <p>Diperbarui pada: {data?.updated_at}</p>
            <button onClick={()=>handleCopy(`${originWeb}/to-box/${data?.id}`)}>Bagikan</button>
        </>
    )
}