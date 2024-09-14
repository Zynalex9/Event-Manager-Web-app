import { NextRequest, NextResponse } from "next/server";
import User from "../../../../../Models/userModel";
import bcryptjs from "bcryptjs";
import { connectDB } from "../../../../../dbConfig/dbConfig";
import jwt from "jsonwebtoken";
connectDB();
export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email, password } = reqBody;
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "User Does Not Exists" },
      { status: 404 }
    );
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return NextResponse.json({ message: "Invalid Password" }, { status: 404 });
  }
  const tokenData = { id: user._id };
  const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });
  const response = NextResponse.json({
    message:"Logged In Successfully",
    email: user.email
  })
  response.cookies.set("token", token, {
    httpOnly: true,
  });
  return response;
}

