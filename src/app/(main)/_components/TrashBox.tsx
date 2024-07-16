"use client"
import { useMutation, useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import { toast } from 'sonner'

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
    <div>TrashBox</div>
  )
}

export default TrashBox