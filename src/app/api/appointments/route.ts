import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { MOCK_APPOINTMENTS } from "@/lib/data";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  // In production: query DB for this userId
  return NextResponse.json({ appointments: MOCK_APPOINTMENTS });
}
