"use client"
import { dashboardFetcher } from "@/lib/Fetcher"
import useSWR from "swr"
import { Box } from "@/app/schemas/schema"


export default function BoxDetail({id,}:{id: number}){
    const {data, error, isLoading} = useSWR<Box>(`/api/box/${id}`, dashboardFetcher)

    if (error) return <div>{error.message}</div>
    if (isLoading) return <div>Memuat...</div>

    return (
        <>
            <h2>{data?.box_title}</h2>
            <p>{data?.box_description}</p>
            <p>{data?.created_at}</p>
            <p>{data?.updated_at}</p>
        </>
    )
}