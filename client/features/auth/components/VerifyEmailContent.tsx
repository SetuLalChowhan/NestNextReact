"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Mail,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/api/queries";

export const VerifyEmailContent: React.FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const status = searchParams.get("status");
  const errorMessage = searchParams.get("message");
  const email = searchParams.get("email") || "";

  const {
    verifyEmail,
    verifyEmailMutation,
    resendVerificationEmail,
    resendVerificationEmailMutation,
  } = useAuth();

  const isManualVerifying = verifyEmailMutation.isPending;
  const isManualSuccess = verifyEmailMutation.isSuccess;
  const isManualError = verifyEmailMutation.error?.message;
  const isResending = resendVerificationEmailMutation.isPending;

  const [countdown, setCountdown] = useState(45);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleManualVerify = () => {
    if (token) {
      verifyEmail(token);
    }
  };

  const handleResend = async () => {
    if (countdown > 0 || isResending || !email) return;
    try {
      await resendVerificationEmail({ email });
      setResendSuccess(true);
      setCountdown(60);
    } catch {
      // Toast notification handled by hook
    }
  };

  if (status === "success" || isManualSuccess) {
    return (
      <div className="space-y-5 text-center py-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800/50">
          <CheckCircle2 className="h-8 w-8 stroke-[2.2]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Email verified!</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your email has been successfully verified. You can now sign in and access all platform features.
          </p>
        </div>
        <Link href="/login" className="block pt-2">
          <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm">
            <span>Continue to Sign in</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  if (status === "error" || isManualError) {
    return (
      <div className="space-y-5 text-center py-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive border border-destructive/20">
          <AlertCircle className="h-8 w-8 stroke-[2.2]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Verification Failed</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            {errorMessage || isManualError || "The verification link is invalid or has expired."}
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-2">
          <Link href="/login">
            <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2">
              <span>Go to Sign In</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (token) {
    return (
      <div className="space-y-5 text-center py-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
          <ShieldCheck className="h-8 w-8 stroke-[2.2]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Confirm Email Verification</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Click the button below to verify your email address and activate your account.
          </p>
        </div>
        <Button
          onClick={handleManualVerify}
          disabled={isManualVerifying}
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl flex items-center justify-center gap-2 cursor-pointer"
        >
          {isManualVerifying && <Loader2 className="h-4 w-4 animate-spin" />}
          <span>{isManualVerifying ? "Verifying..." : "Verify Email Now"}</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 text-center py-4">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
        <Mail className="h-8 w-8 stroke-[2.2]" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Check your inbox</h2>
        <p className="text-sm sm:text-base text-muted-foreground">
          We sent a verification link to{" "}
          <span className="font-semibold text-foreground break-all">{email || "your email address"}</span>.
        </p>
      </div>

      <div className="pt-3 space-y-3">
        <Button
          onClick={handleResend}
          disabled={countdown > 0 || isResending || !email}
          variant="outline"
          className="w-full h-11 rounded-xl font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          {isResending ? (
            <>
              <RotateCw className="h-4 w-4 animate-spin" />
              <span>Resending...</span>
            </>
          ) : countdown > 0 ? (
            <span>Resend code in {countdown}s</span>
          ) : (
            <>
              <RotateCw className="h-4 w-4" />
              <span>Resend verification email</span>
            </>
          )}
        </Button>

        {resendSuccess && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in">
            A new verification email has been dispatched.
          </p>
        )}

        <div className="pt-2">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
          >
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
