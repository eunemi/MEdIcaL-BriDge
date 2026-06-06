import type { Metadata } from "next";
import Link from "next/link";
import { getHospitals } from "@/lib/data";
import { HospitalCard } from "@/components/hospitals/HospitalCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Hospitals in India | MediBridge India",
  description:
    "Browse India's premier JCI and NABH accredited hospitals. Compare facilities, specialties, ratings, and costs across Mumbai, Delhi, Chennai, Bangalore and more.",
};

const CITIES = ["all", "Chennai", "New Delhi", "Mumbai", "Bangalore"];
const ACCREDITATIONS = ["all", "JCI", "NABH", "NABL"];

interface PageProps {
  searchParams: Promise<{ city?: string; accreditation?: string; search?: string }>;
}

export default async function HospitalsPage({ searchParams }: PageProps) {
  const { city, accreditation, search } = await searchParams;

  const hospitals = getHospitals({
    city: city === "all" ? undefined : city,
    accreditation: accreditation === "all" ? undefined : accreditation,
    search,
  });

  return (
    <div>
      <PageHeader
        badge="Partner Network"
        title="India's Premier"
        titleHighlight="Medical Institutions"
        description="Exclusively JCI and NABH accredited hospitals, chosen for clinical excellence, international patient services, and proven outcomes."
      />

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">
          {/* City */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              City
            </p>
            <div className="flex flex-wrap gap-2">
              {CITIES.map((c) => {
                const isActive = c === "all" ? !city || city === "all" : city === c;
                return (
                  <Link
                    key={c}
                    href={
                      c === "all"
                        ? "/hospitals"
                        : `/hospitals?city=${encodeURIComponent(c)}${accreditation ? `&accreditation=${accreditation}` : ""}`
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-white text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {c === "all" ? "All Cities" : c}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Accreditation */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Accreditation
            </p>
            <div className="flex flex-wrap gap-2">
              {ACCREDITATIONS.map((a) => {
                const isActive = a === "all" ? !accreditation || accreditation === "all" : accreditation === a;
                return (
                  <Link
                    key={a}
                    href={
                      a === "all"
                        ? "/hospitals"
                        : `/hospitals?accreditation=${a}${city ? `&city=${city}` : ""}`
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      isActive
                        ? "bg-secondary text-secondary-foreground border-secondary"
                        : "bg-white text-foreground/70 border-border hover:border-secondary/40 hover:text-secondary"
                    }`}
                  >
                    {a === "all" ? "All" : a}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-8">
          Showing{" "}
          <span className="font-semibold text-foreground">{hospitals.length}</span>{" "}
          hospital{hospitals.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        {hospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hospitals.map((h) => (
              <HospitalCard key={h.id} hospital={h} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Building2}
            title="No hospitals found"
            description="Try different filters to find hospitals in other cities."
          />
        )}
      </div>
    </div>
  );
}
