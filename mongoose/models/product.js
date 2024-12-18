import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:String,
    desc:String,
    price:Number,
    views:Array,
    stars:Number,
    section:String
},{timestamps:true})

const Product = mongoose.models.product || mongoose.model("product",productSchema);

export default Product;