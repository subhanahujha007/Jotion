"use client"
import { useMutation, useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { toast } from 'sonner'
import { Search, Trash, Undo } from 'lucide-react'
import { Input } from "@/components/ui/input"
import Confirm from './models/confirm-model'

const TrashBox = () => {
    const params=useParams()
    const route=useRouter()
    const document=useQuery(api.Documents.gettrash)
    const restore=useMutation(api.Documents.restore)
    const remove=useMutation(api.Documents.remove)
    const [search,usesearch]=useState("")
const filterdocuments=document?.filter((doc)=>{
return doc.title.toLowerCase().includes(search.toLowerCase())})
const onclick=(documentid:string)=>{
    route.push(`/documents/${documentid}`)
}
const onrestore=(event:React.MouseEvent<HTMLDivElement,MouseEvent>,documentid:Id<"Documents">)=>{
    event.stopPropagation()
    const promise=restore({id:documentid})
    toast.promise(promise,{
        loading:"restoring the note",
        success:"restored the note",
        error:"error restoring the note"
    })
}

const onremove=(documentid:Id<"Documents">)=>{
 
    const promise=remove({id:documentid})
    toast.promise(promise,{
        loading:"Deleting the note",
        success:"note deleted succesfully",
        error:"error deleting the note"
    })
if(params.documentid===documentid){
    route.push("/documents")
}
}
if(document===undefined){
    <div>Loading...</div>
}
  return (
    <div className="text-sm">
        <div className="flex items-center gap-x-1 p-2">
            <Search className="h-4 w-4"/>
            <Input value={search} onChange={(e)=>e.target.value}
            placeholder="filtering by page title.."
            className="h-7 px-2 focus-visible:ring-transparent bg-secondary" />

        </div>
        <div className="mt-4 px-1 pb-1">
            <p className="hidden last:block text-sm text-muted text-center pb-2">
                no documents found..
            </p>
{
    filterdocuments?.map((doc)=>{
        return(
            <div
            key={doc._id}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5
             flex items-center text-primary justify-between"
             onClick={()=>doc._id}>
               <span className="truncate pl-2">{doc.title}</span>
               <div className="flex items-center">
                <div role="button" onClick={(e)=>onrestore(e,doc._id)}
                    className="rounded-sm hover:bg-neutral-200 p-2">
                        <Undo className="h-4 w-4 text-muted-foreground"/>
                </div>
                <Confirm onConform={()=>onremove(doc._id)}>
                <div role="button" 
                className="rounded-sm hover:bg-neutral-200 p-2">
                        <Trash className="h-4 w-4 text-muted-foreground"/>
                </div>
                </Confirm>
               </div>
            </div>
        )
    })
}
        </div>
    </div>
  )
}

export default TrashBox