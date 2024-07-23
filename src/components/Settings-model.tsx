"use client"

import { Coverimagemode } from "@/app/(main)/_components/models/cover-image-model"
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
       <Coverimagemode/>
        </>
    )
}