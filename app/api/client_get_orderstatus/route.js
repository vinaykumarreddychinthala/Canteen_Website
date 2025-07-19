import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getStatusModel } from "@/models/orderstatus";

export async function GET(req) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = new URL(req.url);
    const searchparams = url.searchParams;
    const user_id = searchparams.get("user_id");

    try {
        const OrderStatus = await getStatusModel();
        if (!OrderStatus) {
            return NextResponse.json({ error: "Failed to load model" }, { status: 500 });
        }
        const status = await OrderStatus.find({user_id:user_id});
        if (!status) {
            return NextResponse.json({ error: "Order status not found" }, { status: 404 });
        }
        return NextResponse.json(status,{status:200});
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}