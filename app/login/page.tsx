"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";

const login = () => {

  const {data: session} = useSession()
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/dashboard"); // Redirect to the home page if logged in
    }
  }, [session, router]);

  return (
    <div className="h-screen">
      <div className="container m-auto relative h-full ">
        <h1 className='text-white text-center font-bold text-4xl pb-[10%]'>Login To Get Your Fans Support You</h1>

          <button className=' text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-sm text-sm px-4 py-2 text-center flex justify-center items-center m-auto gap-3 '  onClick={()=>signIn("github")}> <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/60/github.png" alt="github"/> <span>Continue With GitHub </span></button>

      </div>
    </div>
  )
}

export default login
