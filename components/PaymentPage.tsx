'use client';
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { initiate, user_data } from '@/actions/userAction';
import { useSession } from 'next-auth/react';
import LoadingIcons from 'react-loading-icons'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";



const PaymentPage = ({ username, suppoters }: any) => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const route = useRouter();

  const [loading, setLoading] = useState(true); // Loading state
  const [paymentData, setPaymentData] = useState({
    name: '',
    comment: '',
    amount: '',
  });

  const [userDataField, setuserDataField] = useState({
    name: '',
    Email: '',
    profilepic: '',
    coverpic: '',
    Razorpay_ID: '',
    Razorpay_Secret: '',
  });

  useEffect(() => {
    if (session?.user?.email) {
      getData();
    }
  }, [session]);

  useEffect(() => {
    if (searchParams.get("paymentDone") == "true" ) {
      toast('Thanks for the Donations!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      route.push(`/${username}`)
    }
  }, [loading])


  const getData = async () => {
    if (session?.user?.email) {
      const u = await user_data(session.user.email);
      setuserDataField(u);
    }
    setLoading(false);
  };

  const handlePaymentData = (e: any) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const pay = async (amount: any) => {
    const a = await initiate(amount, username, paymentData);
    const orderId = a.id;

    var options = {
      key_id: process.env.NEXT_PUBLIC_KEY_ID as string, // Enter the Key ID generated from the Dashboard
      amount: amount * 100,
      currency: 'INR',
      name: 'Get me Coffee',
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();


  };

  return(
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
      <ToastContainer />

      {loading?( <div className="min-h-screen overflow-hidden flex justify-center">
      <LoadingIcons.TailSpin />
    </div>):( <>

      

<Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
<div className="min-h-screen overflow-hidden">
  <div className="h-1/2 w-4/5 m-auto relative">
    <div className="coverImg w-full h-[350px] overflow-hidden">
      <img
        className="object-cover w-full"
        src={
          userDataField.coverpic ||
          'https://cdn-images.dzcdn.net/images/cover/9d62b7758b3f37567d427b119e234e3c/500x500-000000-80-0-0.jpg'
        }
        alt="Cover"
      />
    </div>
    <img
      className="w-28 h-28 absolute -bottom-14 left-[calc(50%-3.5rem)] rounded-full z-5"
      src={
        userDataField.profilepic ||
        'https://cdn.sortiraparis.com/images/1002/66131/1025167-pokemon-presents-date-heure-attentes-tout-ce-que-vous-devez-savoir-sur-l-evenement.jpg'
      }
      alt="Profile"
    />
  </div>
  <div className="flex flex-col items-center mt-16 gap-2">
    <span>@{userDataField.name || session?.user?.name?.replaceAll('%20', ' ')}</span>
    <span className="text-slate-300">{ userDataField.Email || 'Email not provided'}
    </span>
    <span className="text-slate-300">{suppoters.length} Payemnts . {userDataField.name} . has raised ₹{suppoters.reduce((a,b)=>a+b.amount,0)}</span>
  </div>
  <div className="flex m-5 gap-2">
    <div className="left w-1/2 bg-zinc-800 p-4 flex flex-col rounded-md">
      <h1 className="font-bold text-2xl mb-3">Suppoters</h1>
      {suppoters.length == 0 && <h1>No Payments Yet</h1>}
      {suppoters.slice(0,10).map((e, index) => {
        return (
          <span key={index}>
            {e.name} donated{' '}
            <span className="font-bold">₹{e.amount}</span> message: "
            {e.message}"
          </span>
        );
      })}
    </div>
    <div className="right w-1/2 bg-zinc-800 p-4 flex flex-col gap-2 rounded-md">
      <h1 className="font-bold text-2xl mb-3">Make a Payment</h1>
      <input
        className="p-2 bg-black rounded-sm" 
        type="text"
        placeholder="Enter Name"
        name="name"
        value={paymentData.name}
        onChange={handlePaymentData}
      />
      <input
        className="p-2 bg-black rounded-sm"
        type="text"
        placeholder="Enter Comment"
        name="comment"
        value={paymentData.comment}
        onChange={handlePaymentData}
      />
      <input
        className="p-2 bg-black rounded-sm"
        type="text"
        placeholder="Enter Amount"
        name="amount"
        value={paymentData.amount}
        onChange={handlePaymentData}
      />
      <button
        className="w-1/5 rounded-sm hover:bg-stone-600 bg-black p-2 disabled:cursor-not-allowed"
        disabled={paymentData.name.length>3 && paymentData.comment.length>4 && paymentData.amount.length>0?false:true}
        onClick={() => pay(paymentData.amount)}
      >
        Pay
      </button>
      <div className="amounts flex gap-2">
        <button
          className="w-20 rounded-full hover:bg-black bg-stone-600 p-2 disabled:cursor-not-allowed"
          disabled={paymentData.name.length>3 && paymentData.comment.length>4 && paymentData.amount.length<1?false:true}
          onClick={() => pay(10)}
        >
          Pay ₹10
        </button>
        <button
          className="w-20 rounded-full hover:bg-black bg-stone-600 p-2 disabled:cursor-not-allowed"          
          disabled={paymentData.name.length>3 && paymentData.comment.length>4 && paymentData.amount.length<1?false:true}
          onClick={() => pay(50)}
        >
          Pay ₹50
        </button>
        <button
          className="w-20 rounded-full hover:bg-black bg-stone-600 p-2 disabled:cursor-not-allowed"          
          disabled={paymentData.name.length>3 && paymentData.comment.length>4 && paymentData.amount.length<1?false:true}
          onClick={() => pay(100)}
        >
          Pay ₹100
        </button>
      </div>
    </div>
  </div>
</div>
</>)}
    </>
  )

};

export default PaymentPage;
