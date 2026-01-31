"use client"
import { postFetcher } from "@/lib/Fetcher"
import React, { useState, Activity } from "react"
import useSWRMutation from "swr/mutation"
import { BoxCreateSchema } from "@/app/schemas/schema"


export default function BoxCreate(){
    // Toggle show/hidden
    const[isVisible, setIsVisible] = useState(false)

    // Form post
    const[title, setTitle] = useState("")
    const[description, setDescription] = useState("")

    const {trigger, isMutating, error} = useSWRMutation("/api/boxes/", postFetcher)

    async function createBoxSubmit(e: React.FormEvent){
        e.preventDefault()

        const boxData: BoxCreateSchema = {
            box_title: title,
            box_description: description
        }

        await trigger(boxData)

        setTitle("")
        setDescription("")
    }

    return (
        <>
            <button onClick={()=>setIsVisible(!isVisible)}>
                {isVisible?"Tutup":"Buat Box Baru"}
            </button>
            
            <Activity mode={isVisible?'visible':'hidden'}>
                <form onSubmit={createBoxSubmit}>
                    <input type="text" name="title" placeholder="Judul" 
                    value={title} onChange={e=>setTitle(e.target.value)} />
                    <input type="text" name="description" placeholder="Deskripsi"
                    value={description} onChange={e=>setDescription(e.target.value)} />
                    
                    <button type="submit">
                        {isMutating? "Menyimpan...":"Buat Box"}
                    </button>
                    {error && (<div>{error.message}</div>)}
                </form>
            </Activity>
        </>
    )
}