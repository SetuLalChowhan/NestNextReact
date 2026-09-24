import React from "react";
import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to access your dashboard and workspace.",
};

export default function LoginPage() {
  return <LoginForm />;
}
