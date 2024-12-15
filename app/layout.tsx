import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Get Me A Coffee!!!",
  description: "Get me a coffee is a app which helps coders to get the coffee from thier fans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <SessionWrapper>
                <Navbar/>
                <div className="relative h-full w-full bg-black pt-12 pb-10">{children}
                </div>        
                <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
