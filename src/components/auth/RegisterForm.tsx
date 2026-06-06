"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Loader2, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuthStore } from "@/store/auth";

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia", "UAE",
  "Saudi Arabia", "Germany", "France", "Nigeria", "Kenya", "Bangladesh",
  "Pakistan", "Nepal", "Sri Lanka", "Afghanistan", "Iraq", "Other",
];

export function RegisterForm() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (!form.country) {
      setError("Please select your country.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          password: form.password,
          country: form.country,
          phone: form.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Registration failed. Please try again.");
        return;
      }

      setUser(data.user);
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/40 via-background to-accent/20 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <HeartPulse className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-2xl font-bold text-primary">MediBridge</span>
          </Link>
          <h1 className="font-heading text-3xl font-bold text-primary mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground text-sm">
            Join thousands of international patients
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-panel rounded-3xl p-8 gold-border-gradient">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-foreground/80">
                Full Name
              </label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="John Doe"
                required
                className="h-12 rounded-xl border-border/70"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-email" className="block text-sm font-semibold text-foreground/80">
                Email Address
              </label>
              <Input
                id="reg-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                required
                className="h-12 rounded-xl border-border/70"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 234 567 890"
                  required
                  className="h-12 rounded-xl border-border/70"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-foreground/80">
                  Country
                </label>
                <Select onValueChange={(v: string | null) => { if (v) update("country", v); }}>
                  <SelectTrigger
                    id="country"
                    className="h-12 rounded-xl border-border/70"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="reg-password" className="block text-sm font-semibold text-foreground/80">
                Password
              </label>
              <div className="relative">
                <Input
                  id="reg-password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  className="h-12 rounded-xl border-border/70 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-foreground/80">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="Re-enter password"
                required
                className="h-12 rounded-xl border-border/70"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary-container text-base font-semibold shadow-lg sheen-btn"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By registering you agree to our{" "}
            <span className="text-primary font-medium cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="text-primary font-medium cursor-pointer">Privacy Policy</span>.
          </p>

          <div className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:text-primary-container transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
