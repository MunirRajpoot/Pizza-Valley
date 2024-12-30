import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const orderSchema = new mongoose.Schema({
   
    email: { type: String, required: true, unique: true },
    order_date:{
        type:Array,
        required:true
    }

},
    { timestamps: true }


)

const Orders = mongoose.models.Orders || mongoose.model('Orders', orderSchema);

export default Orders;