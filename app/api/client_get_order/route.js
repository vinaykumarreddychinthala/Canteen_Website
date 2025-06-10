import orderstatusStore from "@/lib/orderstatusStore";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export async function GET(req){
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const username = session.user.name;
    console.log(username);
    if(username){
        return Response.json({message:"user not found"},{status:403});
    }
    const status = orderstatusStore[username];
    console.log(status);
    if(!status){
        return Response.json({message:"order not found."},{status:404});
    }
    return Response.json({
        iscompleted : status[0],
        estimatedtime : status[1],
    });
}