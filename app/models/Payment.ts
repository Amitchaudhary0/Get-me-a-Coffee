import mongoose from 'mongoose';
// import { dbConnect } from "@/db/dbconnect"; // Your database connection handler

const { Schema, model } = mongoose;

const userPayments = new Schema({
  name: String,
  to_user: { type: String, required: true },
  oid: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  done: { type: Boolean, default: false },
});

// Ensure DB connection is established before defining models
// export const initializeModel = async () => {
  // await dbConnect(); // Make sure connection is established before using the model
   
// };

export default mongoose.models.Payment || model("Payment", userPayments);
