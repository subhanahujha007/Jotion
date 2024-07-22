import React from 'react'
import { Doc } from '../../../../convex/_generated/dataModel'
interface toolbartype {
    initialdata:Doc<"Documents">,
    preview?:boolean
}
const Toolbar = ({initialdata,preview}:toolbartype) => {
  return (
    <div className="pl-[54px] group  relative">
        {!!initialdata.icon && !preview && (
<div className="group/icon pt-6 flex items-center gap-x-2">
     
</div>
        )}
    </div>
  )
}

export default Toolbar