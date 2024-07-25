"use client"

import { Doc } from "../../../../convex/_generated/dataModel"
interface publishprops{
    initialdata:Doc<"Documents">
}

import {
    Popover,PopoverContent,PopoverTrigger
} from "@/components/ui/popover"
import { useorigin } from "../../../../hooks/use-origin"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
export const Publish=({initialdata}:publishprops)=>{
   const origin=useorigin()
   const update=useMutation(api.Documents.update)
   const [copied,setcopied]=useState(false)
   const [issubmmiting,setissubmitting]=useState(false)
   const url=`${origin}/preview/${initialdata._id}`
   const onpublish=()=>{
    setissubmitting(true)
const promise= update({
    id:initialdata._id,
    isPublished:true
 }).finally(()=>setissubmitting(false))
 toast.promise(promise,{
    loading:"Publishing ...",
    success:"Published successfully",
    error:"Failed to publish"
 })
   }
   const unpublish=()=>{
    setissubmitting(true)
const promise= update({
    id:initialdata._id,
    isPublished:false
 }).finally(()=>setissubmitting(false))
 toast.promise(promise,{
    loading:"UnPublishing ...",
    success:"UnPublished successfully",
    error:"Failed to Unpublish"
 })}

 const oncopy=()=>{
    navigator.clipboard.writeText(url)
    setcopied(true)
    setTimeout(() => {
        setcopied(false)
    }, 1000);
 }
    return(
        <Popover>
            <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
            Publish
            {
                initialdata.isPublished && <Globe  className="text-sky-500 w-4 h-4 ml-2" />
            }
        </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72" align="end"
            alignOffset={8} >

            </PopoverContent>
            </Popover>

    )
}