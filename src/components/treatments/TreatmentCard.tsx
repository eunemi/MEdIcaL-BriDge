import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockTreatment } from "@/lib/data";

interface TreatmentCardProps {
  treatment: MockTreatment;
}

const CATEGORY_COLORS: Record<string, string> = {
  Cardiology: "bg-red-50 text-red-700 border-red-100",
  Orthopedics: "bg-blue-50 text-blue-700 border-blue-100",
  Neurology: "bg-purple-50 text-purple-700 border-purple-100",
  Oncology: "bg-pink-50 text-pink-700 border-pink-100",
  Ophthalmology: "bg-sky-50 text-sky-700 border-sky-100",
  Dental: "bg-teal-50 text-teal-700 border-teal-100",
  "Fertility & IVF": "bg-rose-50 text-rose-700 border-rose-100",
  "Organ Transplant": "bg-orange-50 text-orange-700 border-orange-100",
  "Bariatric Surgery": "bg-amber-50 text-amber-700 border-amber-100",
};

export function TreatmentCard({ treatment }: TreatmentCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[treatment.category] ??
    "bg-accent text-primary border-primary/10";

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${categoryStyle}`}
          >
            {treatment.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {treatment.successRate}% success
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-primary mb-2 leading-snug line-clamp-2">
          {treatment.name}
        </h3>

        <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-3 flex-1">
          {treatment.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-primary/60" />
            <span>{treatment.recoveryTime}</span>
          </div>
        </div>

        {/* Key benefit */}
        <div className="flex items-center gap-2 mb-4 text-xs text-success font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>{treatment.keyBenefits[0]}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-heading text-xl font-bold text-primary">
              ${treatment.avgCostUSD.toLocaleString()}
            </p>
          </div>
          <Link href={`/treatments/${treatment.id}`}>
            <Button
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-1.5"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
