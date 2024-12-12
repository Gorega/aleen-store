import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:String,
    desc:String,
    price:Number,
    view:String,
    views:Array,
    stars:Number,
    section:String,
    more:Array
},{timestamps:true})

const Product = mongoose.models.product || mongoose.model("product",productSchema);

export default Product;