"use client"
import { ModeToggle } from '@/components/ui/mode-change'
import React from 'react'
import {SignInButton, UserButton} from "@clerk/clerk-react"
import {useConvexAuth} from "convex/react"
import { Button } from '@/components/ui/button'
const Navbar = () => {
  const {isLoading,isAuthenticated} = useConvexAuth()
  return (
    <div className='flex flex-row justify-between align-top p-1'>
        <div className='underline'>Jotion</div>
        <div className='flex flex-row gap-4'><ModeToggle/>
        {
isLoading && (
  <p>...Loading</p>
)
        }
        {
          !isLoading && !isAuthenticated && (
            <SignInButton mode="modal">
              <Button variant="ghost">
                Log in
              </Button>
            </SignInButton>
          )
        }{
          !isLoading && isAuthenticated && (
            
              <UserButton signInUrl='/' />
           
          )
        }
        </div>
    </div>
  )
}

export default Navbar