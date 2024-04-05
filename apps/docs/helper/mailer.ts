import { PrismaClient } from "@repo/db/client";

var bcrypt = require('bcryptjs');
const prisma = new PrismaClient()
export const sendEmail = async({email,emailType,userId}:any) => {
    try{
        const hashedToken = bcrypt.hash(userId.toString(),10)
        await prisma.user.update({
            where : {
                id :  userId
            },
            data:{
                resetPasswordToken : hashedToken,
                resetPasswordExpires : Date.now() + 3600000
            }
        })
    }catch(error : any){
        throw new Error(error.message )
    }
}