"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import {ArrowRight} from "lucide-react"
import Link from "next/link"
const Heading = () => {
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='font-bold text-3xl sm:text-6xl md:text-5xl'>Your ideas , Documents and plans Unified . Welcome to <span className='underline'>Jotion</span></h1>
    <h3>Jotion is the connected workspace where better and <br /> faster work happens  </h3>
  <div className='flex flex-row gap-4 justify-center'>
  
    <Link href="/documents"><Button>Enter Jotion</Button> <ArrowRight/></Link>

 
    <Link href="/documents"><Button>Get Jotion For Free</Button></Link>  
 
  </div>
    </div>
  )
}

export default Heading