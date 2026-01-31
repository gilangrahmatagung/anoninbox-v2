import { baseUrl } from "@/app/schemas/schema"
import { ErrMsg } from "./CommonMessage"
import { getCookie } from "cookies-next/client"


type errorFetcher = Error & { message?: string } // type ini wajib punya Error dan object

export const dashboardFetcher = async (url: string) => {
    let response: Response

    try {
        response = await fetch(`${baseUrl}${url}`, {
            credentials: "include"
        })
    } catch (err) {
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ServerError

        throw error
    }

    if (!response.ok) {
        console.log("ERROR REQUEST: ")
        console.log(response)
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ClientError

        throw error
    }

    return await response.json()

}

export const postFetcher = async (url: string, { arg }: { arg: object }) => {
    let response: Response

    try {
        const csrfToken: string = await getCookie("csrftoken") || ""
        response = await fetch(`${baseUrl}${url}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": csrfToken
            },
            body: JSON.stringify(arg)
        })
    } catch (err) {
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ServerError

        throw error
    }

    if (!response.ok) {
        console.log("ERROR REQUEST: ")
        console.log(response)
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ClientError

        throw error
    }
}