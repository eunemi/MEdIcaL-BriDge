import { NextRequest, NextResponse } from "next/server";
import { signToken } from "@/lib/auth";

const DEMO_USERS = [
  {
    userId: "pat_1",
    email: "patient@demo.com",
    password: "password123",
    role: "PATIENT",
    fullName: "Demo Patient",
  },
  {
    userId: "doc_1",
    email: "doctor@demo.com",
    password: "password123",
    role: "DOCTOR",
    fullName: "Dr. Demo Doctor",
  },
  {
    userId: "adm_1",
    email: "admin@demo.com",
    password: "password123",
    role: "ADMIN",
    fullName: "Admin User",
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = signToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
      },
    });

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
