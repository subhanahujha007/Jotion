"use client"
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'
import React from 'react'
import { api } from '../../../../../../convex/_generated/api'
import { Id } from '../../../../../../convex/_generated/dataModel'
import  Title  from '../../../_components/Title'
import Banner from '@/app/(main)/_components/Banner'
import Toolbar from '@/app/(main)/_components/Toolbar'
import Cover from '@/components/ui/Cover'
import Editor from '@/app/(main)/_components/Editor'

const page = () => {
  const params=useParams()
  const documents=useQuery(api.Documents.getbyid,{
    documentid:params.documentsid as Id<"Documents">
  })
  if(documents===undefined)return(
    <nav className="bg-background dark:bg-[1F1F1F] px-3 py-3 w-full flex items-center gap-x-4">
<Title.Skeelton/>
    </nav>
  )
  if(documents===null)return null
  return (<>
    <nav className="bg-background dark:bg-[1F1F1F] px-3 py-3 w-full flex items-center gap-x-4">
<div className="flex items-center justify-center w-full">
<Title initialdata={documents}/>
</div>
    </nav>
    {
      documents.isArchived && (
        <Banner documentid={documents._id}/>
      )
    }
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
       <Cover url={documents.coverimage} />
    <Toolbar initialdata={documents} />
    <Editor
    onChange={()=>{}}
    initialContent={documents.content}
    />
      </div>
    </div>
    </>
  )
}

export default page