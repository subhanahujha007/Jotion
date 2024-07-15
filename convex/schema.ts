import { defineSchema,defineTable} from "convex/server"
import {v} from "convex/values"
export default defineSchema({
    Documents:defineTable({
        title:v.string(),
        userid:v.string(),
        icon:v.optional(v.string()),
        isArchived:v.boolean(),
        coverimage:v.optional(v.string()),
        content:v.optional(v.string()),
        isPublished:v.boolean(),
        Parentdocument:v.optional(v.string())
    })
    .index("by_userid",["userid"])
    .index("by_parents",["Parentdocument","userid"])
})