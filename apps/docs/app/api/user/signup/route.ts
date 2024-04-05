import {PrismaClient} from "@repo/db/client";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { signupInputs } from "@repo/db/zod";
var bcrypt = require('bcryptjs');

const prisma = new PrismaClient()

  // Add any other fields present in your user model


export async function POST(req: NextRequest) {

    try{
        const reqBody = await req.json()
        const zodValidation = signupInputs.safeParse(reqBody)
        console.log(zodValidation)
        
        if(!zodValidation.success){
            return NextResponse.json(
                {message : "invalid inputs"},
                {status : 400}
            )
        }
        const {username,email,password} = zodValidation.data
        const existingUser = await prisma.user.findFirst({
            where : {
                email : email
            }
        })
    
        if(existingUser){
            return NextResponse.json({
                message: "User already exists. Please try signing in"
            }, {
                status: 409 
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await prisma.user.create({
            data : {
                username : username,
                password : hashedPassword,
                email : email,
            } 
        })


        const tokenData = {
            id : newUser.id,
            email : newUser.email,
            password : newUser.password
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

    }catch(error: any){
        console.log(error)
        return NextResponse.json(
            {message : error.message},
            {status : 400}
        )
    }
}