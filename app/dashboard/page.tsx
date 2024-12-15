'use client'
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import DashboardComp from '@/components/DashboardComp';

const Dashboard = () => {
    const {data: session} = useSession()
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.push("/login"); // Redirect to the home page if logged in
    }
  }, [session, router]);
  return (
    <div className="h-screen">
      <DashboardComp/>
    </div>
  )
}

export default Dashboard
