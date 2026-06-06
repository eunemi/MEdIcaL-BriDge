import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | MediBridge India",
  description:
    "Register for your free MediBridge India patient account and start your medical tourism journey today. Access world-class healthcare at a fraction of the cost.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
