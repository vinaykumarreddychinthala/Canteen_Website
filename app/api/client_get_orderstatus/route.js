import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getStatusModel } from "@/models/orderstatus";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const username = session.user.name;

    try {
        const OrderStatus = await getStatusModel();
        if (!OrderStatus) {
            return NextResponse.json({ error: "Failed to load model" }, { status: 500 });
        }
        const status = await OrderStatus.findOne({ username: username });
        if (!status) {
            return NextResponse.json({ error: "Order status not found" }, { status: 404 });
        }
        return NextResponse.json({
            iscompleted: status.iscompleted,
            estimatedtime: status.timedelay,
        });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}