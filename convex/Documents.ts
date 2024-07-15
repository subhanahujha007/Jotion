
import {v} from "convex/values"
import {mutation,query} from "./_generated/server"
import {Doc,Id} from "./_generated/dataModel"
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