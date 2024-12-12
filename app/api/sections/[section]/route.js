import Section from "@/mongoose/models/section";
import { connect } from "@/mongoose/db";

export async function GET(request,{params}){
    if(request.method === "GET"){
        await connect();
        const {section} = await params;
        const sec = await Section.findOne({section})
        return Response.json(sec);
    }
}