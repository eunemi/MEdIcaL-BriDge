import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { PopularTreatments } from "@/components/home/PopularTreatments";
import { TopHospitals } from "@/components/home/TopHospitals";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <PopularTreatments />
      <TopHospitals />
      <Testimonials />
      <CTABanner />
    </>
  );
}
