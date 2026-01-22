import { ErrMsg } from "./CommonMessage"
import { getCookie } from "cookies-next/client"


type errorFetcher = Error & { message?: string } // type ini wajib punya Error dan object

export const dashboardFetcher = async (url: string) => {
    let response: Response

    try {
        response = await fetch(`http://localhost:8000/ipa${url}`, {
            credentials: "include"
        })
    } catch (err) {
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ServerError

        throw error
    }

    if (!response.ok) {
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ClientError

        throw error
    }

    return response.json()

}

export const postFetcher = async (url: string, { arg }: { arg: object }) => {
    let response: Response

    try {
        const csrfToken: string = await getCookie("csrftoken") || ""
        response = await fetch(`http://localhost:8000/ipa${url}`, {
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
        const error: errorFetcher = new Error()
        error.message = ErrMsg.ClientError

        throw error
    }
}