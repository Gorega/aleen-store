import {connect} from "../../../mongoose/db";
import Section from "../../../mongoose/models/section";

export async function GET(request){
    if(request.method === "GET"){
        await connect();
        const sections = await Section.find({}).sort("order");
        return Response.json(sections);
    }
}

export async function POST(request){
    if(request.method === "POST"){
        await connect();
        const sections = await Section.create();
        return Response.json(sections);
    }

}