import { ArrowRight, HeartPulse, Activity, Eye, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const treatments = [
  { id: 1, title: "Cardiology", icon: HeartPulse, desc: "Advanced bypass surgeries, valve replacements, and minimally invasive cardiac procedures." },
  { id: 2, title: "Orthopedics", icon: Activity, desc: "Robotic joint replacements, spine surgery, and sports medicine with quick recovery protocols." },
  { id: 3, title: "Neurology", icon: Brain, desc: "Complex brain tumor excisions, deep brain stimulation, and advanced neuro-rehab." },
  { id: 4, title: "Ophthalmology", icon: Eye, desc: "Premium LASIK, cataract procedures, and complex retinal surgeries by top surgeons." },
];

export function PopularTreatments() {
  return (
    <section className="py-24 bg-surface relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Pioneering Medical Treatments
            </h2>
            <p className="text-foreground/70 text-lg">
              Access world-class specialists and state-of-the-art facilities at a fraction of the cost.
            </p>
          </div>
          <Link href="/treatments">
            <Button variant="outline" className="rounded-full border-outline text-primary hover:bg-accent/50 gap-2">
              View All Treatments <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {treatments.map((t) => (
            <Card key={t.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-secondary/30 bg-card overflow-hidden cursor-pointer">
              <div className="h-2 w-full bg-secondary/10 group-hover:bg-secondary transition-colors" />
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <t.icon className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-primary mb-3">
                  {t.title}
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 line-clamp-3">
                  {t.desc}
                </p>
                <div className="flex items-center text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
