import { PrismaClient } from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import {sign} from "jsonwebtoken"
import { signinInputs } from "@repo/db/zod"; 
var bcrypt = require('bcryptjs');

const prisma = new PrismaClient()

export async function POST(req:NextRequest){

    try{

        const reqBody = await req.json()
        const zodValidation = signinInputs.safeParse(reqBody)
        
        if(!zodValidation.success){
            return NextResponse.json(
                {message : "invalid inputs"},
                {status : 400}
            )
        }
        const{email,password} = reqBody
    
        const existingUser = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
    
        if(!existingUser){
            return NextResponse.json(
                {message : "user not found . Please Sign up first"},
                {status : 400}
            )
        }

        const validPassword = await bcrypt.compare(password,existingUser.password)
        if(!validPassword){
            return NextResponse.json(
                {message : "invalid password"},
                {status : 400 }
            )
        }

        const tokenData = {
            id : existingUser.id,
            email : existingUser.email,
            password : existingUser.password
        }

        const token = await sign(tokenData,process.env.JWT_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message : "login successfull",
            success : true,
            status : 200
        })

        response.cookies.set("token",token,{
            httpOnly : true
        })

        return response



    }catch(error){
        console.log("error : ",error)
        return NextResponse.json(
            {message : "error while logging in"},
            {status : 500}
        )
    }
}