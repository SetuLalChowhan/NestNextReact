"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { AuthSplitLayout } from "./AuthSplitLayout";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { AuthDivider } from "./AuthDivider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/api/queries";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
  const { login, loginMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = loginMutation.isPending;
  const serverError = loginMutation.error?.message;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <AuthSplitLayout
      headline="Build Fast. Scale Effortlessly."
      subheadline="Production-grade fullstack boilerplate with Next.js, Vite Admin, and NestJS."
      title="Welcome back"
      description="Sign in to access your dashboard and workspace."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        {serverError && (
          <div
            role="alert"
            className="rounded-xl border border-destructive/20 bg-destructive/5 p-3.5 text-sm transition-all"
          >
            <div className="flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-semibold text-foreground text-sm">Unable to sign in</p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {serverError}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-sm font-semibold text-foreground">
            Email address
          </Label>
          <div>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="user@example.com or admin@example.com"
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

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm font-semibold text-foreground">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                disabled={isLoading}
                aria-invalid={!!errors.password}
                className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : ""}`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive font-medium flex items-center gap-1 mt-1">
                {errors.password.message}
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
          <span>{isLoading ? "Signing in..." : "Sign in"}</span>
        </Button>

        <AuthDivider text="or continue with" />
        <GoogleAuthButton disabled={isLoading} />

        <p className="text-center text-xs text-muted-foreground pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </form>
    </AuthSplitLayout>
  );
};
