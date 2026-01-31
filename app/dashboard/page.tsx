import BoxList from "@/components/BoxList"
import BoxCreate from "@/components/BoxCreate"


export default function DashboardPage(){

    return (
        <div>
            <h1>Dashboard</h1>
            <p>“Agama adalah nasehat”. Para sahabat bertanya: “Untuk siapa?”. Beliau menjawab: “Untuk Allah, kitab-Nya, Rasul-Nya, para pemimpin kaum muslimin dan umat muslim seluruhnya” (HR. Muslim, no. 55).</p>

            <BoxCreate />

            <BoxList />
        </div>
    )
}