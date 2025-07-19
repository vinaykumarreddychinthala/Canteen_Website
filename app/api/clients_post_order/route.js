import { getOrderModel } from "@/models/order_model";
import { NextResponse } from "next/server";


export async function POST(req){
    try{
        const Order = await getOrderModel();
        const body = await req.json();
        const neworder = new Order({username:body.username,items:body.items,totalprice:body.totalPrice,user_id:body.user_id});
        await neworder.save();
        const orderresponse = {
            message: "order placed successfully",
            order: neworder,
        }
        return NextResponse.json(orderresponse,{status:200});
    }catch(error){
        console.error("order api error:",error);
        return NextResponse.json({message:"failed to place order",error:error.message},{status:500});
    }
}