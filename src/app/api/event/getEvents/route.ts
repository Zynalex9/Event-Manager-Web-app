import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../../../../dbConfig/dbConfig";
import Events from "../../../../../Models/eventModel";
connectDB();
export async function GET(request: NextRequest) {
  const events = await Events.find();
  if (!events) {
    return NextResponse.json(
      {
        message: "No user found",
      },
      {
        status: 404,
      }
    );
  }
  return NextResponse.json({events},{status: 200,});
}
