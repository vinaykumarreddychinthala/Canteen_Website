import { getStatusModel } from "@/models/orderstatus";
import { NextResponse } from "next/server";
import {Types} from "mongoose";

export async function POST(req) {
  try {
    const orderStatus = await getStatusModel();
    const body = await req.json();
    const query = { _id: body._id };
    // Delete the order for the given id
    await orderStatus.deleteOne(query);

    //  ISSUE: "id" here is undefined — should be body.id
    const findout = await orderStatus.findOne(query);

    if (findout) {
      // If still found → deletion failed
      return NextResponse.json(
        { message: "Failed to collect the order, please verify" },
        { status: 500 }
      );
    } else {
      // If not found → deletion successful
      return NextResponse.json(
        { message: "Order collected successfully, please visit again" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error while removing order status:", error);
    return NextResponse.json(
      { message: "Failed to remove order status", error: error.message },
      { status: 500 }
    );
  }
}
