import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.model";
import { GenerateToken } from "@/lib/services/Token.service";

ConnectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
  const isMatch = await existUser.comparePassword(password)
  if(!isMatch){
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }
// generate token

const token = await GenerateToken(existUser._id);

const response = NextResponse.json({ msg: "login successfully" }, { status: 201 });
response.cookies.set("authentication",token,{ httpOnly:true} );
return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
