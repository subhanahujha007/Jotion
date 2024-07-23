import React, { ElementRef, useRef, useState } from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { Iconpicker } from '@/components/icon-picker'
import { Button } from '@/components/ui/button'
import { ImageIcon, Smile, X } from 'lucide-react'
import TextareaAutosize from "react-textarea-autosize"
import { useCoverimageStore } from '../../../../hooks/use-cover-image'
interface toolbartype {
    initialdata:Doc<"Documents">,
    preview?:boolean
}
const Toolbar = ({initialdata,preview}:toolbartype) => {
  const inputref=useRef<ElementRef<"textarea">>(null)
  const [isediting,setediting]=useState(false)
  const [value,setvalue]=useState(initialdata.title)
  const update=useMutation(api.Documents.update)
  const onremoveicon=useMutation(api.Documents.iconremove)
  const Coverimage=useCoverimageStore()
  const enableinput=()=>{
    if(preview) return 
    setediting(false)
    setTimeout(() => {
      setvalue(initialdata.title)
      inputref.current?.focus()
    }, 0);
  }
  const disableinput=()=>{setediting(false)}
  const oninput=(v:string)=>{
    setvalue(v)
    update({
      id:initialdata._id,
      title:value
    })
  }
const onkeydown=(e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
if(e.key==="Enter"){
  e.preventDefault()
  disableinput()
}
}
const onselect=(icon:string)=>{
update({
  id:initialdata._id,
  icon:icon
})
}
const onremove=()=>{
  onremoveicon({
    id:initialdata._id,
  })
}
  return (
    <div className="pl-[54px] group  relative">
        {!!initialdata.icon && !preview && (
<div className="group/icon pt-6 flex items-center gap-x-2">
     <Iconpicker onchange={onselect}>
      <p className="text-6xl hover:opacity-75 transition">{initialdata.icon}</p>
     </Iconpicker>
     <Button
     onClick={onremove}
     className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
     variant="outline"
     size="icon">
      <X className="h-4 w-4"/>
     </Button>
</div>
        )}
        {
          !!initialdata.icon && preview && (
            <p className="text-6xl pt-6">
              {initialdata.icon}
            </p>
          )
        }
        <div className='opacity-0 group-hover:opacity-100 flex items-center py-1 gap-x-1'>
          {
            !initialdata.icon && !preview &&(
              <Iconpicker aschild onchange={onselect}>
                <Button className="text-muted-foreground text-xs" variant="outline" size="sm">
                  <Smile className="h-4 w-4 mr-2"/>
                  Add an icon
                </Button>
              </Iconpicker>
            )
          }
          {
            !initialdata.coverimage && !preview &&(
              <Button onClick={Coverimage.onOpen}
              className="text-muted-foreground text-xs"
              size="sm"
              variant="outline">
                Add Cover
                <ImageIcon/>
              </Button>
            )
          }
        </div>
        {
          isediting && !preview ? (
              <TextareaAutosize 
              ref={inputref}
              onBlur={disableinput}
              onKeyDown={onkeydown}
              value={value}
              onChange={(e)=>oninput(e.target.value)}
              className="font-bold text-5xl bg-transparent break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]
              resize-none"
              />
          ):(
<div
onClick={enableinput}
className="pb-[11.5px] text-5xl font-bold break-words outline-none  text-[#3F3F3F] dark:text-[#CFCFCF]">
  {initialdata.title}
</div>
          )
        }
    </div>
  )
}

export default Toolbar