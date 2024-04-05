// import NextAuth, { NextAuthOptions } from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import prisma from "@repo/db/client"
// var compare = require("bcryptjs")

// export const authOptions : NextAuthOptions = {
//     adapter: PrismaAdapter(prisma),
//     session:{
//         strategy : "jwt"
//     },
//     pages : {
//         signIn : "/login"
//     },
//     providers: [
//         CredentialsProvider({

//           name: 'Credentials',

//           credentials: {
//             email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
//             password: { label: "Password", type: "password" }
//           },
//           async authorize(credentials) {
//             if(!credentials?.email || !credentials?.password){
//                 return null
//             }

//             const existingUser = await prisma.user.findUnique({
//                 where : { email : credentials?.email}
//             })

//             if(!existingUser){
//                 return null
//             }

//             const passwordMatch = await compare(credentials.password,existingUser.password)

//             if(!passwordMatch){
//                 return null
//             }

//             return {
//                 id : `${existingUser.id}`,
//                 username : existingUser.username,
//                 email : existingUser.email
//             }
//           }
//         })
//       ]
// }

// export default NextAuth(authOptions)