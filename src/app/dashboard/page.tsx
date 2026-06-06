"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar, FileText, User, Settings, LogOut, ArrowRight,
  CheckCircle2, Clock, XCircle, HeartPulse, Building2, DollarSign, Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { MOCK_APPOINTMENTS, MOCK_REPORTS } from "@/lib/data";

type Tab = "overview" | "appointments" | "reports" | "profile";

const STATUS_MAP = {
  CONFIRMED: { label: "Confirmed", color: "bg-green-50 text-green-700 border-green-100", icon: CheckCircle2 },
  PENDING: { label: "Pending", color: "bg-amber-50 text-amber-700 border-amber-100", icon: Clock },
  COMPLETED: { label: "Completed", color: "bg-blue-50 text-blue-700 border-blue-100", icon: CheckCircle2 },
  CANCELLED: { label: "Cancelled", color: "bg-red-50 text-red-700 border-red-100", icon: XCircle },
};

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push("/login");
    }
  }, [mounted, user, router]);

  if (!mounted || !user) return null;

  async function handleLogout() {
    await logout();
    router.push("/");
  }

  const upcomingCount = MOCK_APPOINTMENTS.filter(
    (a) => a.status === "CONFIRMED" || a.status === "PENDING"
  ).length;

  const navItems: { tab: Tab; label: string; icon: React.ElementType }[] = [
    { tab: "overview", label: "Overview", icon: HeartPulse },
    { tab: "appointments", label: "Appointments", icon: Calendar },
    { tab: "reports", label: "Medical Reports", icon: FileText },
    { tab: "profile", label: "My Profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/20 via-background to-accent/10">
      {/* Top header */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-white/60 text-sm">Welcome back,</p>
            <h1 className="font-heading text-2xl font-bold">{user.fullName}</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="rounded-full border-white/30 text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Logout
          </Button>
        </div>

        {/* Tab nav */}
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-1 pb-0">
            {navItems.map(({ tab, label, icon: Icon }) => (
              <button
                key={tab}
                id={`dashboard-tab-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${
                  activeTab === tab
                    ? "border-secondary-fixed text-secondary-fixed"
                    : "border-transparent text-white/60 hover:text-white/90"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:block">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        {/* ─── OVERVIEW ─── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Appointments", value: MOCK_APPOINTMENTS.length, icon: Calendar, color: "text-primary" },
                { label: "Upcoming", value: upcomingCount, icon: Clock, color: "text-amber-600" },
                { label: "Medical Reports", value: MOCK_REPORTS.length, icon: FileText, color: "text-blue-600" },
                { label: "Completed", value: MOCK_APPOINTMENTS.filter(a => a.status === "COMPLETED").length, icon: CheckCircle2, color: "text-green-600" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="font-heading text-2xl font-bold text-primary">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div>
              <h2 className="font-heading text-xl font-bold text-primary mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link href="/consultation" className="bg-primary rounded-2xl p-5 text-white hover:bg-primary-container transition-colors group flex items-center justify-between">
                  <div>
                    <p className="font-semibold mb-0.5">Book Consultation</p>
                    <p className="text-sm text-white/70">Request a new appointment</p>
                  </div>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/cost-estimator" className="bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all group flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary mb-0.5">Cost Estimator</p>
                    <p className="text-sm text-muted-foreground">Compare treatment costs</p>
                  </div>
                  <DollarSign className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                </Link>
                <button
                  onClick={() => setActiveTab("reports")}
                  className="bg-card border border-border/50 rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all group flex items-center justify-between text-left"
                >
                  <div>
                    <p className="font-semibold text-primary mb-0.5">Upload Report</p>
                    <p className="text-sm text-muted-foreground">Share medical records</p>
                  </div>
                  <FileText className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-bold text-primary">Upcoming Appointments</h2>
                <button onClick={() => setActiveTab("appointments")} className="text-sm text-primary font-semibold hover:text-secondary flex items-center gap-1">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_APPOINTMENTS.filter(a => a.status !== "COMPLETED").slice(0, 2).map((appt) => {
                  const status = STATUS_MAP[appt.status as keyof typeof STATUS_MAP];
                  return (
                    <div key={appt.id} className="bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-5">
                      <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shrink-0">
                        <Building2 className="w-6 h-6 text-primary/60" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-primary truncate">{appt.doctorName}</p>
                        <p className="text-sm text-muted-foreground">{appt.hospital} · {appt.date} at {appt.time}</p>
                      </div>
                      <Badge className={`shrink-0 border ${status.color}`}>{status.label}</Badge>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ─── APPOINTMENTS ─── */}
        {activeTab === "appointments" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-primary">My Appointments</h2>
              <Link href="/consultation">
                <Button className="rounded-full bg-primary text-primary-foreground gap-2">
                  <Plus className="w-4 h-4" />
                  New Appointment
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {MOCK_APPOINTMENTS.map((appt) => {
                const status = STATUS_MAP[appt.status as keyof typeof STATUS_MAP];
                const StatusIcon = status.icon;
                return (
                  <div key={appt.id} className="bg-card border border-border/50 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="font-heading text-lg font-semibold text-primary">{appt.doctorName}</h3>
                        <p className="text-sm text-secondary font-medium">{appt.specialty}</p>
                      </div>
                      <Badge className={`flex items-center gap-1 border ${status.color}`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {status.label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Hospital</p>
                        <p className="font-medium text-foreground">{appt.hospital}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Date & Time</p>
                        <p className="font-medium text-foreground">{appt.date} · {appt.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Treatment</p>
                        <p className="font-medium text-foreground">{appt.treatmentName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-0.5">Fee</p>
                        <p className="font-bold text-primary">${appt.consultationFee}</p>
                      </div>
                    </div>
                    {appt.notes && (
                      <div className="mt-4 bg-accent rounded-xl p-3 text-sm text-foreground/70 border border-primary/10">
                        📋 {appt.notes}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── REPORTS ─── */}
        {activeTab === "reports" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl font-bold text-primary">Medical Reports</h2>
              <Button className="rounded-full bg-primary text-primary-foreground gap-2">
                <Plus className="w-4 h-4" />
                Upload Report
              </Button>
            </div>

            <div className="bg-card border-2 border-dashed border-border rounded-2xl p-10 text-center mb-8">
              <FileText className="w-12 h-12 text-primary/30 mx-auto mb-3" />
              <p className="font-semibold text-primary mb-1">Upload Medical Documents</p>
              <p className="text-sm text-muted-foreground mb-5">
                PDF, JPG, PNG · Max 20MB each · All files are encrypted
              </p>
              <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white">
                Choose Files
              </Button>
            </div>

            <h3 className="font-heading text-lg font-semibold text-primary mb-4">Uploaded Reports</h3>
            <div className="space-y-3">
              {MOCK_REPORTS.map((rep) => (
                <div key={rep.id} className="bg-card border border-border/50 rounded-2xl p-5 flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-primary truncate">{rep.fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {rep.description} · {(rep.fileSize / 1000000).toFixed(1)} MB ·{" "}
                      {new Date(rep.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="rounded-full shrink-0 border-primary/20 text-primary hover:bg-primary hover:text-white">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── PROFILE ─── */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6">My Profile</h2>
            <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white font-heading text-3xl font-bold">
                  {user.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-primary">{user.fullName}</h3>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge className="mt-1 bg-accent text-primary border-primary/10">{user.role}</Badge>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Full Name", value: user.fullName },
                  { label: "Email", value: user.email },
                  { label: "Account Type", value: user.role },
                  { label: "Member Since", value: "2026" },
                ].map((field) => (
                  <div key={field.label} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                    <span className="font-medium text-foreground">{field.value}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary-container gap-2">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
