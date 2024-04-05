"use client"
import axios from "axios"
import router, { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { toast } from "react-hot-toast"

export default function Appbar(){
    const router = useRouter()
    const onPublishTodos = ()=>{
        router.push("/addTodo")
    }

    const onLogout = async() => {
        try{
            const response = await axios.get("/api/user/logout")
            router.push("/login")
            toast.success("logout succesfull")

        }catch(error){
            return NextResponse.json({
                message : "error whileloggin out",
                status : 500
            })
        }
    }

    return (
        <div className="w-screen p-5 border border-gray-300 shadow-md bg-gray-50">
            <div className="flex justify-end">
                <button type="button" onClick={onLogout} className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Logout</button>
                <button type="button" onClick={onPublishTodos} className="text-white  bg-green-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Pusblish TODOS</button>
            </div>
            
        </div>
    )
}