import { connect } from "../../../../mongoose/db";
import Product from "../../../../mongoose/models/product";

export async function GET(request,{params}){
    await connect()
    if(request.method === "GET"){
       const {section} = await params;
       const {searchParams} = new URL(request.url);
       const sort_by = searchParams.get("sort_by");
       const page = parseInt(searchParams.get("page")) || 1;
       const productsPerPage = parseInt(searchParams.get("skip")) || 4;
         // Calculate how many items to skip
        const skip = (page - 1) * productsPerPage;
         // Get the total number of products
        const totalItems = await Product.find({section}).countDocuments();

       const products = await Product.find({section})
                                    .sort(sort_by)
                                    .skip(skip)
                                    .limit(productsPerPage)
       return Response.json({
        data:products,
        pagination:{
            currentPage:page,
            totalPages:Math.ceil(totalItems / productsPerPage)
        }
       });
    }
}