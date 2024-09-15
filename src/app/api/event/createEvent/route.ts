import { NextRequest, NextResponse } from "next/server";
import Events from "../../../../../Models/eventModel";
import { connectDB } from "../../../../../dbConfig/dbConfig";
connectDB()
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { title, shortDescription, description, EventDate, Location,EventType } = reqBody;
  const event = await Events.findOne({ title });
  if (event) {
    return NextResponse.json(
      { message: `${title} already Exists` },
      { status: 400 }
    );
  }
  const newEvent = new Events({
    title,
    shortDescription,
    description,
    EventDate,
    Location,
    EventType
  });
  const savedEvent = await newEvent.save()
  return NextResponse.json(
    {
      message: "Event created successfully",
      success: true,
      savedEvent,
    },
    { status: 200 }
  );
}
