import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../dbConfig/dbConfig";
import User from "../../../../../Models/userModel";
connectDB();
export async function GET(request: NextRequest) {
  const users = await User.find();
  if (!users) {
    return NextResponse.json(
      {
        message: "No user found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json({users,},{status: 200,});
}
