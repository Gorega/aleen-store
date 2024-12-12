import { connect } from "../../../../../mongoose/db"
import Product from "../../../../../mongoose/models/product";

export async function GET(request,{params}){
    await connect()
    if(request.method === "GET"){
       const {id} = await params;
       const product = await Product.findById({_id:id})
       return Response.json(product);
    }
}