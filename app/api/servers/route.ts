import {v4 as uuid } from "uuid"
import { NextResponse } from "next/server";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";


// route to get the current profile of an user
export async function POST(req:Request)
{
try{
const {name , imageUrl } = await req.json()
const profile = await currentProfile()

if(!profile) return new  NextResponse("unauthorized User",{status:401})

const server = await db.server.create({
    data:{
        profileId :profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels:{
            create:[
                {name:"general" , profileId:profile.id}
            ]
        },
        members:{
            create:[
                {profileId:profile.id , role:MemberRole.ADMIN }
            ]
        }
    }
})

return NextResponse.json(server)
}
catch(e)
{
    console.log("error : "  + e)
    return new NextResponse("internal server error" ,{status: 500})
}
}