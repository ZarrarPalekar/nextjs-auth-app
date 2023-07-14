import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout Successful",
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date() });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
