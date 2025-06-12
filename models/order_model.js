import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';


export async function getOrderModel(){
  const mongooseInstance = await connectToDatabase();
  const db = mongooseInstance.connection.useDb("customer_details");

  const orderschema = new mongoose.Schema({
      username : {
          type: String,
          required: true,
      },
      items: [
      {
        id: Number,
        name: String,
        price: Number,
        description: String,
        image: mongoose.Schema.Types.Mixed, // flexible image object
        quantity: Number
      }
    ],
      totalprice:{
          type : Number,
          required : true,
      }
      
  },{timestamps: true});

  return db.models.Order || db.model("Order",orderschema); //to create collection named "orders"

  // if we use "Order" → it creates "orders" 
}


