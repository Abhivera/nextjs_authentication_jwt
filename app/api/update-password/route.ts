import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.model";
import { VerifyTokenReset } from "@/lib/services/Token.service";
import { SendEmail } from "@/lib/services/MainService";

ConnectDB();
export const POST = async (request: NextRequest) => {
  try {
    const {password,confirm_password,token} = await request.json();
   

    if (password!==confirm_password) {
      return NextResponse.json({ error: "password does not match" }, { status: 404 });
    }

    const data = await VerifyTokenReset(token);
    const existUser = await UserModel.findById(data);

    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
 const hashPassword = await existUser.UpdatePassword(confirm_password)
 await UserModel.findByIdAndUpdate(data,{$set:{password:hashPassword}})
    await SendEmail(existUser.name,existUser.email,token)

  const response = NextResponse.json({msg :"password reset successfully" }, { status: 201 });
  return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
