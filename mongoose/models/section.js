import mongoose from "mongoose"

const sectionSchema = new mongoose.Schema({
    title:String,
    logo:String,
    section:String,
    order:Number,
    sub:Array,
    views:Array    
},{timestamps:true})

const Section = mongoose.models.section || mongoose.model("section",sectionSchema);

export default Section;
