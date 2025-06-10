import { connectDB_2 } from "@/lib/mongodb";
import { getOrderModel } from "@/models/order_model";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const conn = await connectDB_2();
        const Order = getOrderModel(conn);
        const orders = await Order.find();
        return NextResponse.json(orders,{status:200});
    }catch(error){
        console.error("GET/api/admin-orders error:", error);
        return NextResponse.json(
            {message: "failed to fetch orders",error:error.message},
            {status:500},
        );  
    }
}