import { connect } from "../../../../mongoose/db";
import Product from "../../../../mongoose/models/product";

export async function GET(request,{params}){
    await connect()
    if(request.method === "GET"){
       const {section} = await params;
       const {searchParams} = new URL(request.url);
       const sort_by = searchParams.get("sort_by");
       const product = await Product.find({section}).sort(sort_by)
       return Response.json(product);
    }
}