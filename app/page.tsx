import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="text-white flex flex-col justify-center items-center gap-14 py-10">
        <div className="text-6xl font-extrabold ">
          Buy ₹ Me A Coffee
        </div>
        <p>A croudfunding platform for creators. Get funded by your fans and followers. Start now!
        </p>
        <div className="btn">
        <Link href="/dashboard">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
        </Link>
        <Link href="/about">
        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </Link>
        </div>
      </main>
    </div>
  );
}
