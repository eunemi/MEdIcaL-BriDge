import type { Metadata } from "next";
import Link from "next/link";
import { getTreatments } from "@/lib/data";
import { TreatmentCard } from "@/components/treatments/TreatmentCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { Stethoscope } from "lucide-react";

// Re-export treatmentCategories constant type
const treatmentCategories2 = [
  "all",
  "Cardiology",
  "Orthopedics",
  "Oncology",
  "Neurology",
  "Ophthalmology",
  "Dental",
  "Fertility & IVF",
  "Organ Transplant",
  "Bariatric Surgery",
] as const;

export const metadata: Metadata = {
  title: "Medical Treatments in India | MediBridge India",
  description:
    "Explore world-class medical treatments available in India — from cardiology and orthopedics to IVF and oncology. Compare costs, hospitals, and specialists.",
};

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function TreatmentsPage({ searchParams }: PageProps) {
  const { category, search } = await searchParams;

  const treatments = getTreatments({
    category: category === "all" ? undefined : category,
    search,
  });

  return (
    <div>
      <PageHeader
        badge="Medical Specialties"
        title="World-Class Treatments,"
        titleHighlight="Affordable Costs"
        description="Browse our complete catalogue of treatments available at India's top JCI-accredited hospitals. Compare procedures, costs, and specialists."
      />

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {treatmentCategories2.map((cat) => {
            const isActive =
              cat === "all"
                ? !category || category === "all"
                : category === cat;
            return (
              <Link
                key={cat}
                href={
                  cat === "all"
                    ? "/treatments"
                    : `/treatments?category=${encodeURIComponent(cat)}`
                }
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-white text-foreground/70 border-border hover:border-primary/30 hover:text-primary"
                }`}
              >
                {cat === "all" ? "All Treatments" : cat}
              </Link>
            );
          })}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {treatments.length}
            </span>{" "}
            treatment
            {treatments.length !== 1 ? "s" : ""}
            {category && category !== "all" ? ` in ${category}` : ""}
          </p>
        </div>

        {/* Grid */}
        {treatments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {treatments.map((t) => (
              <TreatmentCard key={t.id} treatment={t} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Stethoscope}
            title="No treatments found"
            description="Try adjusting your filters or browse all available treatments."
            actionLabel="View All Treatments"
          />
        )}
      </div>
    </div>
  );
}
