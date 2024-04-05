import { NextResponse } from "next/server";

export async function GET(){

    try{
        const respone = NextResponse.json(
            {message : "logout successful",
            status : 200}
        )
    
        respone.cookies.set("token","",{
            httpOnly : true
        })
    
        return respone
    }catch(error : any){
        return NextResponse.json({
            message : error.message,
            status : 500
        })
    }
}