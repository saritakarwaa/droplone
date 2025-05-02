import {pgTable,integer,boolean,text,uuid, timestamp} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const files=pgTable("files",{
    id:uuid("id").defaultRandom().primaryKey(),

    //basic file/folder information
    name:text("name").notNull(),
    path:text("path").notNull(), //document/project/resume
    size:integer("size").notNull(),
    type:text("type").notNull(), //"folder"

    //storage information
    fileUrl:text("file_url").notNull(), //url to acccess file
    thumbnailUrl:text("thumbnail_url"),

    //Ownership information
    userId:text("user_id").notNull(),
    parentId:uuid("parent_id"), //parent folder id(null for root items)

    //file/folder flags- clicked,marked as star, bookmarked
    isFolder:boolean("is_folder").default(false).notNull(),
    isStarred:boolean("is_starred").default(false).notNull(),
    isTrash:boolean("is_trash").default(false).notNull(),

    //timestamps
    createdAt:timestamp("created_at").defaultNow().notNull(),
    updatedAt:timestamp("updated_at").defaultNow().notNull(),
})

//parent=Each file/folder can have one parent folder
//children: Each folder can have many child files/folder
//one to many relationship

export const fileRelations=relations(files, ({one,many})=>({
    parent:one(files,{
        fields:[files.parentId],
        references:[files.id]
    }),
    children:many(files)
}))

//Type Definitions
export const File=typeof files.$inferSelect
export const NewFile=typeof files.$inferInsert
// These infer TypeScript types for:
// File: selecting from the table.
// NewFile: inserting into the table.

