"use client"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import { Box } from "@/app/schemas/schema" 
import Link from "next/link"


export default function BoxList(){
    const {data, error, isLoading} = useSWR("/api/box/", dashboardFetcher)

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <ul>
            {data && data.map((box: Box) => ( // .map berarti milik array
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