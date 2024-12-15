'use client'
import React, { useEffect, useState } from "react"
import { UpdateUserData, user_data } from "@/actions/userAction"
import { useSession } from "next-auth/react"
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const DashboardComp =  () => {
  const{data:session,update}=useSession();

  useEffect(() => {
    getData();
  }, [session])
  

  const [dashboardDetails, setDashboardDetails] = useState({
    name: "",
    Email: "",
    profilepic: "",
    coverpic: "",
    Razorpay_ID: "",
    Razorpay_Secret: "",
  })

  const handleDashboardDetails = (e:any) => {
    const { name, value } = e.target;
    setDashboardDetails({
      ...dashboardDetails,
      [name]: value
    });
  }

  const getData= async ()=>{
    let u = await user_data(session?.user?.email);
    setDashboardDetails(u);
  }


const handleSubmit= async()=>{
  update();
  await UpdateUserData(dashboardDetails,session?.user?.name);
  toast('Profile updated', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });
}

  return (
    <>
    
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
    {/* Same as */}
    <ToastContainer />

    <div className="w-1/2 m-auto p-10">
      <h1 className="text-4xl font-semibold py-8">Fill Your Details</h1>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={dashboardDetails.name}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="email"
          placeholder="Enter Your Email"
          name="Email"
          value={dashboardDetails.Email}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="text"
          placeholder="Enter Your profile picture URL"
          name="profilepic"
          value={dashboardDetails.profilepic}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="text"
          placeholder="Enter Your cover picture URL"
          name="coverpic"
          value={dashboardDetails.coverpic}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="text"
          placeholder="Enter Your Razorpay ID"
          name="Razorpay_ID"
          value={dashboardDetails.Razorpay_ID}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 bg-stone-700 rounded-full"
          type="text"
          placeholder="Enter Your Razorpay Secret"
          name="Razorpay_Secret"
          value={dashboardDetails.Razorpay_Secret}
          onChange={handleDashboardDetails}
          />
        <input
          className="p-3 w-1/6 bg-stone-600 rounded-md m-auto cursor-pointer"
          type="submit"
          value="Submit"
          />
      </form>
    </div>
          </>
  )
}

export default DashboardComp;
