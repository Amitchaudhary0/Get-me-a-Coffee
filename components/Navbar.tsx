"use client"
import React, { useState } from 'react'
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

function Navbar() {
  const {data: session} = useSession()
  const [showMenu, setShowMenu] = useState(false)

  if(session) {
    return (<>
      <nav className="h-12 bg-stone-900 text-white flex items-center justify-around fixed w-full z-10">
    <div className="logo text-lg">
      <Link href="/"> GetMe-Coffee </Link>
    </div>
    <div className="links flex items-center gap-3"> 
      <div className="dropdown relative flex gap-2 cursor-pointer" tabIndex={0} onClick={()=>setShowMenu(!showMenu)} onBlur={()=>{setTimeout(()=>{setShowMenu(false) },1000);}}> Welcome 
      <img className='rounded-full' src={session.user?.image || ""} alt="Img" width={25} height={25} />
      <ul  className="dropdownMenu absolute transform -translate-x-1/2 left-1/2 top-12 z-10 bg-stone-900 text-white rounded-md flex-col gap-1.5 p-2 text-[75%] font-semibold font-mono " style={showMenu?{display:"flex"}:{display:"none"}}>
      <li > <Link className='hover:bg-stone-700 w-full p-2 cursor-pointer block' target='_blank' href={`https://mail.google.com/mail/?view=cm&fs=1&to=${session.user?.email}`}> {session.user?.email}</Link></li>
    <li>
      <Link className='hover:bg-stone-700 w-full p-2 cursor-pointer block' href={`${session.user?.name}`}>Your Page</Link>
      </li> 
      <li>
     <Link className='hover:bg-stone-700 w-full p-2 cursor-pointer block' href="/dashboard">Dashboard</Link>
      </li>
      <li className='hover:bg-stone-700 w-full p-2 cursor-pointer'onClick={()=>signOut()}>Logout</li>
      </ul>
      </div>

        {/* <Link className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center" href="/login" onClick={()=>signOut()}>Logout</Link> */}
    </div>
   </nav>
    </>)
  }
  return (
   <nav className="h-12 bg-stone-900 text-white flex items-center justify-around">
    <div className="logo text-lg">
      <Link href="/"> GetMe-Coffee </Link>
    </div>
    <div className="links flex items-center"> 
        <Link className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center" href="/login">Login</Link>
    </div>
   </nav>
  )
}
export default Navbar