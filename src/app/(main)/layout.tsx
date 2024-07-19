"use client"
import Navigation from "./_components/Navigation"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import React from "react"
import Searchcommands from "./_components/search-commands"

const Mainlayout = ({children}:{children:React.ReactNode}) => {
    const {isAuthenticated,isLoading} = useConvexAuth()
  
if(isLoading){
    return(
        <div className="flex h-full w-full justify-center items-center" ><p className="font-bold">Loading...</p></div >
    )
}
if(!isAuthenticated) return redirect("/")
    return (
        <div className="h-full dark:bg-[#1F1F1F] flex">
            <Navigation />
            
            <main className="flex-1 overflow-y-auto h-full">
                <Searchcommands/>
                {children}
            </main>
        </div>
    )
}

export default Mainlayout
