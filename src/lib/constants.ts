import { env } from "@/lib/env";

export const siteConfig = {
  name: "MediBridge India",
  description:
    "Premier Medical Tourism Platform — Connecting international patients with world-class, affordable healthcare in India.",
  url: env.NEXT_PUBLIC_SITE_URL,
  ogImage: "/og-image.jpg",
};

export const navLinks = [
  { label: "Treatments", href: "/treatments" },
  { label: "Hospitals", href: "/hospitals" },
  { label: "Doctors", href: "/doctors" },
  { label: "Cost Estimator", href: "/cost-estimator" },
] as const;

export const treatmentCategories = [
  "Cardiology",
  "Orthopedics",
  "Oncology",
  "Neurology",
  "Ophthalmology",
  "Dental",
  "Cosmetic Surgery",
  "Fertility & IVF",
  "Organ Transplant",
  "Bariatric Surgery",
] as const;

export const indianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
] as const;

export const accreditationTypes = ["JCI", "NABH", "NABL", "ISO"] as const;

export const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
] as const;

export const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  INR: 83.5,
};
