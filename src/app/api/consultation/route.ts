import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, country, treatmentNeeded, preferredCity, medicalHistory } = body;

    if (!fullName || !email || !phone || !country || !treatmentNeeded) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // In production: send email, store in DB, trigger CRM workflow
    console.log("[CONSULTATION REQUEST]", {
      fullName, email, phone, country, treatmentNeeded, preferredCity,
      medicalHistory: medicalHistory ? "provided" : "not provided",
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your consultation request has been received. Our medical concierge team will contact you within 24 hours.",
      referenceId: `MB-${Date.now()}`,
    });
  } catch (error) {
    console.error("[CONSULTATION ERROR]", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }
}
