import BoxList from "@/components/BoxList"
import BoxCreate from "@/components/BoxCreate"


export default function DashboardPage(){

    return (
        <div>
            <h1>Dashboard</h1>

            <BoxCreate />

            <BoxList />
        </div>
    )
}