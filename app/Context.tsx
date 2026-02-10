import { createContext } from "react";
import { ProfilContextSchema } from "./schemas/schema";
import { Menu } from "@/components/Menu";
import LoginPage from "./users/login/page";


const ProfilContext = createContext<ProfilContextSchema>({email: ""})

export default function Profil(){
    return (
        <ProfilContext.Provider value={{email:""}}>
            <Menu />
            <LoginPage />
        </ProfilContext.Provider>
    )
}