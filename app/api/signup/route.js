import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user"; // Import the Mongoose User model
import { connectDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB(); // Ensure the database is connected

    const { username, email, password, phonenumber } = await req.json();

    // Check if a user with the same email already exists using the Mongoose model
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        {
          status: 400
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user using the Mongoose User model
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phonenumber,
    });


    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      {
        status: 201
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500
      }
    );
  }
}