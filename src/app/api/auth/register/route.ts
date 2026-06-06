import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
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

    const passwordHash = await bcrypt.hash(password, 10);

    // Try Prisma
    try {
      const { prisma } = await import("@/lib/prisma");

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      // Get or create country
      let countryRecord = await prisma.country.findFirst({
        where: { name: { contains: country, mode: "insensitive" } },
      });
      if (!countryRecord) {
        countryRecord = await prisma.country.create({
          data: {
            name: country,
            code: country.substring(0, 2).toUpperCase(),
            phoneCode: "+1",
            currency: "USD",
          },
        });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          passwordHash,
          role: "PATIENT",
          patientProfile: {
            create: {
              fullName,
              phoneNumber: phone,
              countryId: countryRecord.id,
            },
          },
        },
      });

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
    } catch (dbError: unknown) {
      const errMsg = dbError instanceof Error ? dbError.message : "";
      if (errMsg.includes("DATABASE_URL")) {
        // No DB — create mock session
        const userId = `user-${Date.now()}`;
        const token = signToken({ userId, email, role: "PATIENT" });

        const response = NextResponse.json({
          user: { userId, email, role: "PATIENT", fullName },
        });

        response.cookies.set("auth-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
          path: "/",
        });

        return response;
      }
      throw dbError;
    }
  } catch (error) {
    console.error("[REGISTER ERROR]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
