import { NextRequest, NextResponse } from "next/server";
import { getTreatmentById, getTreatmentHospitals } from "@/lib/data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const treatment = getTreatmentById(id);

  if (!treatment) {
    return NextResponse.json({ error: "Treatment not found" }, { status: 404 });
  }

  const hospitals = getTreatmentHospitals(id);
  return NextResponse.json({ treatment, hospitals });
}
