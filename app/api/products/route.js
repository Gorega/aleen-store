import {connect} from "../../../mongoose/db";
import Product from "../../../mongoose/models/product";

export async function GET(request){
    await connect();
    if(request.method === "GET"){
        const {searchParams} = new URL(request.url);
        const section = searchParams.get("section");
        
        const query = {};
        if(section) query.section = section;

        const products = await Product.find(query);
        return Response.json(products);
    }
}

export async function POST(request){
    await connect();
    if(request.method === "POST"){
        const products = await Product.create()
        return Response.json(products);
    }
}