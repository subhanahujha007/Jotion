"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { toast } from "sonner"


 const Error=()=>{
    
    useEffect(() => {
        toast.error("something went wrong")
      }, [])
    return(<>
     <center className="h-full w-full flex flex-col items-center justify-center">
            <h2>Something went wrong</h2>
            <Button ><Link href="/documents">Go Back</Link></Button>
        </center>
        </>
       
    )
}
export default Error