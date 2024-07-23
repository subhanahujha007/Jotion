"use client"

import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useCoverimageStore } from "../../../../../hooks/use-cover-image"
import { DialogHeader } from "@/components/ui/dialog"
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { update } from "../../../../../convex/Documents";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { SingleImageDropzone } from "@/app/(marketing)/_components/single-image";

export const Coverimagemode=()=>{
    const coverimage=useCoverimageStore()
    const params=useParams()
    const update=useMutation(api.Documents.update)
const [file,setfile]=useState<File>()
const [issubmitting,setissubmitting]=useState(false)
const {edgestore}=useEdgeStore()
const onclose=()=>{
    setfile(undefined)
    setissubmitting(false)
    coverimage.onclose()
}
const onchange=async(file?:File)=>{
if(file){
    setissubmitting(true)
    setfile(file)
     
    const res=await edgestore.publicFiles.upload({file,
        options:{
            replaceTargetUrl:coverimage.url
        }
    })
    await update({
        id:params.documentsid as Id<"Documents">,
        coverimage:res.url
    })}
    onclose()
}

    return(
        <Dialog open={coverimage.isopen} onOpenChange={coverimage.onclose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle><h2 className="test-center text-lg font-semibold">
                        Cover Image
                    </h2></DialogTitle>
                    
                </DialogHeader>
               <SingleImageDropzone
               value={file}
               disabled={issubmitting}
               onChange={onchange}
               className="w-full outline-none"
               />
            </DialogContent>

        </Dialog>
    );
};