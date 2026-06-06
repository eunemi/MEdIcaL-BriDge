import { NextRequest, NextResponse } from "next/server";
import { getDoctors } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get("specialty") ?? undefined;
  const hospitalId = searchParams.get("hospitalId") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const doctors = getDoctors({ specialty, hospitalId, search });
  return NextResponse.json({ doctors });
}
