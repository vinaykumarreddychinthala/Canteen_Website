import { getOrderModel } from "@/models/order_model";
import { NextResponse } from "next/server";

export async function POST(req) {  // ✅ Fix: req was missing
  try {
    const Order = await getOrderModel();
    const result = await req.json();

    // Delete the order
    await Order.deleteOne({ _id: result._id });

    // ✅ Await and use findOne (faster if you're only checking existence)
    const findout = await Order.findOne({ _id: result._id });

    if (findout) {
      // If still found → deletion failed
      return NextResponse.json(
        { message: "Failed to collect the order, please verify" },
        { status: 500 }
      );
    } else {
      // If not found → deletion successful
      return NextResponse.json(
        { message: "Thanks for collecting your order, please visit again" },
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
