import { Star, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

const hospitals = [
  {
    id: 1,
    name: "Apollo Hospitals",
    city: "Chennai",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1000&auto=format&fit=crop",
    accreditations: ["JCI", "NABH"],
    specialties: ["Cardiology", "Neurology", "Oncology"]
  },
  {
    id: 2,
    name: "Fortis Escorts",
    city: "New Delhi",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop",
    accreditations: ["JCI", "NABL"],
    specialties: ["Heart Institute", "Orthopedics"]
  },
  {
    id: 3,
    name: "Max Super Specialty",
    city: "Mumbai",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1000&auto=format&fit=crop",
    accreditations: ["JCI", "NABH"],
    specialties: ["Robotic Surgery", "Transplants"]
  }
];

export function TopHospitals() {
  return (
    <section className="py-24 bg-accent/20 relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary/20 bg-white/50">
            Elite Institutions
          </Badge>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Partnered with the Best
          </h2>
          <p className="text-foreground/70 text-lg">
            Our network comprises exclusively of JCI and NABH accredited hospitals, ensuring international standards of clinical excellence and patient safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {hospitals.map((h) => (
            <div key={h.id} className="bg-card rounded-2xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={h.image}
                  alt={h.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {h.accreditations.map(acc => (
                    <Badge key={acc} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-none">
                      {acc}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-heading text-2xl font-semibold text-primary">
                    {h.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-secondary/10 text-secondary px-2 py-1 rounded-md text-sm font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    {h.rating}
                  </div>
                </div>
                <div className="flex items-center text-foreground/60 text-sm mb-6 gap-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  {h.city}, India
                </div>
                <div className="space-y-3 mb-6">
                  {h.specialties.map(spec => (
                    <div key={spec} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                      {spec}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-surface text-primary border border-outline-variant hover:bg-primary hover:text-white transition-colors group-hover:border-primary">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/hospitals">
            <Button variant="ghost" className="text-primary font-semibold gap-2 hover:bg-transparent hover:text-secondary transition-colors">
              Browse all 50+ Hospitals <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
