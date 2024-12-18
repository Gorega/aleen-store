import {connect} from "../../../mongoose/db";
import Tag from "../../../mongoose/models/tag";

export async function GET(request){
    if(request.method === "GET"){
        await connect();
        const tags = await Tag.find({}).sort("order");
        return Response.json(tags);
    }
}

export async function POST(request){
    if(request.method === "POST"){
        await connect();
        const tags = await Tag.create();
        return Response.json(tags);
    }

}