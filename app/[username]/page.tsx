import PaymentPage from '@/components/PaymentPage';
import React from 'react'
import {payment_Data} from "@/actions/userAction"
import { notFound } from 'next/navigation';
import { dbConnect } from '@/db/dbconnect';
import User from '../models/User';

const username = async({ params }:any) => {

  const checkUser=async()=>{
    await dbConnect();
    let u = await User.findOne({username: params.username});
    if(!u){
      return notFound();
    }
  }
 
  await checkUser();

  let user = await params;
  let SuppotersPaymentData;
  
  try {
    let v = await payment_Data();
    // let data = await fetch("http://localhost:3000/api/razorpay");
    // let fetchedData = await data.json();
      let fetchedData = v;
   SuppotersPaymentData = fetchedData.map((e)=>{return{name:e.name,message:e.message,amount:e.amount}});

  } catch (error) {
    console.log("error on fetching the data from db")
  }


  return (
    <>
      <PaymentPage username={user.username} suppoters={SuppotersPaymentData} />
    </>
  )
}

export default username
