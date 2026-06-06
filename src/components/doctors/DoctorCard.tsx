import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, ArrowRight, Globe2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MockDoctor } from "@/lib/data";
import { StarRating } from "@/components/shared/StarRating";

interface DoctorCardProps {
  doctor: MockDoctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="group bg-card rounded-2xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Top color bar */}
      <div className="h-1.5 bg-gradient-to-r from-primary via-primary/60 to-secondary" />

      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-secondary/20 shrink-0">
            <Image
              src={doctor.image}
              alt={doctor.fullName}
              width={80}
              height={80}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-lg font-semibold text-primary mb-0.5 leading-tight">
              {doctor.fullName}
            </h3>
            <p className="text-sm text-secondary font-semibold mb-1">
              {doctor.specialty}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-primary/50" />
              {doctor.hospital.name}, {doctor.hospital.city}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: "Experience", value: `${doctor.experienceYears}yr` },
            { label: "Success", value: `${doctor.successRate}%` },
            { label: "Patients", value: `${(doctor.patientsServed / 1000).toFixed(1)}k` },
          ].map((s) => (
            <div key={s.label} className="text-center bg-accent/60 rounded-xl py-2.5 px-2 border border-primary/5">
              <p className="font-heading text-base font-bold text-primary">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Rating + languages */}
        <div className="flex items-center justify-between mb-4">
          <StarRating rating={doctor.rating} showNumber />
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Globe2 className="w-3.5 h-3.5 text-primary/50" />
            {doctor.languages.split(",")[0].trim()}
            {doctor.languages.split(",").length > 1 &&
              ` +${doctor.languages.split(",").length - 1}`}
          </div>
        </div>

        {/* Fee + CTA */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
          <div>
            <p className="text-xs text-muted-foreground">Consultation</p>
            <p className="font-heading text-xl font-bold text-primary flex items-center gap-0.5">
              <DollarSign className="w-4 h-4" />
              {doctor.consultationFee}
            </p>
          </div>
          <Link href={`/doctors/${doctor.id}`}>
            <Button
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-1.5 group/btn"
            >
              View Profile
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
