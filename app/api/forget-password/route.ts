import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/config/db.config";
import { UserModel } from "@/lib/models/User.model";
import { GenerateTokenReset } from "@/lib/services/Token.service";
import { SendEmail } from "@/lib/services/MainService";

ConnectDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const existUser = await UserModel.findOne({ email });

    if (!existUser) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const token = await GenerateTokenReset(existUser._id);
    await SendEmail(existUser.name, existUser.email, token);

    const response = NextResponse.json(
      { msg: "mail send successfully kindly check" },
      { status: 201 }
    );

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
