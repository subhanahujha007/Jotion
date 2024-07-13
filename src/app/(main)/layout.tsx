"use client"
import Navigation from "./_components/Navigation"
import { useConvexAuth } from "convex/react"
import { redirect } from "next/navigation"
import React from "react"

const Mainlayout = ({children}:{children:React.ReactNode}) => {
    const {isAuthenticated} = useConvexAuth()
    //if(!isAuthenticated) return redirect("/")

    return (
        <div className="h-full dark:bg-[#1F1F1F] flex">
            <Navigation />
            <main className="flex-1 overflow-y-auto h-full">
                {children}
            </main>
        </div>
    )
}

export default Mainlayout
