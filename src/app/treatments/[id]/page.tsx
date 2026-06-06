import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Building2,
  MapPin,
  Star,
  ArrowRight,
  CalendarDays,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTreatmentById, getTreatmentHospitals } from "@/lib/data";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const treatment = getTreatmentById(id);
  if (!treatment) return { title: "Treatment Not Found | MediBridge India" };
  return {
    title: `${treatment.name} in India | MediBridge`,
    description: treatment.description.slice(0, 160),
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { id } = await params;
  const treatment = getTreatmentById(id);
  if (!treatment) notFound();

  const hospitals = getTreatmentHospitals(id);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-accent/30 border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8 py-3 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/treatments" className="hover:text-primary transition-colors">Treatments</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-primary font-medium truncate">{treatment.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-8">
            <Badge className="mb-4 bg-secondary text-secondary-foreground border-none">
              {treatment.category}
            </Badge>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
              {treatment.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-secondary-fixed" />
                <span className="font-semibold">{treatment.successRate}% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-secondary-fixed" />
                <span>Recovery: {treatment.recoveryTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-secondary-fixed" />
                <span>Starting from ${treatment.avgCostUSD.toLocaleString()} USD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                Overview
              </h2>
              <p className="text-foreground/80 leading-relaxed">{treatment.description}</p>
            </section>

            {/* Key Benefits */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-5">
                Key Benefits
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {treatment.keyBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 bg-accent rounded-xl p-4 border border-primary/10"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    <span className="text-sm font-semibold text-primary">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Risks */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-4">
                Risks & Considerations
              </h2>
              <div className="flex gap-3 bg-amber-50 border border-amber-100 rounded-xl p-5">
                <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {treatment.risks}
                </p>
              </div>
            </section>

            {/* Hospital Pricing Table */}
            <section>
              <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                Hospitals Offering This Treatment
              </h2>
              {hospitals.length > 0 ? (
                <div className="space-y-4">
                  {hospitals.map((h) => (
                    <div
                      key={h.hospitalId}
                      className="bg-card border border-border/50 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Building2 className="w-4 h-4 text-primary/60" />
                          <h3 className="font-semibold text-primary">{h.hospitalName}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />{h.city}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                            {h.rating}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {h.accreditation.split(",")[0]}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Avg. Cost</p>
                          <p className="font-heading text-2xl font-bold text-primary">
                            ${h.averageCost.toLocaleString()}
                          </p>
                        </div>
                        <Link href={`/hospitals/${h.hospitalId}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white"
                          >
                            View Hospital
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">
                  No hospital pricing available yet.
                </p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-primary rounded-2xl p-6 text-white sticky top-24">
              <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6 text-secondary-fixed" />
              </div>
              <h3 className="font-heading text-xl font-bold mb-2">
                Get a Free Quote
              </h3>
              <p className="text-white/75 text-sm mb-6 leading-relaxed">
                Our medical concierge team will send you a personalised cost estimate with hospital options within 24 hours.
              </p>
              <Link href="/consultation">
                <Button className="w-full rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-container font-semibold sheen-btn mb-3">
                  Request Free Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/cost-estimator">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white/30 text-white hover:bg-white/10"
                >
                  Cost Estimator Tool
                </Button>
              </Link>
            </div>

            {/* Quick Facts */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-heading text-lg font-semibold text-primary mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium text-foreground">{treatment.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Recovery Time</span>
                  <span className="font-medium text-foreground">{treatment.recoveryTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Success Rate</span>
                  <span className="font-medium text-success">{treatment.successRate}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Starting Cost</span>
                  <span className="font-bold text-primary">${treatment.avgCostUSD.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hospitals Available</span>
                  <span className="font-medium text-foreground">{hospitals.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
