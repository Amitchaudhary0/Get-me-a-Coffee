"use server"
import Razorpay from "razorpay";
import Payments from "@/app/models/Payment";
import { dbConnect } from "@/db/dbconnect";
import User from "@/app/models/User";


export const initiate = async (
  amount, 
  to_username, 
  paymentform
) => {
  await dbConnect();
  var instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_KEY_ID as string, 
    key_secret: process.env.KEY_SECRET as string
  });
  
  const options = {
    amount: Number.parseInt(amount)*100,
    currency: "INR"
  };
  
  const x = await instance.orders.create(options as any);
  
  
  await Payments.create({
    oid: x.id,
    amount:amount,
    to_user:to_username,
    name:paymentform.name ,
    message:paymentform.comment
  });

  return x;
};

export const payment_Data= async ()=>{
await dbConnect();
const p = await Payments.find({done:true}).sort({amount:-1}).lean();
return p;
}

export const user_data = async (email: string) => {
  try {
    await dbConnect();

    // Fetch user details by email
    const user = await User.findOne({ Email: email }).lean();

    if (!user) {
      throw new Error("User not found");
    }

    // Ensure plain object is returned
    return {
      ...user,
      _id: user._id.toString(), // Convert ObjectId to string
    };
  } catch (error) {
    console.error("Error in user_data function:", error);
  }
};


export const UpdateUserData=async (data, oldUserName:string)=>{
  await dbConnect();
  let ndata = data;
  
  if(oldUserName !== ndata.Name){
    let user = await User.findOne({username: ndata.name})
    if(user){
      return console.log("User already exist");
    }
  }
  
  await User.updateOne({Email:ndata.Email},ndata);
  
}