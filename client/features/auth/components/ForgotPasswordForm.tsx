"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { AuthSplitLayout } from "./AuthSplitLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/api/queries";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, forgotPasswordMutation } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const isLoading = forgotPasswordMutation.isPending;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    await forgotPassword({ email: data.email });
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
  };

  return (
    <AuthSplitLayout
      headline="Build Fast. Scale Effortlessly."
      subheadline="Production-grade fullstack boilerplate with Next.js, Vite Admin, and NestJS."
      title="Forgot your password?"
      description="Enter your email and we'll send you a secure password reset link."
    >
      {isSubmitted ? (
        <div className="space-y-6 text-center animate-in fade-in duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Reset link sent!</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We&apos;ve sent instructions to{" "}
              <span className="font-semibold text-foreground">{submittedEmail}</span>. Please check your inbox.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="w-full h-11 rounded-xl"
            >
              Try another email address
            </Button>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to log in</span>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              Email address
            </Label>
            <div>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="user@example.com"
                disabled={isLoading}
                aria-invalid={!!errors.email}
                className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl cursor-pointer shadow-sm"
          >
            {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            <span>{isLoading ? "Sending reset link..." : "Send reset link"}</span>
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to log in</span>
            </Link>
          </div>
        </form>
      )}
    </AuthSplitLayout>
  );
};
