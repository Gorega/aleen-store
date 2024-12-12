import mongoose from "mongoose";

export const connect = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        return connection;
    }catch(err){
        console.log(err)
    }
}