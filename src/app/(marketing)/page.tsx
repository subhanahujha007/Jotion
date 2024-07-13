"use client"
import React from 'react'
import Heading from './_components/Heading'
import Footer from './_components/Footer'

const Marketing = () => {
  return (
    <div className='flex flex-col min-h-full'>
      <div className='flex flex-col items-center  justify-center px-6 pb-1  md:justify-start gap-y-8 flex-1 text-center'>
<Heading/>
      </div>
      <div className='items-center mt-[180px] justify-center '>
<Footer/>
      </div>
    </div>
  )
}

export default Marketing