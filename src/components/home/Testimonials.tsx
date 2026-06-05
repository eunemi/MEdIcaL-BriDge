import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "The level of care I received for my cardiac bypass was beyond my expectations. The concierge team handled everything from my visa to my recovery stay.",
    author: "Robert M.",
    country: "United States",
    treatment: "Cardiac Bypass",
  },
  {
    id: 2,
    quote: "I saved over 65% on my hip replacement, and the hospital in Mumbai felt like a 5-star hotel. My surgeon was incredibly skilled and attentive.",
    author: "Sarah L.",
    country: "United Kingdom",
    treatment: "Orthopedics",
  },
  {
    id: 3,
    quote: "MediBridge made what seemed like a daunting international medical trip completely stress-free. The dedicated coordinator was a lifesaver.",
    author: "Ahmed K.",
    country: "UAE",
    treatment: "Neurology",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-6">
            Patient Stories
          </h2>
          <p className="text-foreground/70 text-lg">
            Hear from global patients who chose MediBridge India for their life-changing medical journeys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card key={t.id} className="bg-white border-none shadow-lg relative pt-10">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white shadow-md">
                <Quote className="w-5 h-5 fill-current" />
              </div>
              <CardContent className="p-8 pt-4">
                <p className="text-foreground/80 italic leading-relaxed mb-8">
                  "{t.quote}"
                </p>
                <div className="border-t border-border/50 pt-4">
                  <h4 className="font-bold text-primary">{t.author}</h4>
                  <div className="text-sm text-foreground/60 flex items-center gap-2 mt-1">
                    <span>{t.country}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-secondary font-medium">{t.treatment}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
