"use client"
import { baseUrl } from "../schemas/schema"


export default function Logout(){
    async function logoutSubmit(){
        try {
            const response = await fetch(`${baseUrl}/users/logout/`, {
                method: "GET",
                credentials: "include"
            })
            const responseData = await response.json()

            if (response.ok) {
                window.location.href = "/users/login"
            }

            // kasih info logout gagal
        }
        catch (error) {
            // kasih info server error
        }

        window.location.href = "/users/login"
    }

    return (
        <button onClick={logoutSubmit}>Logout</button>
    )
}