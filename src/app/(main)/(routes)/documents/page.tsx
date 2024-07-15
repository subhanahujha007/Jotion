"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { PlusCircle } from 'lucide-react'
import { api } from '../../../../../convex/_generated/api'
import { toast } from 'sonner'
const page = () => {
  const create=useMutation(api.Documents.create)
  const {user}=useUser()
  const oncreate=()=>{
    const promise=create({title:"Untitled"})
   toast.promise(promise,{
    loading:"Creating a new note",
    success:"new note created",
    error:"Error creating a new note"
   }) 
  }
  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <h1 className='text-lg font-medium'>welcome to {user?.firstName}&apos;s jotion</h1>
      <Button onClick={oncreate}>
<PlusCircle className='m-2'/>
create a new note
      </Button>
    </div>
  )
}

export default page