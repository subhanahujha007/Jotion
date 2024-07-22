import React from 'react'
import { Doc, Id } from '../../../../convex/_generated/dataModel'
import { useRouter } from 'next/navigation'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
interface elements{
    documentid:Id<"Documents">
}
const Banner = ({documentid}:elements) => {
    const router=useRouter()
    const remove=useMutation(api.Documents.remove)
    const restore=useMutation(api.Documents.restore)
    const onremove=()=>{
        const promise=remove({id:documentid})
        toast.promise(promise,{
            loading:"Deleting the node",
            success:"node deleted forever",
            error:"error deleting the node"
        })
        router.push("/documents")
    }
    const onrestore=()=>{
        const promise=restore({id:documentid})
        toast.promise(promise,{
            loading:"restoring the node",
            success:"node resored",
            error:"error restoring the node"
        })
        
    }
  return (
    <div className="bg-rose-500 w-full text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>This page is in the trash</p>
        <Button
        size="sm"
        onClick={onrestore}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white  p-1 px-2 h-auto font-normal
        " >
            restore page
        </Button>
        
        <Button
        size="sm"
        onClick={onremove}
        variant="outline"
        className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white  p-1 px-2 h-auto font-normal
        " >
            remove page
        </Button>
        </div>
)
}

export default Banner