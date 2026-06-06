import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, password, country, phone } = body;

    if (!fullName || !email || !password || !country || !phone) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Mock successful registration
    const newUser = {
      id: "pat_" + Math.random().toString(36).substring(2, 9),
      email,
      role: "PATIENT",
      fullName
    };

    const token = signToken({
      userId: newUser.id,
      email,
      role: "PATIENT",
    });

    const response = NextResponse.json({
      user: { userId: newUser.id, email, role: "PATIENT", fullName },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
