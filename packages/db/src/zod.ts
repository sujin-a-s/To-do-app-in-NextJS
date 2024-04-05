import { z } from "zod"

export const signupInputs = z.object({
    username : z.string(),
    email : z.string().min(1,"enter the full email").email("invalid email"),
    password : z.string().min(3,"should be more than three characters")
})

export const signinInputs = z.object({
    email : z.string().min(1,"enter the full email").email("invalid email"),
    password : z.string().min(3,"should be more than three characters")
})

export const todoInputs = z.object({
    title : z.string(),
    description : z.string()
})

export type SignupInputs = z.infer<typeof signupInputs>
export type SigninInputs = z.infer<typeof signinInputs>
export type TodoInputs = z.infer<typeof todoInputs> 

