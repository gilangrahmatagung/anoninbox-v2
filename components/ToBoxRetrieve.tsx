import { ErrMsg } from "@/lib/CommonMessage"
import { baseUrl, BoxSchema } from "@/app/schemas/schema"


export default async function ToBox({box_id,}:{box_id: number}){
    try {
        const response = await fetch(`${baseUrl}/api/boxes/${box_id}`)
        
        if (response.ok){
            const responseData: BoxSchema = await response.json()

            return (
                <div>
                    <h2>{responseData.box_title}</h2>
                    <p>{responseData.box_description}</p>
                </div>
            )
        }

        return (<p>Box tidak ditemukan</p>)
    }

    catch(err){
        return(<p>{ErrMsg.ServerError}</p>)
    }
}