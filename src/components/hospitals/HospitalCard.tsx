import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, ArrowRight, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MockHospital } from "@/lib/data";

interface HospitalCardProps {
  hospital: MockHospital;
}

export function HospitalCard({ hospital }: HospitalCardProps) {
  const accreditations = hospital.accreditation.split(",").map((a) => a.trim());

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={hospital.image}
          alt={hospital.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Accreditation badges */}
        <div className="absolute bottom-3 left-3 flex gap-1.5">
          {accreditations.map((acc) => (
            <Badge
              key={acc}
              className="bg-white/20 backdrop-blur-md text-white border-white/30 text-xs font-bold"
            >
              {acc}
            </Badge>
          ))}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-full flex items-center gap-1">
          <Star className="w-3 h-3 fill-secondary text-secondary" />
          {hospital.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading text-lg font-semibold text-primary mb-1 leading-snug">
          {hospital.name}
        </h3>

        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 text-secondary" />
          {hospital.city}, India
        </div>

        <p className="text-sm text-foreground/70 leading-relaxed mb-4 line-clamp-3 flex-1">
          {hospital.description.slice(0, 150)}…
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary/50" />
            {hospital.doctorCount}+ Doctors
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-primary/50" />
            Est. {hospital.foundedYear}
          </div>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hospital.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              className="text-xs bg-accent text-primary/80 px-2.5 py-1 rounded-full font-medium border border-primary/10"
            >
              {spec}
            </span>
          ))}
          {hospital.specialties.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{hospital.specialties.length - 3} more
            </span>
          )}
        </div>

        <Link href={`/hospitals/${hospital.id}`} className="mt-auto">
          <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-2 group/btn">
            View Hospital Profile
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
