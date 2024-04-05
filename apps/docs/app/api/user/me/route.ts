import { NextRequest, NextResponse } from "next/server";

import { verify } from "jsonwebtoken";
import { PrismaClient } from "@repo/db/client";
import { toast } from "react-hot-toast";
 
const prisma = new PrismaClient()

export async function GET (req : NextRequest) {

    try{
        const token = req.cookies.get("token")?.value || ""
        const decodedToken : any = verify(token,process.env.JWT_SECRET!)
        const userId = decodedToken.id
        const user  = await prisma.user.findFirst({
            where : {
                id : userId
            },
            select : {
                id :true,
                username : true,
                email : true
            }
        })
    
    return NextResponse.json({
        userDetails : user,
        status : 200
    })
    }catch(error){
        return NextResponse.json({
            message : "erroe while getting the user details ",
            status : 500

        })
    }
}