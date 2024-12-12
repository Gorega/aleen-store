import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    country:String,
    firstName:{
        type:String,
        required:[true,"الرجاء ادخال اسمك الاول"]
    },
    lastName:{
        type:String,
        required:[true,"الرجاء ادخال اسم العائلة"]
    },
    phone:{
        type:Number,
        required:[true,"الرجاء ادخال رقم هاتف صحيح"]
    },
    neighbourhood:{
        type:String,
        required:[true,"الرجاء إدخال القرية/ المخيم/ المنطقة"]
    },
    address:{
        type:String,
        required:[false,"الرجاء ادخال العنوان بشكل سليم"]
    },
    city:{
        type:String,
        required:[true,"الرجاء ادخال اسم مدينتك"]
    },
    place:String,
    paymentMethod:String,
    products:Array,
    discountCode:{
        type:String,
        required:[false,"الرجاء ادخال كود خصم صالح"]
    }
},{timestamps:true})

const Order = mongoose.models.order || mongoose.model("order",orderSchema);

export default Order;