
"use client"

import { useParams, useRouter } from "next/navigation"
import { Doc, Id } from "../../../../convex/_generated/dataModel"
import { useState } from "react"
import { Item } from "./Item"
import { cn } from "@/lib/utils"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { FileIcon } from "lucide-react"
interface documentdata{
    parentdocumentid?:Id<"Documents">;
    level?:number;
    data?:Doc<"Documents">[];
}
export const DocumentItem=({parentdocumentid,level=0}:documentdata)=>{
const route=useRouter()
const params=useParams()
const[expanded,setexpanded]=useState<Record<string,boolean>>({})


const document=useQuery(api.Documents.sidebar,{
    Parentdocument:parentdocumentid
})


const onexpanding=(documentid:string)=>{
setexpanded(prevexpanded=>({
    ...prevexpanded,[documentid]:!prevexpanded[documentid]
}))
}
const redirect=(documentid:string)=>{
route.push(`/documents/${documentid}`)
}

if(document===undefined){
    return(
        <>
        <Item.Skeleton level={level}/>
        {
            level===0 &&(<>
                <Item.Skeleton level={level}/>
                <Item.Skeleton level={level} />
                </>
            )
        }
        </>
    )
}
    return (
    <>
    <p
    style={{paddingLeft:level?`${(level*12) +12}`:"12px"}}
    className={cn("hidden text-sm font-medium text-muted-foreground/50",
        expanded && "last:block",
        level==0 && "hidden"
    )}
    >
        no pages inside
        </p>
        {document.map((documents)=>(
            <div key={documents._id}>
                <Item
                id={documents._id}
                label={documents.title}
                icon={FileIcon}
                documenticons={documents.icon}
                active={params.documentid===documents._id}
                level={level}
                onExpand={()=>onexpanding(documents._id)}
                expanded={expanded[documents._id]}
                onClick={()=>redirect(documents._id)
                }
                />
                 
                {expanded[documents._id] && (
                    <DocumentItem
                    parentdocumentid={documents._id}
                    level={level+1}
                    />
                )}
            </div>
        ))}
        </>
)
}