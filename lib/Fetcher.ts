import { ErrMsg } from "./CommonMessage"

type errorFetcher = Error & {message?: string} // type ini wajib punya Error dan object

export const dashboardFetcher = async (url: string) => {
    let response: Response

    try{
        response = await fetch(`http://localhost:8000/ipa${url}`, {
            credentials:"include"
        })
    } catch(err){
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ServerError

        throw error
    }

    if(!response.ok){
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ClientError

        throw error
    }

    return response.json()
    
}