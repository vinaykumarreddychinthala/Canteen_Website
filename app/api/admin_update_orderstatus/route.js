import { getStatusModel } from "@/models/orderstatus";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const OrderStatus = await getStatusModel();
        const body = await req.json();
        const newstatus = new OrderStatus({username: body.username , iscompleted: body.isCompleted , timedelay: body.estimatedtime});
        await newstatus.save();
        return NextResponse.json({message: "orderstatus updated successfully"},{status:200});
    }catch(error){
        return NextResponse.json({message:"failed to place order",error: error.message},{status:500});
    }
}