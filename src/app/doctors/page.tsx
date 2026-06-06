import type { Metadata } from "next";
import Link from "next/link";
import { getDoctors } from "@/lib/data";
import { DoctorCard } from "@/components/doctors/DoctorCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { UserCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Top Doctors in India | MediBridge India",
  description:
    "Consult with India's finest doctors — internationally trained specialists in cardiology, orthopedics, oncology, IVF, and more. Compare experience, ratings, and fees.",
};

const SPECIALTIES = [
  "all",
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Robotic Surgery",
  "Fertility & IVF",
  "Bariatric Surgery",
  "Spine Surgery",
];

interface PageProps {
  searchParams: Promise<{ specialty?: string; hospitalId?: string; search?: string }>;
}

export default async function DoctorsPage({ searchParams }: PageProps) {
  const { specialty, hospitalId, search } = await searchParams;

  const doctors = getDoctors({
    specialty: specialty === "all" ? undefined : specialty,
    hospitalId: hospitalId === "all" ? undefined : hospitalId,
    search,
  });

  return (
    <div>
      <PageHeader
        badge="Expert Specialists"
        title="World-Class Doctors,"
        titleHighlight="Internationally Trained"
        description="Browse our network of internationally fellowship-trained specialists across all major medical disciplines."
      />

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Specialty Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {SPECIALTIES.map((spec) => {
            const isActive =
              spec === "all"
                ? !specialty || specialty === "all"
                : specialty === spec;
            return (
              <Link
                key={spec}
                href={
                  spec === "all"
                    ? "/doctors"
                    : `/doctors?specialty=${encodeURIComponent(spec)}`
                }
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-white text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {spec === "all" ? "All Specialties" : spec}
              </Link>
            );
          })}
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-8">
          Showing{" "}
          <span className="font-semibold text-foreground">{doctors.length}</span>{" "}
          specialist{doctors.length !== 1 ? "s" : ""}
          {specialty && specialty !== "all" ? ` in ${specialty}` : ""}
        </p>

        {doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {doctors.map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={UserCircle}
            title="No specialists found"
            description="Try a different specialty filter or browse all doctors."
          />
        )}
      </div>
    </div>
  );
}
