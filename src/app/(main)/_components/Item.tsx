"use client"
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
interface itemprops {
  id?:Id<"Documents">;
  label:String;
  icon:LucideIcon;
  documenticons?:string,
  active?:boolean,
  expanded?:boolean,
  issearch?:boolean,
  level?:number,
  onClick:()=>void;
}
const Item = ({label,icon:Icon,onClick,active,expanded,issearch,level=0,documenticons,id}:itemprops) => {
  const Chervonicon=expanded ? ChevronDown:ChevronRight
  return (
    <div role="button" onClick={onClick} style={{paddingLeft:level?`${(level*12) + 12}`:"12px"}}
    className={cn("group hover:bg-primary/5 py-4 pr-3 w-full min-h-[27px] flex items-center text-muted-foreground font-medium"
      ,active && "bg-primary/5 text-primary"
    )}
    >
      {!!id && (<div role="button" onClick={()=>{}} className='h-full hover:bg-neutral-300 mr-1 rounded-sm'>
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
      )}</div>
  )
}

export default Item