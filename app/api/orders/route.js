import { connectDB_2} from "@/lib/mongodb";
import { getOrderModel } from "@/models/order_model";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const db2 = await connectDB_2();
        const Order = getOrderModel(db2);
    

        const body = await req.json();
        const neworder = new Order({username:body.username,items:body.items,totalprice:body.totalPrice});
        await neworder.save();
        const orderresponse = {
            message: "order placed successfully",
            order: body.items,
        }
        // console.log(orderresponse);
        return NextResponse.json(orderresponse,{status:200});
    }catch(error){
        console.error("order api error:",error);
        return Response.json({message:"failed to place order",error:error.message},{status:500});
    }
}