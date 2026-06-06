import { NextRequest, NextResponse } from "next/server";
import { getCostEstimates } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const treatmentId = searchParams.get("treatment");
  const currency = searchParams.get("currency") ?? "USD";

  if (!treatmentId) {
    return NextResponse.json({ error: "treatment param required" }, { status: 400 });
  }

  const estimates = getCostEstimates(treatmentId, currency);
  return NextResponse.json({ estimates });
}
