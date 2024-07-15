
import {v} from "convex/values"
import {mutation,query} from "./_generated/server"
import {Doc,Id} from "./_generated/dataModel"
export const archive=mutation({
    args:{
        id:v.id("Documents")
    },
    handler:async(ctx, args_0)=> {
        const identity=await ctx.auth.getUserIdentity()
        if(!identity)throw new Error("user not authenticated")
            const userid=identity.subject
const existingdocuments=await ctx.db.get(args_0.id)
if(!existingdocuments)throw new Error("not found")
    if(existingdocuments.userid!=userid){
        throw new Error("not authorized")
    }
    const recursive=async(documentid:Id<"Documents">)=>{
       const children= await ctx.db.query("Documents").withIndex("by_parents",(q)=>(
            q.eq("userid",userid).eq("Parentdocument",documentid)
        )).collect()
    

    for( const child of children){
        await ctx.db.patch(child._id,{
            isArchived:true
        })
        await recursive(child._id)
    }
}   
    const document=await ctx.db.patch(args_0.id,{
        isArchived:true
    })
return document
    },
})

export const sidebar=query({
    args:{
        Parentdocument:v.optional(v.id("Documents"))
    },
    handler:async(ctx, args_0)=> {
        const identity=await ctx.auth.getUserIdentity()
        if(!identity)throw new Error ("user not authenticated")
            const userid=identity.subject
        const documents = await ctx.db
        .query("Documents")
        .withIndex("by_parents", (q) =>
          q.eq("userid", userid).eq("Parentdocument", args_0.Parentdocument)
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .order("desc")
        .collect();
  

    return documents
    },
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