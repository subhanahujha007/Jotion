import React from 'react'
import { Button } from '@/components/ui/button'
const Footer = () => {
  return (
    <div className='flex space-between w-full p-6 justify-between  items-center underline'>Jotion
    <div>
        <Button variant="ghost">
            Privacy Policy
        </Button>
        <Button variant="ghost">
            Terms And Condition
        </Button>
    </div>
    </div>

  )
}

export default Footer