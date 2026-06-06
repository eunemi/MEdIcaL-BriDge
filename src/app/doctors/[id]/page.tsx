import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Globe2, DollarSign, GraduationCap,
  Award, CheckCircle2, ChevronRight, Calendar, ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDoctorById, MOCK_REVIEWS } from "@/lib/data";
import { StarRating } from "@/components/shared/StarRating";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctorById(id);
  if (!doctor) return { title: "Doctor Not Found | MediBridge" };
  return {
    title: `${doctor.fullName} — ${doctor.specialty} | MediBridge India`,
    description: doctor.biography.slice(0, 160),
  };
}

export default async function DoctorProfilePage({ params }: Props) {
  const { id } = await params;
  const doctor = getDoctorById(id);
  if (!doctor) notFound();

  const educationLines = doctor.education.split("\n");
  const certLines = doctor.certifications.split("\n");
  // Show first 2 reviews only (general mock)
  const reviews = MOCK_REVIEWS.slice(0, 2);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-accent/30 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-medium truncate">{doctor.fullName}</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-primary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Avatar */}
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-3xl overflow-hidden border-4 border-secondary/40 shadow-2xl shrink-0">
              <Image
                src={doctor.image}
                alt={doctor.fullName}
                width={192}
                height={192}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <Badge className="mb-3 bg-secondary text-secondary-foreground border-none font-bold">
                {doctor.specialty}
              </Badge>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                {doctor.fullName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mb-5 text-white/80 text-sm">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-secondary-fixed" />
                  {doctor.hospital.name}, {doctor.hospital.city}
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe2 className="w-4 h-4 text-secondary-fixed" />
                  {doctor.languages}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "Experience", value: `${doctor.experienceYears} yrs` },
                  { label: "Success Rate", value: `${doctor.successRate}%` },
                  { label: "Patients", value: `${doctor.patientsServed.toLocaleString()}+` },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                    <p className="font-heading text-xl font-bold text-secondary-fixed">{s.value}</p>
                    <p className="text-xs text-white/70">{s.label}</p>
                  </div>
                ))}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center min-w-[90px]">
                  <StarRating rating={doctor.rating} showNumber size="md" className="justify-center [&_svg]:fill-secondary [&_svg]:text-secondary [&_span]:text-white" />
                  <p className="text-xs text-white/70 mt-0.5">Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Biography */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">About</h2>
              <p className="text-foreground/80 leading-relaxed">{doctor.biography}</p>
            </section>

            {/* Education */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-5">
                <GraduationCap className="w-6 h-6 inline mr-2 text-primary/60" />
                Education & Training
              </h2>
              <div className="space-y-3">
                {educationLines.map((line, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0" />
                    <p className="text-sm text-foreground/80">{line}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-5">
                <Award className="w-6 h-6 inline mr-2 text-primary/60" />
                Certifications
              </h2>
              <div className="space-y-3">
                {certLines.map((cert, i) => (
                  <div key={i} className="flex items-start gap-3 bg-accent rounded-xl p-3.5 border border-primary/10">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
                    <p className="text-sm font-medium text-primary">{cert}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Available Days */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-5">
                <Calendar className="w-6 h-6 inline mr-2 text-primary/60" />
                Availability
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                  const available = doctor.availableDays.includes(day);
                  return (
                    <div
                      key={day}
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        available
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground line-through"
                      }`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Patient Reviews */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-5">Patient Reviews</h2>
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-card border border-border/50 rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-primary">{rev.patientName}</p>
                        <p className="text-xs text-muted-foreground">{rev.country} · {rev.treatment}</p>
                      </div>
                      <StarRating rating={rev.rating} showNumber={false} />
                    </div>
                    <p className="text-sm text-foreground/80 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Card */}
            <div className="bg-primary rounded-2xl p-6 text-white sticky top-24">
              <div className="text-center mb-5">
                <p className="text-white/70 text-sm">Consultation Fee</p>
                <p className="font-heading text-4xl font-bold text-secondary-fixed mt-1">
                  ${doctor.consultationFee}
                </p>
                <p className="text-white/60 text-xs">per session</p>
              </div>
              <Link href="/consultation">
                <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-container font-semibold sheen-btn mb-3">
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href={`/hospitals/${doctor.hospitalId}`}>
                <Button variant="outline" className="w-full rounded-full border-white/30 text-white hover:bg-white/10">
                  Visit Hospital Profile
                </Button>
              </Link>
            </div>

            {/* Quick Info */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Specialty</span>
                  <span className="font-medium text-foreground">{doctor.specialty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Experience</span>
                  <span className="font-medium text-foreground">{doctor.experienceYears} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hospital</span>
                  <span className="font-medium text-foreground text-right">{doctor.hospital.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">City</span>
                  <span className="font-medium text-foreground">{doctor.hospital.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-success">{doctor.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Languages</span>
                  <span className="font-medium text-foreground text-right">{doctor.languages}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
