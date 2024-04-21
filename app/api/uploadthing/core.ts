import { createUploadthing, type FileRouter } from "uploadthing/next";

import {auth} from '@clerk/nextjs/server'
 
const f = createUploadthing();
 
const handleAuth = () =>{
    const {userId} = auth()
    if(!userId) throw new Error("Unauthorizated")
    return {userId:userId}
}
 

// must learn these tech all team

export const ourFileRouter = {
  serverImage:f({image:{maxFileSize:"4MB",maxFileCount:1}})
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{}),

  messageFile:f(["image","pdf"])
  .middleware(()=>handleAuth())
  .onUploadComplete(()=>{})

} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;