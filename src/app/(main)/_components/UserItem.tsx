import React from 'react'
import { ChevronsLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar,AvatarImage } from '@radix-ui/react-avatar'
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { SignOutButton, useUser } from '@clerk/clerk-react'
const UserItem = () => {
    const {user}=useUser()
  return (
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
    <div role="button" className='flex items-center w-full p-3  text-sm hover:bg-primary/5'>
<div className='max-w-[150px] gap-x-2 flex items-center'>
    <Avatar className='h-5 w-5'>
        <AvatarImage src={user!.imageUrl} alt="image" />
        </Avatar>
        <span className='text-start line-clamp-1 font-medium'>
            {user!.fullName}
        </span>
</div>
<ChevronsLeftRight className='rotate-90 ml-2 h-4 w-4 text-muted-foreground'/>
    </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-80' align="start" alignOffset={11} >
       <div className='flex flex-col space-y-4 p-2'>
<p className='text-muted-foreground font-xs font-medium leading-none'>{user?.emailAddresses[0].emailAddress}</p>
       </div>
       <div className='max-w-[150px] bg-secondary gap-x-2 flex items-center'>
       <Avatar className='h-5 w-5'>
        <AvatarImage src={user?.imageUrl} alt="image" />
        </Avatar>
        <span className='text-start line-clamp-1 font-medium'>
            {user!.fullName}
        </span>
       </div>
       <DropdownMenuSeparator/>
       <DropdownMenuItem asChild className='w-full  cursor-pointer text-muted-foreground'>
        <SignOutButton>
            <Button className='max-w-[40px]'>Log Out</Button>
        </SignOutButton>
        </DropdownMenuItem>
        </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default UserItem