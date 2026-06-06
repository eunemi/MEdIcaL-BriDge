"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CheckCircle2, Clock, Phone, ArrowRight, Loader2,
  HeartPulse, Users, Building2, Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_TREATMENTS } from "@/lib/data";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "UAE",
  "Saudi Arabia", "Germany", "France", "Nigeria", "Kenya",
  "Bangladesh", "Pakistan", "Nepal", "Sri Lanka", "Other",
];

const CITIES = ["Any City", "Chennai", "New Delhi", "Mumbai", "Bangalore"];

const BENEFITS = [
  { icon: Clock, text: "Response within 24 hours" },
  { icon: HeartPulse, text: "Free, no-obligation quote" },
  { icon: Phone, text: "Dedicated medical concierge" },
  { icon: Users, text: "10,000+ patients served" },
  { icon: Building2, text: "6 accredited hospital partners" },
  { icon: Star, text: "JCI & NABH certified facilities" },
];

export default function ConsultationPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    treatmentNeeded: "",
    preferredCity: "",
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ message: string; referenceId: string } | null>(null);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Submission failed. Please try again.");
        return;
      }

      setSuccess({ message: data.message, referenceId: data.referenceId });
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/40 via-background to-accent/20 px-4 py-20">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary mb-3">
            Request Submitted!
          </h1>
          <p className="text-foreground/70 mb-5 leading-relaxed">{success.message}</p>
          <div className="bg-accent border border-primary/10 rounded-xl px-5 py-3 inline-block">
            <p className="text-xs text-muted-foreground">Reference ID</p>
            <p className="font-heading text-lg font-bold text-primary">{success.referenceId}</p>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Please keep this reference ID for your records. Our team will contact you at{" "}
            <strong>{form.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #afefdd 1px, transparent 0)", backgroundSize: "40px 40px" }}
        />
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container animate-pulse" />
            <span className="text-xs font-bold text-secondary-fixed uppercase tracking-wider">Free Consultation</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Start Your Medical<br />
            <span className="italic font-normal text-secondary-fixed/90">Journey Today</span>
          </h1>
          <p className="text-white/75 max-w-xl mx-auto text-lg">
            Tell us about your treatment needs. Our expert medical concierge team will respond within 24 hours with a personalised plan.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Benefits sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Why Choose MediBridge?
              </h2>
              <div className="space-y-4">
                {BENEFITS.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent border border-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary/70" />
                    </div>
                    <p className="text-sm font-medium text-foreground/80">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote card */}
            <div className="bg-accent rounded-2xl p-6 border border-primary/10">
              <p className="italic text-sm text-foreground/80 leading-relaxed mb-4">
                "MediBridge arranged everything — hospital, visa letter, airport pickup, and follow-up care. My CABG in Chennai cost 1/5th of the US quote."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="font-bold text-primary text-sm">JM</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm">James M.</p>
                  <p className="text-xs text-muted-foreground">London, UK</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass-panel rounded-3xl p-8 gold-border-gradient">
              <h2 className="font-heading text-xl font-bold text-primary mb-6">
                Request Free Consultation
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="consult-name" className="text-sm font-semibold text-foreground/80">Full Name *</label>
                    <Input id="consult-name" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="John Doe" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="consult-email" className="text-sm font-semibold text-foreground/80">Email *</label>
                    <Input id="consult-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" required className="h-11 rounded-xl" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="consult-phone" className="text-sm font-semibold text-foreground/80">Phone / WhatsApp *</label>
                    <Input id="consult-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+1 234 567 890" required className="h-11 rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Country *</label>
                    <Select onValueChange={(v: string | null) => { if (v) update("country", v); }} value={form.country}>
                      <SelectTrigger id="consult-country" className="h-11 rounded-xl">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Treatment Needed *</label>
                    <Select onValueChange={(v: string | null) => { if (v) update("treatmentNeeded", v); }} value={form.treatmentNeeded}>
                      <SelectTrigger id="consult-treatment" className="h-11 rounded-xl">
                        <SelectValue placeholder="Select treatment" />
                      </SelectTrigger>
                      <SelectContent>
                        {MOCK_TREATMENTS.map((t) => (
                          <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                        ))}
                        <SelectItem value="Other / Not Listed">Other / Not Listed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-foreground/80">Preferred City</label>
                    <Select onValueChange={(v: string | null) => { if (v) update("preferredCity", v); }} value={form.preferredCity}>
                      <SelectTrigger id="consult-city" className="h-11 rounded-xl">
                        <SelectValue placeholder="No preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="consult-history" className="text-sm font-semibold text-foreground/80">Medical History (optional)</label>
                  <Textarea
                    id="consult-history"
                    value={form.medicalHistory}
                    onChange={(e) => update("medicalHistory", e.target.value)}
                    placeholder="Briefly describe your condition, previous treatments, or any reports you have..."
                    rows={4}
                    className="rounded-xl resize-none"
                  />
                </div>

                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl px-4 py-3">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary-container text-base font-semibold sheen-btn"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  {loading ? "Submitting…" : "Request Free Consultation"}
                  {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  🔒 Your information is kept strictly confidential and never shared.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
