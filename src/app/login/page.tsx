import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Sign In | MediBridge India",
  description:
    "Access your MediBridge patient portal. Manage appointments, medical reports, and connect with world-class Indian healthcare specialists.",
};

export default function LoginPage() {
  return <LoginForm />;
}
