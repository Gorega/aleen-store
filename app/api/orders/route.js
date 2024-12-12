import { NextResponse } from "next/server";
import {connect} from "../../../mongoose/db";
import Order from "../../../mongoose/models/order";

export async function GET(request){
    if(request.method === "GET"){
        await connect();
        const orders = await Order.find({});
        return Response.json(orders);
    }
}

export async function POST(request){
    if(request.method === "POST"){
        await connect();
        try{
            const body = await request.json();
            const errors = {};
            if(!body.firstName){
                errors.firstName = "الرجاء ادخال الاسم الاول"
            }
            if(!body.lastName){
               errors.lastName = "الرجاء ادخال اسم العائلة"
            }
            if(!body.phone){
                errors.phone = "الرجاء كتابة رقم هاتف صحيح"
            }
            if(!body.city){
                errors.city = "الرجاء ادخال اسم المدينة"
            }
            if(!body.neighbourhood){
                errors.neighbourhood = "الرجاء إدخال القرية/ المخيم/ المنطقة"
            }
            
            if(Object.keys(errors).length > 0){
                return NextResponse.json(
                    {error:"validation error", details:errors},
                    {status:400}
                )
            }
            const orders = await Order.create(body);
            return Response.json(orders);
        }catch(error){
            return NextResponse(
                { error },
                { status: 500}
            )
        }
    }
}