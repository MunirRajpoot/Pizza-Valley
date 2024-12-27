import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
   
},
    { timestamps: true }


)

const Users = mongoose.models.Users || mongoose.model('Users', userSchema);

export default Users;