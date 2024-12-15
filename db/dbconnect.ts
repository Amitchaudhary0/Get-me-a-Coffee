import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
        
    const db = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB is connected successfuly")
        
    } catch (error) {
        console.log("Db connection failed:" + error);
        process.exit(1);
    }

}