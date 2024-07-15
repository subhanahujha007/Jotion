"use client"
import { ChevronDown, ChevronRight, LucideIcon, Plus } from 'lucide-react'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
interface itemprops {
  id?:Id<"Documents">;
  label:String;
  icon:LucideIcon;
  documenticons?:string,
  active?:boolean,
  expanded?:boolean,
  issearch?:boolean,
  level?:number,
  onExpand?:()=>void;
  onClick:()=>void;
}
export const Item = ({label,icon:Icon,onClick,active,expanded,issearch,level=0,documenticons,id,onExpand}:itemprops) => {
  const route=useRouter()
  const Chervonicon=expanded ? ChevronDown:ChevronRight
  const handlexpand=(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
    event.stopPropagation()
    onExpand?.()
  }

  const create=useMutation(api.Documents.create)
  const oncreate=(event:React.MouseEvent<HTMLDivElement,MouseEvent>)=>{
    event.stopPropagation()
if(!id)return 
const promise=create({title:"Untitled",Parentdocument:id})
.then((documentid)=>{
  if(!expanded){
    onExpand?.()
  }
 

})
toast.promise(promise,{
  loading:"craeting a new child note...",
  success:"new child node created..",
  error:'error creating new child note..'
})  
}
  return (
    <div role="button" onClick={onClick} style={{paddingLeft:level?`${(level*12) + 12}px`:"12px"}}
    className={cn("group hover:bg-primary/5 py-4 pr-3 w-full min-h-[27px] flex items-center text-muted-foreground font-medium"
      ,active && "bg-primary/5 text-primary"
    )}
    >
      {!!id && (<div role="button" onClick={handlexpand} className='h-full hover:bg-neutral-300 mr-1 rounded-sm'>
        <Chervonicon className='h-4 w-4 text-muted-foreground/50 shrink-0'/>
        </div>)}
      <Icon className="text-muted-foreground mr-3 h-[18px] shrink-0"/>
      {documenticons && (
        <div className='shrink-0 m-2 text-[18px]'>
          {documenticons}
        </div>
      )}
      <span className="truncate">{label}</span>
      {issearch && (
        <kbd className='ml-auto pointer-events-none inline-flex h-5 items-center select-none bg-muted rounded border gap-1 px-1.5 text-muted-foreground opacity-100 font-medium text-[13px] font-mono'>
       <span className='text-xs'>CTRL</span>K
        </kbd>
      )}
      {!!id && (
        <div className='ml-auto flex items-center gap-x-2 '>
          <div role="button" onClick={oncreate} className="opacity-0 group-hover:opacity-100 h-full ml-auto hover:bg-neutral-300
          rounded-sm dark:hover:bg-neutral-600">
            <Plus className='h-4 w-4 text-muted-foreground'/>
          </div>
        </div>
      )
}</div>
  )
}
Item.Skeleton = function ItemSkeleton({ level }: { level: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : '12px' }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-[30%] h-4" />
    </div>
  );
};
