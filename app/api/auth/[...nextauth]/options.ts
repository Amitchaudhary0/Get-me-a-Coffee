
import type { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import mongoose from "mongoose";
import User from "@/app/models/User";
import {dbConnect} from "@/db/dbconnect"

export const options: AuthOptions = {
  providers: [
    GitHubProvider({
      name: "GitHub",
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-out",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        
        if (account?.provider == "github") {
          await dbConnect();
          const currentUser = await User.findOne({ email: user.email })
  
          
          if (!currentUser) {          
            const newUser = new User({
              Email: user.email,
              name: profile?.name,
              username: user.name,
              profilepic: profile?.image
            })
            
            await newUser.save();
            
          }
          return true
        }
      } catch (error) {
        console.log("error during sign-in: " + error);
      }
      return true

    },
    async session({ session}) {
      const dbUser = await User.findOne({ email: session.user?.email });
    
      // Only assign to session.user.name if session.user is not undefined
      if (session.user && dbUser) {
        session.user.name = dbUser.username;
      }
    
      return session;
    }
  }
}
