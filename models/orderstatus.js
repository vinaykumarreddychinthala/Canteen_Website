import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";

const statusschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  iscompleted: {
    type: Boolean,
    required: true,
  },
  timedelay: {
    type: Number,
    required: true,
  }
});

export async function getStatusModel() {
  const mongooseInstance = await connectToDatabase();
  const db = mongooseInstance.connection.useDb("customer_details");
  return db.models.OrderStatus || db.model("OrderStatus", statusschema);
}
