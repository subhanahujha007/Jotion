"use client"

import { Settingcomponent } from "@/app/(main)/_components/models/setting-model"
import { useState,useEffect } from "react"

export const Modelprovider=()=>{
    const [ismounted,setmounted]=useState(false)
    useEffect(() => {
      setmounted(true)
    }, [])
    if(!ismounted)return null
    return(
        <>
       <Settingcomponent/> 
        </>
    )
}