"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, MapPin, Star, TrendingDown, ArrowRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_TREATMENTS, getCostEstimates } from "@/lib/data";
import { currencies } from "@/lib/currencies";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  AED: "د.إ",
  INR: "₹",
};

// US/UK/Canada reference prices per treatment (for savings calculation)
const US_PRICES: Record<string, number> = {
  "treat-1": 25000,
  "treat-2": 35000,
  "treat-3": 40000,
  "treat-4": 50000,
  "treat-5": 4000,
  "treat-6": 12000,
  "treat-7": 150000,
  "treat-8": 15000,
  "treat-9": 20000,
  "treat-10": 5000,
};

export default function CostEstimatorPage() {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [estimates, setEstimates] = useState<ReturnType<typeof getCostEstimates>>([]);
  const [loading, setLoading] = useState(false);

  function calculate() {
    if (!selectedTreatment) return;
    setLoading(true);
    // Simulate slight delay for UX
    setTimeout(() => {
      const results = getCostEstimates(selectedTreatment, selectedCurrency);
      setEstimates(results.sort((a, b) => a.averageCost - b.averageCost));
      setLoading(false);
    }, 400);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (selectedTreatment) calculate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTreatment, selectedCurrency]);

  const treatment = MOCK_TREATMENTS.find((t) => t.id === selectedTreatment);
  const symbol = CURRENCY_SYMBOLS[selectedCurrency] ?? "$";
  const usPrice = selectedTreatment ? US_PRICES[selectedTreatment] ?? 0 : 0;

  const rates: Record<string, number> = {
    USD: 1, EUR: 0.92, GBP: 0.79, AED: 3.67, INR: 83.5,
  };
  const convertedUsPrice = Math.round(usPrice * (rates[selectedCurrency] ?? 1));

  const cheapest = estimates[0];
  const savingsPercent = cheapest
    ? Math.round(((usPrice - cheapest.averageCost) / usPrice) * 100)
    : 0;

  return (
    <div>
      <PageHeader
        badge="Smart Tools"
        title="Treatment Cost"
        titleHighlight="Estimator"
        description="Instantly compare treatment costs across India's top hospitals in your preferred currency. See how much you can save vs Western prices."
        centered
      />

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        {/* Selector Card */}
        <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-lg mb-10">
          <h2 className="font-heading text-xl font-bold text-primary mb-6 text-center">
            Select Your Treatment & Currency
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Treatment</label>
              <Select onValueChange={(v: string | null) => { if (v) setSelectedTreatment(v); }} value={selectedTreatment}>
                <SelectTrigger id="treatment-select" className="h-12 rounded-xl border-border/70 text-sm">
                  <SelectValue placeholder="Choose a treatment…" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_TREATMENTS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Currency</label>
              <Select onValueChange={(v: string | null) => { if (v) setSelectedCurrency(v); }} value={selectedCurrency}>
                <SelectTrigger id="currency-select" className="h-12 rounded-xl border-border/70 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {!selectedTreatment && (
            <p className="text-center text-sm text-muted-foreground">
              ☝️ Select a treatment above to see instant cost comparisons
            </p>
          )}
        </div>

        {/* Savings Banner */}
        {selectedTreatment && cheapest && (
          <div className="bg-primary rounded-2xl p-6 mb-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center shrink-0">
                <TrendingDown className="w-7 h-7 text-secondary-fixed" />
              </div>
              <div>
                <p className="text-white/70 text-sm">vs. USA average price</p>
                <p className="font-heading text-2xl font-bold text-secondary-fixed">
                  Save up to {savingsPercent}%
                </p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-white/70 text-sm">USA price ≈</p>
              <p className="font-heading text-xl font-bold line-through text-white/50">
                {symbol}{convertedUsPrice.toLocaleString()}
              </p>
              <p className="font-heading text-2xl font-bold text-secondary-fixed">
                India from {symbol}{(cheapest.convertedCost).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-12">
            <LoadingSpinner size="lg" text="Calculating estimates…" />
          </div>
        )}

        {/* Results */}
        {!loading && estimates.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-primary mb-5">
              Hospital Comparison — {treatment?.name}
            </h3>

            {estimates.map((est, i) => (
              <div
                key={est.hospitalId}
                className={`bg-card rounded-2xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md ${
                  i === 0
                    ? "border-secondary/40 shadow-md"
                    : "border-border/50"
                }`}
              >
                {i === 0 && (
                  <div className="absolute -top-px left-5 bg-secondary text-secondary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-b-full">
                    Best Value
                  </div>
                )}

                <div className="relative flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-primary/60" />
                    <h4 className="font-semibold text-primary">{est.hospitalName}</h4>
                    {i === 0 && (
                      <span className="text-[10px] font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                        Best Value
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {est.city}, India
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      {est.rating}
                    </span>
                    <span className="text-xs bg-accent px-2 py-0.5 rounded-full text-primary font-medium">
                      {est.accreditation.split(",")[0]}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:shrink-0">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Avg. Cost</p>
                    <p className="font-heading text-2xl font-bold text-primary">
                      {symbol}{est.convertedCost.toLocaleString()}
                    </p>
                    {selectedCurrency !== "USD" && (
                      <p className="text-xs text-muted-foreground">
                        ≈ ${est.averageCost.toLocaleString()} USD
                      </p>
                    )}
                  </div>
                  <Link href={`/hospitals/${est.hospitalId}`}>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white shrink-0"
                    >
                      View
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Want a personalised cost estimate with all inclusions?
              </p>
              <Link href="/consultation">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary-container px-8 h-12 sheen-btn">
                  Get Personalised Quote — Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && selectedTreatment && estimates.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <RefreshCw className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p>No pricing data available for this treatment yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
