"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Verified, Building2, Globe, CreditCard, User, Star, TrendingDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const CircularBadge = () => (
  <div className="relative w-32 h-32 md:w-40 md:h-40 bg-secondary rounded-full flex items-center justify-center shadow-2xl rotate-12 hover:scale-105 transition-transform cursor-pointer border-[3px] border-white/20">
    <div className="absolute inset-1 animate-[spin_12s_linear_infinite]">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
        <text className="text-[12px] font-bold tracking-[0.1em] uppercase" fill="white">
          <textPath href="#circlePath" startOffset="0%">
            • 60% SAVINGS • EST COST $1500 
          </textPath>
        </text>
      </svg>
    </div>
    <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
      <TrendingDown className="w-8 h-8 mb-1" />
      <span className="font-heading font-bold text-xl leading-none">$1.5k</span>
    </div>
  </div>
);

export function HeroSection() {
  const bgRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      bgRef.current.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-32 pb-16 lg:pt-24 lg:pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="https://lh3.googleusercontent.com/aida/AP1WRLsQ8XJBSj53Ng1YBGukhAw5B1kV-mUoQtQlcMBEiqUjIi-zKM2oMPjw4q04byTZz_wQeJhY-3iVos8yE1Nik_k7VXwSKFIHkhDMEGTlnqiifNB6R_tiqkybey2gozuR1wkucwQpJ_YoB83aOJrEpeTJzLTStikWKnKOIhZ3VCseG3ynt6Ue7s6uw6To15lPE4pGgJHSDJBjC8p7AlMovS-_UBgz5CBLOppJfmlSzLDB1EgMDKGjGoH5"
          alt="Luxury Hospital Interior"
          className="w-full h-full object-cover object-center opacity-80 scale-[1.05] transition-transform duration-100 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface/40 via-surface/10 to-surface/90" />
      </div>

      <div className="relative z-10 w-full container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Content (Left) */}
        <div className="lg:col-span-7 flex flex-col items-start gap-8 mt-12 lg:mt-0">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-secondary-fixed/50 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <Verified className="w-4 h-4 text-secondary fill-secondary/20" />
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              Premier Medical Concierge
            </span>
          </div>

          <h1 className="font-heading text-primary font-bold text-4xl md:text-5xl lg:text-[56px] leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            World-Class Healthcare,<br />
            <span className="italic font-normal text-primary-container/80">Now in India</span>
          </h1>

          <p className="text-lg text-foreground/80 max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
            Experience unparalleled medical expertise combined with opulent care. We connect global citizens with India's elite, JCI-accredited healthcare institutions seamlessly.
          </p>

          {/* Search Bar Glassmorphic */}
          <div className="w-full max-w-2xl glass-panel rounded-full p-2 flex items-center relative gold-border-gradient mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700 hover:shadow-lg transition-shadow">
            <Search className="w-5 h-5 text-outline ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search treatments, doctors..."
              className="flex-grow bg-transparent border-none focus:ring-0 text-foreground placeholder:text-outline-variant px-2 sm:px-4 h-12 w-full outline-none min-w-0"
            />
            <Button className="rounded-full bg-primary text-primary-foreground h-10 sm:h-12 px-4 sm:px-8 hover:bg-primary-container shadow-md gap-2 sheen-btn shrink-0">
              <span className="hidden sm:inline">Explore</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-6 animate-in fade-in duration-700 delay-1000">
            <TrustBadge icon={<Building2 className="w-5 h-5" />} text="JCI Accredited Hospitals" />
            <TrustBadge icon={<Globe className="w-5 h-5" />} text="Top Global Doctors" />
            <TrustBadge icon={<CreditCard className="w-5 h-5" />} text="Multi-Currency Support" />
          </div>
        </div>

        {/* Floating Widgets (Right) - Now using BaseClub floating cards styled for Doctors */}
        {mounted && (
          <div className="lg:col-span-5 relative hidden lg:block h-full min-h-[500px] w-full">
            
            {/* Floating Glass Card 1 (Top Right) - Dr. A. Sharma */}
            <motion.div 
              animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[0%] right-[5%] z-20 pointer-events-auto"
            >
              <div className="w-44 md:w-56 aspect-[3/3.5] bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[6deg] shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:rotate-0 transition-transform duration-500">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60" alt="Dr. A. Sharma" className="w-full h-full object-cover" />
                </div>
                <div className="text-center mt-2 w-full">
                  <p className="font-heading font-bold text-lg md:text-xl text-primary">Dr. A. Sharma</p>
                  <p className="text-[10px] md:text-xs text-primary/80 font-bold uppercase tracking-wider mt-1">Chief Cardiologist</p>
                  <div className="flex justify-center text-secondary mt-2 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Glass Card 2 (Bottom Left) - Dr. S. Patel */}
            <motion.div 
              animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[0%] left-[5%] z-30 pointer-events-auto"
            >
              <div className="w-44 md:w-56 aspect-[3/3.5] bg-white/30 backdrop-blur-xl border border-white/50 rounded-[2rem] p-5 flex flex-col items-center justify-center rotate-[-8deg] shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:rotate-0 transition-transform duration-500">
                <div className="w-20 h-20 md:w-28 md:h-28 bg-primary rounded-full flex items-center justify-center mb-4 shadow-inner border-[3px] border-white overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=60" alt="Dr. S. Patel" className="w-full h-full object-cover object-top" />
                </div>
                <div className="text-center mt-2 w-full">
                  <p className="font-heading font-bold text-lg md:text-xl text-primary">Dr. S. Patel</p>
                  <p className="text-[10px] md:text-xs text-primary/80 font-bold uppercase tracking-wider mt-1">Orthopedic Surgeon</p>
                  <div className="flex justify-center text-secondary mt-2 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Circular Badge - Cost Estimate */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
              className="absolute top-[45%] right-[25%] transform -translate-y-1/2 z-40 pointer-events-auto"
            >
              <CircularBadge />
            </motion.div>

          </div>
        )}
      </div>
    </section>
  );
}

function TrustBadge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-white/95 transition-all cursor-default">
      <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
        {icon}
      </div>
      <span className="text-xs font-bold text-primary">{text}</span>
    </div>
  );
}
