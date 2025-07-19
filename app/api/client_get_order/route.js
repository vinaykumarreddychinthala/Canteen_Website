import { NextResponse } from "next/server";
import { getOrderModel } from "@/models/order_model";

export async function GET(req){
    try{
        const url = new URL(req.url); //req.url is (typically) a string, e.g. "/api/cart?user_id=123&foo=bar" &&  constructs a URL object from that string, allowing easy access to different URL components.
        const searchParams = url.searchParams;
        const user_id = searchParams.get("user_id");  //It gives you access to all the query parameters (everything after the ? in your URL) through a convenient API. 
        if (!user_id) {
            return NextResponse.json({ message: "Missing user_id" }, { status: 400 });
        }
        const Order = await getOrderModel();
        const my_orders = await Order.find({user_id:user_id});
        return NextResponse.json(my_orders,{status:200});
    }catch(e){

        console.error("GET/api/client_get_order  error:",e);
        return NextResponse.json(
            {message:"failed to get orders",error:e.message}
        ,{status:500});
    }
}