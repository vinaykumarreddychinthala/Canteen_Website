import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";



export async function getStatusModel(){
    const mongooseInstance = await connectToDatabase();
    const db = mongooseInstance.connection.useDb("customer_details");
    const statusschema = new mongoose.Schema({
        username:{
           type : String,
           required : true, 
        },
        iscompleted :{
            type : Boolean,
            required : true,
        },
        timedelay : {
            time : Number,
            required : true,
        }
    
    });


    return db.models.Status || db.model("Status", statusschema);
}


