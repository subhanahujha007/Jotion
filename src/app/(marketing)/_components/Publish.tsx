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
import { Check, CheckCircle, Copy, Globe } from "lucide-react"
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
            <PopoverContent className="z-99999999999999 w-72" align="end"
            alignOffset={8} forceMount >
                        {
                            initialdata.isPublished ?(
                                <div className="space-y-4">
                                    <div className="flex items-center gap-x-2">
                                <Globe className="text-sky-500 animate-pulse h-4 w-4" />
                                <p className="text-xs font-medium text-sky-500">this note is live on web</p>
                    
                                    </div>
                                    <div className="flex items-center">
                                <input className="truncated" value={url} disabled />
                                <Button onClick={oncopy} disabled={copied} className="h-8 rounded-sm">
                                    {
                                        copied?
                                        ( <CheckCircle className="h-4 w-4" /> )
                                        :(
                                            <Copy className="h-4 w-4"/>
                                        )
                                    }
                                </Button>
                                    </div>
                                    <Button
                                    size="sm"
                                    onClick={unpublish}
                                    disabled={issubmmiting}
                                    >
                                        UnPublish
                                    </Button>
                                </div>
                            ):(
                                <div className="flex flex-col items-center justify-center">
                                    <Globe className="text-white w-4 h-4 text-muted mb-3" />
                                                <p className="text-sm font-medium mb-2">publish this note</p>
                                                <span className="text-xs text-muted-foreground mb-4">
                                                    share your work with others
                                                </span>
                                                <Button
                                                disabled={issubmmiting}
                                                onClick={onpublish}
                                                className="w-full text-xs"
                                                size="sm">
                                                    publish
                                                </Button>
                                </div>
                            )
                        }
            </PopoverContent>
            </Popover>

    )
}