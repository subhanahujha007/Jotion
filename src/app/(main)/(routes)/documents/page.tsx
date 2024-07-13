"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { PlusCircle } from 'lucide-react'
const page = () => {
  const {user}=useUser()
  return (
    <div className='h-full flex flex-col justify-center items-center space-y-4'>
      <h1 className='text-lg font-medium'>welcome to {user?.firstName}&apos;s jotion</h1>
      <Button>
<PlusCircle className='m-2'/>
create a new note
      </Button>
    </div>
  )
}

export default page