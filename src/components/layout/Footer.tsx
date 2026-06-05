import Link from "next/link";
import { HeartPulse, Mail, MapPin, Phone, Globe, MessageCircle } from "lucide-react";
import { navLinks, treatmentCategories } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 border-t-4 border-t-secondary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary-container via-primary to-primary" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group inline-block">
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <HeartPulse className="w-6 h-6 text-secondary-container" />
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                MediBridge
                <span className="text-secondary-container ml-1">India</span>
              </span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
              Your trusted concierge for world-class medical treatments in India. We bridge the gap between global patients and premier Indian healthcare.
            </p>
            <div className="flex gap-4">
              {[Globe, MessageCircle, Mail, Phone].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary-foreground/80 hover:text-secondary-container transition-colors text-sm font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/portal" className="text-primary-foreground/80 hover:text-secondary-container transition-colors text-sm font-medium">
                  Patient Portal
                </Link>
              </li>
              <li>
                <Link href="/visa-support" className="text-primary-foreground/80 hover:text-secondary-container transition-colors text-sm font-medium">
                  Visa Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Top Treatments */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 text-white relative inline-block">
              Top Treatments
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-3">
              {treatmentCategories.slice(0, 6).map((category) => (
                <li key={category}>
                  <Link href={`/treatments?category=${encodeURIComponent(category)}`} className="text-primary-foreground/80 hover:text-secondary-container transition-colors text-sm font-medium">
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-heading font-semibold text-xl mb-6 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-secondary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-5 h-5 text-secondary-container shrink-0 mt-0.5" />
                <span>
                  Global Care Tower, Level 14<br />
                  Connaught Place, New Delhi<br />
                  India 110001
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-5 h-5 text-secondary-container shrink-0" />
                <span>+91 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-5 h-5 text-secondary-container shrink-0" />
                <span>care@medibridge.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} MediBridge India. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
