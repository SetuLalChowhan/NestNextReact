import React, { Suspense } from "react";
import type { Metadata } from "next";
import { AuthSplitLayout } from "@/features/auth";
import { VerifyEmailContent } from "@/features/auth/components/VerifyEmailContent";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to activate your account.",
};

export default function VerifyEmailPage() {
  return (
    <AuthSplitLayout
      headline="Build Fast. Scale Effortlessly."
      subheadline="Production-grade fullstack boilerplate with Next.js, Vite Admin, and NestJS."
      title="Check your email"
      description="We have sent you a secure confirmation link."
    >
      <Suspense
        fallback={
          <div className="text-center py-10 text-muted-foreground">
            Loading verification...
          </div>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </AuthSplitLayout>
  );
}
