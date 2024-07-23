import { cn } from '@/lib/utils'
import  Image  from "next/image"
import React from 'react'
import {Button} from "../ui/button"
import { ImageIcon, X } from 'lucide-react'
import { useCoverimageStore } from '../../../hooks/use-cover-image'
import { useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useParams } from 'next/navigation'
import { Id } from '../../../convex/_generated/dataModel'
import { useEdgeStore } from '@/lib/edgestore'
interface coverprops{
    url:string | undefined,
    preview?:boolean
}
const Cover = ({
url,preview
}:coverprops) => {
    const coverimage=useCoverimageStore()
    const {edgestore}=useEdgeStore()
    const params=useParams()
    const deletecoverimage=useMutation(api.Documents.coverimageremove)
    const deleteingcoverimage=async()=>{
        if(url){await edgestore.publicFiles.delete({
            url:url
        })}
 deletecoverimage({
    id:params.documentsid as Id<"Documents">
})
  onclose  }
  return (
    <div className={cn("relative w-full h-[35vh] group",!url && "h-[12vh]" 
        , url && "bg-muted")}>
            {
                !!url && (
                   <Image
                   src={url}
                   alt='cover-image'
                   className="object-cover"
                   fill
                   />
                )
            }
            {
                url && !preview && (
                    <div className="opacity-100 group-hover:opacity-100 flex absolute items-center gap-x-2
                    bottom-5 right-5">
                        <Button
                        onClick={()=>coverimage.onReplace(url)}
                        variant="outline"
                        className="text-muted-foreground text-xs"
                        size="sm">
                                <ImageIcon className="h-4 w-4 mr-2"/>
                                restore image
                        </Button>
                        <Button
                        onClick={deleteingcoverimage}
                        size="sm"
                        variant="outline"
                        className="text-muted-foreground text-xs">
                                <X className="h-4 w-4 mr-2"/>
                                remove image
                        </Button>
                    </div>
                )
            }
            </div>
  )
}

export default Cover