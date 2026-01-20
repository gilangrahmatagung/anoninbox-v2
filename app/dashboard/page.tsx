import BoxList from "@/components/BoxList"
import { useState, Activity } from "react"
import BoxCreate from "@/components/BoxCreate"


export default function DashboardPage(){
    const[isShowingCreate, setIsShowingCreate] = useState(false)

    return (
        <div>
            <h1>Dashboard</h1>

            <Activity mode={isShowingCreate?"visible":"hidden"}>
                <BoxCreate />
            </Activity>

            <BoxList />
        </div>
    )
}