
import { Modelprovider } from "@/components/Settings-model"
import Navbar from "./_components/Navbar"
const MarketingLayout=({children}:{children:React.ReactNode})=>{
return(
    <div className="min-h-full  ">
        <Navbar/>
        <main className="h-full pt-20">
            <Modelprovider/>
            
        {children}
        </main>
    </div>
)

}
export default MarketingLayout