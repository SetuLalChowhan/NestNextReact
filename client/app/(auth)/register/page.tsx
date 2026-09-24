"use client";

import React from "react";
import Link from "next/link";
import {
  AuthSplitLayout,
  GoogleAuthButton,
  AuthDivider,
  RegisterForm,
} from "@/features/auth";

export default function RegisterPage() {
  return (
    <AuthSplitLayout
      title="Create your account"
      description="Get started with your free developer account"
      headline="Build Fast. Scale Effortlessly."
      subheadline="Production-grade fullstack boilerplate with Next.js, Vite Admin, and NestJS."
    >
      <div className="space-y-5">
        <GoogleAuthButton label="Sign up with Google" />

        <AuthDivider text="Or register with email" />

        <RegisterForm role="USER" />

        <p className="text-center text-xs text-muted-foreground pt-2">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary font-semibold hover:text-primary-dark underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
