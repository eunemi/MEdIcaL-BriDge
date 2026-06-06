import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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

    if (resend) {
      try {
        await resend.emails.send({
          from: "MediBridge <noreply@medibridge.com>", // You'd need a verified domain in Resend
          to: [email],
          subject: "Consultation Request Received - MediBridge",
          html: `
            <div style="font-family: sans-serif; padding: 20px;">
              <h2>Hello ${fullName},</h2>
              <p>Thank you for reaching out to MediBridge India.</p>
              <p>We have received your request regarding <strong>${treatmentNeeded}</strong>.</p>
              <p>Our medical concierge team will review your details and contact you within 24 hours at ${phone}.</p>
              <br/>
              <p>Best regards,<br/>The MediBridge Team</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("[RESEND EMAIL ERROR]", emailError);
      }
    } else {
      console.warn("RESEND_API_KEY is not set. Skipping confirmation email.");
    }

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
