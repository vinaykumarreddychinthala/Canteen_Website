import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';

export async function DetailsModel(){
    const mongooseInstance = await connectToDatabase();
    const db = mongooseInstance.connection.useDb("mydatabase");

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        }
    }, { timestamps: true });
    
    // {timestamps: true } adds two fields "createdAt" and "updatedAt" => when the document is created and is updated.
    
    return db.models.User || mongoose.model('User', userSchema,'users');



}


