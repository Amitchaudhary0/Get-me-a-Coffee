import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import { dbConnect } from "@/db/dbconnect";

export const POST=async(req)=>{
    await dbConnect();
    let body = await req.formData()
    body = Object.fromEntries(body);
    let p = await Payment.findOne({oid:body.razorpay_order_id});
    
    if(!p){
        return NextResponse.json({success:false, message: "Order Id Not Found"})
    }
    let verify = validatePaymentVerification({"order_id": body.razorpay_order_id, "payment_id": body.razorpay_payment_id }, body.razorpay_signature, process.env.KEY_SECRET as string);
    
    if(verify){
        const updatedPayment = await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:true},{new:true});

        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentDone=true`)
    }

    else{
        return NextResponse.json({success:false, message: "Payment Verification Failed"})
    }
}

// export const GET=async()=>{
// try {
//     await dbConnect();
//     let p = await Payment.find({done:true});
//     return NextResponse.json(p)
// } catch (error) {
//     return NextResponse.json({success: false,Get_error:error})
// }
    
// }