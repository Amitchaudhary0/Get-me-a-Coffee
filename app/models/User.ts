import mongoose from "mongoose";

const{Schema,model}=mongoose;

const UserSchema = new Schema({
    Email: { type: String, required: true },
    username: { type: String, required: true },
    name: String,
    profilepic: String,
    coverpic: String,
    Razorpay_ID:String,
    Razorpay_Secret:String,
    createdAt:{type:Date, default:Date.now},
    updatedAt:{type:Date, default:Date.now}
});

export default mongoose.models.User || model('User', UserSchema);

