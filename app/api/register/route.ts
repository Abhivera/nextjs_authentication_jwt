import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.model";

ConnectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();
    const existUser = await UserModel.findOne({ email });

    if (existUser) {
      return NextResponse.json({ error: "User is already exist" }, { status: 400 });
    }
    await UserModel.create({ name, email, password });
   return  NextResponse.json({ msg: "User created successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
