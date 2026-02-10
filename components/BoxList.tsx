"use client"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import { baseUrl, BoxSchema, originWeb } from "@/app/schemas/schema" 
import Link from "next/link"
import { handleCopy } from "@/lib/Utils"


export default function BoxList(){
    const {data, error, isLoading} = useSWR("/api/boxes/", dashboardFetcher)

    if (error) return <div>Daftar Box tidak ada. Pastikan kamu sudah login.</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <ul>
            {
            data.length===0?"Kamu belum punya Box. Ayo buat Box baru."
            :data.map((box: BoxSchema) => ( // .map berarti milik array
                <li key={box.id}>
                    <Link href={`/dashboard/box/${box.id}`}>
                        <h2>{box.box_title}</h2>
                        <p>{box.created_at}</p>
                    </Link>
                    <button onClick={()=>handleCopy(`${originWeb}/to-box/${box.id}`)}>Bagikan</button>
                </li>
            ))
            }
        </ul>
    )
}