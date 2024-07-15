"use client"
import { ChevronDown, ChevronRight, LucideIcon } from 'lucide-react'
import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel';
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
  const chervonicon=expanded ? ChevronDown:ChevronRight
  return (
    <div role="button" onClick={onClick} style={{paddingLeft:"12px"}}
    className="group hover:bg-primary/5 py-4 pr-3 w-full min-h-[27px] flex items-center text-muted-foreground font-medium"
    >
      <Icon className="text-muted-foreground mr-3 h-[18px] shrink-0"/>
      <span className="truncate">{label}</span></div>
  )
}

export default Item