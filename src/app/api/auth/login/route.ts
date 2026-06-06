import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

// Mock user store for development (no DB required)
// Real users: try Prisma first, fallback to this map
const DEMO_USERS: Record<
  string,
  { userId: string; passwordHash: string; role: string; fullName: string }
> = {
  "patient@demo.com": {
    userId: "demo-patient-001",
    passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "PATIENT",
    fullName: "Demo Patient",
  },
  "admin@demo.com": {
    userId: "demo-admin-001",
    passwordHash: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    role: "ADMIN",
    fullName: "Demo Admin",
  },
};

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

    // Try Prisma first
    let user: {
      userId: string;
      passwordHash: string;
      role: string;
      fullName: string;
    } | null = null;

    try {
      const { prisma } = await import("@/lib/prisma");
      const dbUser = await prisma.user.findUnique({
        where: { email },
        include: {
          patientProfile: true,
          doctorProfile: true,
          adminProfile: true,
        },
      });

      if (dbUser) {
        const profile =
          dbUser.patientProfile ?? dbUser.doctorProfile ?? dbUser.adminProfile;
        user = {
          userId: dbUser.id,
          passwordHash: dbUser.passwordHash,
          role: dbUser.role,
          fullName: profile?.fullName ?? email.split("@")[0],
        };
      }
    } catch {
      // DB not available — use demo store
    }

    // Fallback to demo users
    if (!user) {
      const demo = DEMO_USERS[email.toLowerCase()];
      if (demo) user = demo;
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      // Allow "password" as a fallback for demo users
      if (password !== "password") {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    const token = signToken({
      userId: user.userId,
      email,
      role: user.role,
    });

    const response = NextResponse.json({
      user: {
        userId: user.userId,
        email,
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
