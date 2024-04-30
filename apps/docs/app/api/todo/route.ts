import prisma from "@repo/db/client"
import { todoInputs } from "@repo/db/zod"
import { verify } from "jsonwebtoken"
import { NextRequest } from "next/dist/server/web/spec-extension/request"
import { NextResponse } from "next/dist/server/web/spec-extension/response"
var compare = require("bcryptjs")


export async function POST(req : NextRequest){
    const reqBody = await req.json()
    const token = req.cookies.get("token")?.value || ""
    const decodedToken : any = verify(token,process.env.JWT_SECRET!)
    const userId = decodedToken.id

    const zodValidation = todoInputs.safeParse(reqBody)
    if(!zodValidation.success){
        return NextResponse.json({
            message : "invalid inputs",
            status : 500
        })
    }

    const respone = await prisma.todo.create({
        data : {
            title : reqBody.title,
            description : reqBody.description,
            userId : userId
        }
    })

    return NextResponse.json(
        {message : "todo added successfully"},
        {status : 200}
    )
}


export async function GET(req:NextRequest){

    try{

        const token = req.cookies.get("token")?.value || ""
        const decodedToken : any = verify(token,process.env.JWT_SECRET!)
        const userId = decodedToken.id
    
        const todoDetails = await prisma.todo.findMany({
            where : {
                userId : userId
            },
            select : {
                title : true,
                description : true,
                owner : {
                    select : {
                        username : true
                    }
                },
                id :true
            }
        })
    
        return NextResponse.json({
            todoDetails : todoDetails,
            status : 200
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while retreiving todos",
            status : 500
        })
    }
}






export async function DELETE (req : NextRequest) {

    try{
        const requestBody = await req.text(); // Read the request body as text
        const { id } = JSON.parse(requestBody); // Parse the JSON from the request body

        if (!id) {
            return NextResponse.json({
                message: "Missing ID in request body",
                status: 400 // Bad request
            });
        }
        const respone = await prisma.todo.delete({
            where : {
                id : id
            }
        })
    
        return NextResponse.json({
            message: "todo deleted successfully",
            status: 200
        });

    }catch(error){
        console.log("error : ",error)
        return NextResponse.json({
            message : "error while deleting todo",
            status: 500
        })
    }
}


export async function PUT (req: NextRequest){

    try{
        const reqBody = await req.json()
        console.log("the request body:",reqBody)
        const {id,title,description} = reqBody
    
    
        const updatUser = await prisma.todo.update({
            where : {
                id : Number(id)
            },
            data : {
                title : title,
                description : description
            }
        })

        return NextResponse.json({
            message : "todo updated succesfully",
            status : 200,
            update : updatUser
        })
    }catch(error){
        console.log(error)
        return NextResponse.json({
            message : "error while updating todos",
            status : 500
        })
    }

}