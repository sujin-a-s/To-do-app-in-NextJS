"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { SigninInputs } from "@repo/db/zod"

export default function LoginPage () {

    const[user,setUser] = useState<SigninInputs>({
        email : "",
        password : ""
    })

    const Spinner = () => (
        <div className="flex flex-col justify-center items-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
      );

    const[loading,setLoading] = useState(false)
    const[disabletheButton,setDisabletheButton] = useState(false)
    const router = useRouter()

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0){
            setDisabletheButton(false)
        }else{
            setDisabletheButton(true)
        }
    },[user])

    const onSignin = async() => {
        try{
            setLoading(true)
            const respone = await axios.post("/api/user/login",user)
            console.log("login success : ",respone.data)
            if(respone.status==200){
                toast.success("login successfull")
                router.push("/todo")
            }

        }catch(error : any) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="bg-gray-200 rounded-md p-10">
                <div className="mb-3 text-center">{loading?<Spinner/>:"Login"}</div>
        

                <div className="flex flex-col">
                    <label>email</label>
                    <input className="bg-slate-100 p-1 border border-black mb-3" onChange={(e)=>setUser({...user, email : e.target.value})} type="text" placeholder="email"></input>
                </div>
                <div className="flex flex-col">
                    <label>password</label>
                    <input className="bg-slate-100 p-1 border border-black mb-3" onChange={(e)=>setUser({...user, password : e.target.value})} type="text" placeholder="password"></input>
                </div>
                <div className=" mt-3 flex justify-center">
                    <button type="button" onClick={onSignin} className="text-white w-3/4 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{disabletheButton?"no Login":"Login"}</button>
                </div>
                <div className=" mt-3 flex justify-center">
                    <Link href="/signup">Go to singup page</Link>
                </div>
            </div>

        </div>
    )
}