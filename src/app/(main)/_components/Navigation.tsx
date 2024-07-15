"use client"
import React, { useState, useRef, useEffect } from 'react'
import { Menu, PlusCircle } from "lucide-react"
import UserItem from './UserItem'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Item from "../_components/Item"
import { toast } from 'sonner'
const Navigation = () => {
    const documents= useQuery(api.Documents.get)
    const create=useMutation(api.Documents.create)
    const [open, setOpen] = useState(false)
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [isResizing, setIsResizing] = useState(false)

    const MIN_WIDTH=200
    const MAX_WIDTH=400
    const closeSidebar = () => {
        setOpen(false)
    }

    const openSidebar = () => {
        setOpen(true)
    }

    const handleMouseDown = () => {
        setIsResizing(true)
    }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing || !sidebarRef.current) return
        const newWidth = e.clientX - sidebarRef.current.getBoundingClientRect().left
        if (newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH) {
            sidebarRef.current.style.width = `${newWidth}px`
        }
    }

    const handleMouseUp = () => {
        setIsResizing(false)
    }

    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isResizing])

const handlecreate=()=>{
    const promise=create({title:"Untitled"})
    toast.promise(promise,{
        loading:"creating a new node",
        success:"new node created",
        error:"error creating a new node"
    })
}

    return (
        <>
            {
                !open ? (
                    <Menu onClick={openSidebar} />
                ) : (
                    <aside ref={sidebarRef} id='sidebar' className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]">
                        <div className='flex flex-row'>
                            <Menu onClick={closeSidebar} />
                            <UserItem/>
                            
                        </div>

                        <div className='mt-4'>
                        <Item onClick={handlecreate} label="New Page" icon={PlusCircle} />
                            {
                                documents?.map((document)=>{
                                    return <p key={document._id}>{document.title}</p>
                                })
                            }
                        </div>
                        <div
                            onMouseDown={handleMouseDown}
                            className='opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 right-0 top-0 bg-primary/10'
                        />
                    </aside>
                )
            }
        </>
    )
}

export default Navigation
