import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.model";
import { GenerateToken, VerifyToken } from "@/lib/services/Token.service";

ConnectDB();
export const GET = async (request: NextRequest) => {
  try {
    const tokenData = await request.cookies.get("authentication")||""
    if(!tokenData){
        return NextResponse.json({ error: "Please login first " }, { status: 401});
      }
   
      const user = await VerifyToken(tokenData.value)

    
    const existUser = await UserModel.findById(user).select("name email");


    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }
    return NextResponse.json({ msg: "Profile Fetched" ,user:existUser}, { status: 200 });

  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
