"use client"
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";

import {PrismaClient} from "@repo/db/client"
import { useRouter } from "next/navigation";
const client = new PrismaClient()

export default function Page(): JSX.Element {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-center h-screen">
       <button type="button" onClick={()=>router.push("/signup")} className="text-white w-auto bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Click here to Sign Up</button>
    </div>
   
  );
}
