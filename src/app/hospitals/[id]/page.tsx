import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Phone, Mail, Star, Building2, Users, Award,
  Calendar, ChevronRight, ArrowRight, Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getHospitalById, getHospitalDoctors, getHospitalTreatments } from "@/lib/data";
import { StarRating } from "@/components/shared/StarRating";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const hospital = getHospitalById(id);
  if (!hospital) return { title: "Hospital Not Found | MediBridge" };
  return {
    title: `${hospital.name}, ${hospital.city} | MediBridge India`,
    description: hospital.description.slice(0, 160),
  };
}

export default async function HospitalProfilePage({ params }: Props) {
  const { id } = await params;
  const hospital = getHospitalById(id);
  if (!hospital) notFound();

  const doctors = getHospitalDoctors(id);
  const treatments = getHospitalTreatments(id);
  const accreditations = hospital.accreditation.split(",").map((a) => a.trim());

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-accent/30 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/hospitals" className="hover:text-primary transition-colors">Hospitals</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-medium truncate">{hospital.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image src={hospital.image} alt={hospital.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="absolute inset-0 flex items-end pb-8">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-wrap gap-2 mb-3">
              {accreditations.map((acc) => (
                <Badge key={acc} className="bg-secondary text-secondary-foreground border-none font-bold">
                  {acc}
                </Badge>
              ))}
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-3">
              {hospital.name}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/85">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary-fixed" />
                <span>{hospital.city}, India</span>
              </div>
              <StarRating rating={hospital.rating} className="[&_svg]:fill-secondary [&_svg]:text-secondary [&_span]:text-white" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-secondary-fixed" />
                <span>{hospital.doctorCount}+ Specialists</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">About</h2>
              <p className="text-foreground/80 leading-relaxed">{hospital.description}</p>
            </section>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Beds", value: hospital.bedsCount.toString(), icon: Building2 },
                { label: "Specialists", value: `${hospital.doctorCount}+`, icon: Users },
                { label: "Est.", value: hospital.foundedYear.toString(), icon: Calendar },
                { label: "Rating", value: `${hospital.rating}/5`, icon: Star },
              ].map((stat) => (
                <div key={stat.label} className="bg-accent rounded-2xl p-4 text-center border border-primary/10">
                  <stat.icon className="w-5 h-5 text-primary/60 mx-auto mb-2" />
                  <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Specialties */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {hospital.specialties.map((spec) => (
                  <span key={spec} className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium text-primary/80">
                    {spec}
                  </span>
                ))}
              </div>
            </section>

            {/* Doctors */}
            {doctors.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-heading text-2xl font-bold text-primary">Our Specialists</h2>
                  <Link href={`/doctors?hospitalId=${id}`} className="text-sm text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-1">
                    View all <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {doctors.slice(0, 4).map((doc) => (
                    <Link
                      key={doc.id}
                      href={`/doctors/${doc.id}`}
                      className="flex items-center gap-4 bg-card border border-border/50 rounded-2xl p-4 hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-secondary/30 shrink-0">
                        <Image src={doc.image} alt={doc.fullName} width={56} height={56} className="object-cover w-full h-full" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-primary text-sm group-hover:text-primary-container transition-colors truncate">{doc.fullName}</p>
                        <p className="text-xs text-muted-foreground mb-1">{doc.specialty}</p>
                        <StarRating rating={doc.rating} size="sm" showNumber />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Treatments + pricing */}
            {treatments.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-primary mb-5">Treatments & Pricing</h2>
                <div className="border border-border/50 rounded-2xl overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-accent">
                      <tr>
                        <th className="text-left py-3 px-5 font-semibold text-primary">Treatment</th>
                        <th className="text-left py-3 px-5 font-semibold text-primary">Category</th>
                        <th className="text-right py-3 px-5 font-semibold text-primary">Avg. Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                      {treatments.map((t) => (
                        <tr key={t.id} className="hover:bg-accent/30 transition-colors">
                          <td className="py-3 px-5">
                            <Link href={`/treatments/${t.id}`} className="text-primary font-medium hover:text-secondary transition-colors">
                              {t.name}
                            </Link>
                          </td>
                          <td className="py-3 px-5 text-muted-foreground">{t.category}</td>
                          <td className="py-3 px-5 text-right font-bold text-primary">
                            ${t.averageCost.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Photo Gallery */}
            {hospital.gallery.length > 0 && (
              <section>
                <h2 className="font-heading text-2xl font-bold text-primary mb-5">Gallery</h2>
                <div className="grid grid-cols-3 gap-3">
                  {hospital.gallery.map((img, i) => (
                    <div key={i} className="relative h-32 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${hospital.name} gallery ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA */}
            <div className="bg-primary rounded-2xl p-6 text-white sticky top-24">
              <Stethoscope className="w-8 h-8 text-secondary-fixed mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Book a Consultation</h3>
              <p className="text-white/75 text-sm mb-6">Connect with specialists at {hospital.name} within 24 hours.</p>
              <Link href="/consultation">
                <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-container sheen-btn mb-3">
                  Request Appointment
                </Button>
              </Link>
              <Link href="/cost-estimator">
                <Button variant="outline" className="w-full rounded-full border-white/30 text-white hover:bg-white/10">
                  Estimate Treatment Cost
                </Button>
              </Link>
            </div>

            {/* Contact */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-primary/50 mt-0.5 shrink-0" />
                  <span className="text-foreground/80">{hospital.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-primary/50 shrink-0" />
                  <a href={`tel:${hospital.contactPhone}`} className="text-primary hover:text-secondary transition-colors">
                    {hospital.contactPhone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary/50 shrink-0" />
                  <a href={`mailto:${hospital.contactEmail}`} className="text-primary hover:text-secondary transition-colors truncate">
                    {hospital.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Accreditations */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">Accreditations</h3>
              <div className="flex flex-wrap gap-2">
                {accreditations.map((acc) => (
                  <div key={acc} className="flex items-center gap-2 bg-accent px-3 py-2 rounded-full border border-primary/10">
                    <Award className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-bold text-primary">{acc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
