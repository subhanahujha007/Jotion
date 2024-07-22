"use client"
import React, { useRef, useState } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { Button } from '@/components/ui/button'
import { api } from '../../../../convex/_generated/api'
import { Input } from '@/components/ui/input'
interface titleprops{
    initialdata:Doc<"Documents">
}
const Title = ({initialdata}:titleprops) => {
    
  const inputref=useRef<HTMLInputElement>(null)
  const [title,setitle]=useState(initialdata.title || "Untitled")
    const update=useMutation(api.Documents.update)
    const[isediting,setediting]=useState(false)
    const enabletitle=()=>{
        setitle(initialdata.title)
        setediting(true)
        setTimeout(() => {
            inputref.current?.focus()
            inputref.current?.setSelectionRange(0,inputref.current.value.length)
        }, 0);
    }
    const disable=()=>{setediting(false)}
const onchange=(event:React.ChangeEvent<HTMLInputElement>)=>{
setitle(event.target.value)
update(
    {
        id:initialdata._id,
        title:event.target.value || "Untitled"
    }
)
}
const keydown=(event:React.KeyboardEvent)=>{
    if(event.key==="Enter"){
        disable()}
}

  return (
   <div className="flex items-center gap-x-1">
{!!initialdata.icon && <p>{initialdata.icon}</p>}
{
    isediting?(
<Input
className="h-7 px-2 focus-visible:ring-transparent"
ref={inputref}
onClick={enabletitle}
onBlur={disable}
onChange={onchange}
onKeyDown={keydown}
value={title}
/>
    ):(
        <Button
        onClick={enabletitle}
        variant="ghost"
        size="sm"
        className="font-normal h-auto p-1">
           <span className="truncate">
           {initialdata.title}
           </span>
            </Button>
    )
}
   </div>
  )
}

export default Title