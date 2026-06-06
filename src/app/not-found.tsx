import Link from "next/link";
import { HeartPulse, ArrowRight, Home, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/30 via-background to-accent/10 px-4 py-20">
      <div className="max-w-lg w-full text-center">
        {/* Number */}
        <div className="relative mb-8">
          <p className="font-heading text-[140px] font-bold text-primary/5 leading-none select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center shadow-2xl">
              <HeartPulse className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        <h1 className="font-heading text-3xl font-bold text-primary mb-3">
          Page Not Found
        </h1>
        <p className="text-foreground/70 mb-10 leading-relaxed max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <Link href="/">
            <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-2 px-6 h-12">
              <Home className="w-4 h-4" />
              Go to Homepage
            </Button>
          </Link>
          <Link href="/treatments">
            <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white gap-2 px-6 h-12">
              <Search className="w-4 h-4" />
              Browse Treatments
            </Button>
          </Link>
        </div>

        {/* Quick links */}
        <div className="bg-card border border-border/50 rounded-2xl p-6">
          <p className="text-sm font-semibold text-primary mb-4">Popular Pages</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {[
              { label: "Hospitals Directory", href: "/hospitals" },
              { label: "Find Doctors", href: "/doctors" },
              { label: "Cost Estimator", href: "/cost-estimator" },
              { label: "Book Consultation", href: "/consultation" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 text-primary/70 hover:text-primary transition-colors py-1"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
