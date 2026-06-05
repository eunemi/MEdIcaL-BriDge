import { Button } from "@/components/ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary z-0" />
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2000&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-4 bg-secondary/20 rounded-full mb-8">
          <CalendarDays className="w-8 h-8 text-secondary-fixed" />
        </div>
        
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
          Ready to Begin Your Medical Journey?
        </h2>
        
        <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Schedule a free consultation with our medical concierge team to discuss your treatment options, costs, and travel arrangements.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/consultation">
            <Button className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-container text-lg h-14 px-8 shadow-xl sheen-btn w-full sm:w-auto">
              Book Free Consultation
            </Button>
          </Link>
          <Link href="/cost-estimator">
            <Button variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 text-lg h-14 px-8 w-full sm:w-auto">
              Get Cost Estimate <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
