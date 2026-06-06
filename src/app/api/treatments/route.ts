import { NextRequest, NextResponse } from "next/server";
import { getTreatments } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const treatments = getTreatments({ category, search });
  return NextResponse.json({ treatments });
}
