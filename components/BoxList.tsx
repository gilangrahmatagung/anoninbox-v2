"use client"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import { BoxSchema } from "@/app/schemas/schema" 
import Link from "next/link"


export default function BoxList(){
    const {data, error, isLoading} = useSWR("/api/boxes/", dashboardFetcher)

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <ul>
            {data && data.map((box: BoxSchema) => ( // .map berarti milik array
                <li key={box.id}>
                    <Link href={`/dashboard/box/${box.id}`}>
                        <h2>{box.box_title}</h2>
                        <p>{box.created_at}</p>
                    </Link>
                </li>
            ))}
        </ul>
    )
}