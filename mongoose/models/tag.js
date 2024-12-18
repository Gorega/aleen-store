import mongoose from "mongoose"

const tagSchema = new mongoose.Schema({
    title:String,
    logo:String,
    section:String,
    order:Number,
},{timestamps:true})

const Tag = mongoose.models.tag || mongoose.model("tag",tagSchema);

export default Tag;
