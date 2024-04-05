"use client"

import axios from "axios"
import {useState,useEffect} from "react"
import { toast } from "react-hot-toast";
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 
import Appbar from "../components/Appbar";


const Spinner = () => (
    <div className="flex flex-col justify-center items-center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
  );

export default function todos () {
    
    

    interface TodoInputs {
        title: string;
        description: string;
        owner : {
            username : string
        },
        id: number
    }
    
    const[todoDetails,setTodoDetails] = useState<TodoInputs[]>([])
    const [todosRetrieved, setTodosRetrieved] = useState(false);
    const [loading,setLoading] = useState(false)


    const getTodos = async() => {

        try{
            setLoading(true)
            const response = await axios.get("api/todo")
            console.log(response)
            setTodoDetails(response.data.todoDetails)
            setTodosRetrieved(true)
        }catch(error : any){
            toast.error(error.message)
        }finally{
            setLoading(false)
        }

    }

    useEffect(()=>{
        getTodos()
    },[])

    useEffect(() => {
        if (todosRetrieved) {
            toast.success("Todos retrieved successfully");
        }
    }, [todosRetrieved]); // Display the success toast when todosRetrieved changes

    const router = useRouter()

    
    const onDelete = async (id:any) => {
        try {
         
          const respone = await axios.delete("api/todo", { data: { id } });
          console.log(respone)
          if(respone.data.status==200){
            toast.success("Todo deleted successfully");
          }
          getTodos(); // Refresh the todos after deletion
        } catch (error) {
          toast.error("Error deleting todo");
        }
      };

    const updateClick = (id:any)=>{
        router.push(`/todos/${id}`)
    }
      return (
        <>
            <Appbar />
            <div className="flex flex-col justify-center items-center mt-8">
                <div className="text-3xl font-bold ">hello {todoDetails[0]?.owner?.username} 👋</div>
            </div>
    
            <div className="h-screen flex flex-col justify-center items-center -mt-16">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        
                        <div className="text-center">
    
                            {todoDetails.length > 0 ? (
    
                                <div>
    
                                    {todoDetails.map((todo, index) => (
                                        <div className="w-full px-36 p-3 shadow-md bg-gray-50 mb-2" key={index}>
                                            <div className="grid grid-cols-5">
                                                <div  className="col-span-4">
                                                    <h2 className="text-xl font-medium mb-2">{todo.title}</h2>
                                                    <p>{todo.description}</p>
                                                </div>
                                                <div className="col-span-1 flex justify-end">
                                                    <button onClick={() => onDelete(todo.id)} className="text-white m-5 bg-red-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-3 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Delete</button>
                                                    <button onClick={() => updateClick(todo.id)} className="text-white m-5 bg-green-700 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2 me-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-todos-message text-gray-500 text-lg">No Todos right now</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
    
}