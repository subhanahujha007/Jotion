
import {v} from "convex/values"
import {mutation,query} from "./_generated/server"
import {Doc,Id} from "./_generated/dataModel"

export const get =query({
handler:async(ctx)=>{
    const identity=await ctx.auth.getUserIdentity()
    if(!identity)throw new Error("user not authenticated")
        const document=await ctx.db.query("Documents").collect()
return document
}
})
export const create=mutation({
    args:{
        title:v.string(),
        Parentdocument:v.optional(v.id("Documents"))
    },
    handler:async(ctx, args)=> {
        const identity=await ctx.auth.getUserIdentity()
        if(!identity)throw new Error("user not authenticated")
            const userid=identity.subject
        const document=await ctx.db.insert("Documents",{
            title:args.title,
            Parentdocument:args.Parentdocument,
            userid,
            isArchived:false,
            isPublished:false,
        })
        return document
        },
})