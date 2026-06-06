import { NextRequest, NextResponse } from "next/server";
import { getHospitals } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city") ?? undefined;
  const accreditation = searchParams.get("accreditation") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const hospitals = getHospitals({ city, accreditation, search });
  return NextResponse.json({ hospitals });
}
