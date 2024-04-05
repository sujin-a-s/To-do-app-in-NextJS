import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isPublicPath = path === "/login" || path === "/signup"
    const token = req.cookies.get("token")?.value || ""
    

    if (isPublicPath && token) {
        console.log("Redirecting to home page")
        return NextResponse.redirect(new URL("/todos", req.nextUrl))
    }

    if (!isPublicPath && !token) {
        console.log("Redirecting to login page")
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/addTodo",
        "/todos[id]"
    ]
}