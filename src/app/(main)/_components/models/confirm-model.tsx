"use client"
import { AlertDialogFooter, AlertDialogHeader } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import React from 'react'
interface childrenprops{
    children:React.ReactNode,
    onConform:()=>void
}
const Confirm= ({children,onConform}:childrenprops) => {
    const handleconfirm=(e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>{
e.stopPropagation()
onConform()
    }
  return (
    
   <AlertDialog >
    <AlertDialogTrigger onClick={(e)=>e.stopPropagation()} asChild>
        {children}
    </AlertDialogTrigger>
<AlertDialogContent>
    <AlertDialogHeader>
        <AlertDialogTitle>
            Are u sure about deleting this file?
        </AlertDialogTitle>
        <AlertDialogDescription>
            This action is irreversible
        </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
        <AlertDialogCancel onClick={(e)=>e.stopPropagation()}>
        <Button>Cancel</Button>
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleconfirm}>
            <Button>Confirm</Button>
        </AlertDialogAction>
    </AlertDialogFooter>
</AlertDialogContent>
   </AlertDialog>
   
  )
}

export default Confirm