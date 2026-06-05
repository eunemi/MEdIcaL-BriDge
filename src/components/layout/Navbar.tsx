"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Globe2, HeartPulse, Menu, User, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, currencies } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/60 bg-white/60 shadow-[0_10px_30px_-24px_rgb(0_52_43_/_55%)] backdrop-blur-2xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 md:h-[4.5rem] md:px-8">
        {/* Logo */}
        <Link href="/" className="group flex w-0 min-w-0 flex-1 items-center gap-2.5 sm:gap-3 lg:w-auto lg:flex-none">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-[0_10px_20px_-16px_rgb(0_52_43_/_80%)] transition-colors group-hover:bg-primary-container">
            <HeartPulse className="size-5" />
          </div>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="block max-w-full truncate whitespace-nowrap font-heading text-xl font-bold text-primary md:text-2xl">
              MedBridge
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-2 text-sm font-semibold text-foreground/70 transition-colors hover:text-primary",
                pathname === link.href &&
                  "text-primary"
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute inset-x-1 -bottom-1 h-0.5 rounded-full bg-secondary-container" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="group flex h-10 items-center gap-2 rounded-full border border-primary/10 bg-white/50 px-3 text-sm font-semibold text-foreground/75 transition-colors hover:bg-white/70 hover:text-primary">
            <Globe2 className="size-4 text-primary" />
            <select 
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Select currency"
              className="cursor-pointer appearance-none border-none bg-transparent pr-1 font-semibold uppercase outline-none"
            >
              {currencies.map(c => (
                <option key={c.code} value={c.code}>{c.code}</option>
              ))}
            </select>
            <ChevronDown className="size-3.5 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
          </div>
          
          <Button variant="outline" className="h-10 gap-2 rounded-full border-primary/15 bg-white/45 px-4 text-primary shadow-none hover:bg-white/70">
            <User className="size-4" />
            Portal
          </Button>
          
          <Link href="/consultation">
            <Button className="h-10 rounded-full bg-primary px-5 text-sm text-primary-foreground shadow-[0_12px_24px_-18px_rgb(0_52_43_/_90%)] hover:bg-primary-container">
              Book Consultation
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="shrink-0 rounded-full border border-primary/10 bg-white/55 p-2.5 text-primary shadow-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 flex w-full flex-col gap-2 border-b border-white/60 bg-white/80 p-4 shadow-[0_18px_36px_-28px_rgb(0_52_43_/_70%)] backdrop-blur-2xl animate-in slide-in-from-top-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "rounded-lg px-3 py-2.5 font-semibold transition-colors",
                pathname === link.href ? "bg-accent text-primary" : "text-foreground/80 hover:bg-accent hover:text-primary"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="my-1 h-px bg-border/70" />
          <Button variant="outline" className="h-10 w-full justify-center gap-2 rounded-full border-primary/15 bg-white/60 text-primary">
            <User className="size-4" />
            Patient Portal
          </Button>
          <Link href="/consultation" onClick={() => setIsMobileMenuOpen(false)} className="w-full">
            <Button className="h-10 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-container">
              Book Consultation
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
