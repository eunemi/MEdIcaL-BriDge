import { NextRequest, NextResponse } from "next/server";
import { getHospitalById, getHospitalDoctors, getHospitalTreatments } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const hospital = getHospitalById(id);

  if (!hospital) {
    return NextResponse.json({ error: "Hospital not found" }, { status: 404 });
  }

  const doctors = getHospitalDoctors(id);
  const treatments = getHospitalTreatments(id);

  return NextResponse.json({ hospital, doctors, treatments });
}
