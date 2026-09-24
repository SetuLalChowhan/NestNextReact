"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  signIn,
  signUp,
  signOut,
  useSession,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
} from "./client";
import { apiClient } from "@/lib/api/client";
import { ApiError } from "@/lib/api/error";
import { CACHE } from "@/lib/cache/policy";
import { toast } from "react-toastify";
import { User, Role, LoginParams, RegisterParams, authKeys } from "../types";

/**
 * Helper to determine dashboard route based on user role
 */
export function getRoleDashboardRoute(role?: Role | string | null): string {
  switch (role) {
    case "ADMIN":
      return "/dashboard";
    case "USER":
    default:
      return "/dashboard";
  }
}

/**
 * useAuth Hook
 *
 * Single source of truth for authentication across client applications.
 */
export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 1. Session resolution
  const { data: session, isPending: isSessionLoading } = useSession();
  const isAuthenticated = Boolean(session?.user);

  // Fetch full user profile from backend
  const { data: profileUser, isLoading: isProfileLoading } = useQuery<User | null>({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const res = await apiClient.get("/users/me");
      return res.data?.data || res.data || null;
    },
    enabled: !isSessionLoading && isAuthenticated,
    staleTime: CACHE.profile.client.staleTime,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false;
      return failureCount < 1;
    },
  });

  const user = profileUser || (session?.user as unknown as User) || null;
  const role = (user?.role as Role) || "USER";

  // 2. Auth mutations

  // Email & Password Login
  const loginMutation = useMutation({
    mutationFn: async ({ email, password, rememberMe = true }: LoginParams) => {
      const res = await signIn.email({ email, password: password || "", rememberMe });
      if (res.error) {
        throw new Error(res.error.message || "Invalid email or password.");
      }
      return res.data;
    },
    onSuccess: (data, variables) => {
      toast.success("Welcome back! Signed in successfully.");
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      const destination = variables.redirectTo || "/dashboard";
      router.push(destination);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to sign in");
    },
  });

  // Account Registration
  const registerMutation = useMutation({
    mutationFn: async ({ name, email, password, phone, role = "USER" }: RegisterParams) => {
      const res = await signUp.email({
        email,
        password: password || "",
        name,
        phone,
        role,
      } as unknown as Parameters<typeof signUp.email>[0]);
      if (res.error) {
        throw new Error(res.error.message || "Failed to create account.");
      }
      return res.data;
    },
    onSuccess: (_data, variables) => {
      toast.success("Account created successfully!");
      router.push(`/dashboard`);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to create account");
    },
  });

  // Sign Out
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await signOut();
    },
    onSuccess: () => {
      toast.success("Signed out successfully");
      queryClient.clear();
      router.push("/login");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to log out");
    },
  });

  // Forgot Password Request
  const forgotPasswordMutation = useMutation({
    mutationFn: async ({ email, redirectTo }: { email: string; redirectTo?: string }) => {
      const res = await requestPasswordReset({
        email,
        redirectTo:
          redirectTo ||
          `${typeof window !== "undefined" ? window.location.origin : ""}/reset-password`,
      });
      if (res.error) {
        throw new Error(res.error.message || "Failed to send reset email.");
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to request password reset");
    },
  });

  // Reset Password Execution
  const resetPasswordMutation = useMutation({
    mutationFn: async ({ newPassword, token }: { newPassword: string; token: string }) => {
      const res = await resetPassword({ newPassword, token });
      if (res.error) {
        throw new Error(res.error.message || "Failed to reset password.");
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Password has been reset! Please sign in with your new password.");
      router.push("/login");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to reset password");
    },
  });

  // Verify Email
  const verifyEmailMutation = useMutation({
    mutationFn: async (token: string) => {
      const res = await verifyEmail({ query: { token } });
      if (res.error) {
        throw new Error(res.error.message || "Email verification failed.");
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Email verified successfully!");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Email verification failed");
    },
  });

  // Resend Email Verification Link
  const resendVerificationEmailMutation = useMutation({
    mutationFn: async ({ email, callbackURL }: { email: string; callbackURL?: string }) => {
      const res = await sendVerificationEmail({
        email,
        callbackURL:
          callbackURL || `${typeof window !== "undefined" ? window.location.origin : ""}/`,
      });
      if (res.error) {
        throw new Error(res.error.message || "Failed to resend verification email.");
      }
      return res.data;
    },
    onSuccess: () => {
      toast.success("Verification link sent! Please check your inbox.");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to resend verification email");
    },
  });

  // Google One-Tap Login
  const loginWithGoogleCredentialMutation = useMutation({
    mutationFn: async ({ credential }: { credential: string }) => {
      const res = await apiClient.post("/api/auth/one-tap/callback", {
        idToken: credential,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Welcome! Signed in with Google.");
      queryClient.invalidateQueries({ queryKey: authKeys.all });
      router.push("/dashboard");
    },
    onError: (err: Error) => {
      toast.error(err.message || "Google sign-in failed");
    },
  });

  const loginWithGoogle = useCallback(async (callbackURL = "/dashboard") => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL,
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to initiate Google sign-in.";
      toast.error(message);
    }
  }, []);

  return {
    user,
    role,
    isAdmin: role === "ADMIN",
    isUser: role === "USER",
    isAuthenticated,
    isSessionLoading: isSessionLoading || (isAuthenticated && isProfileLoading),

    // Actions
    login: (params: LoginParams, redirectTo?: string) =>
      loginMutation.mutateAsync({ ...params, redirectTo }),
    register: (params: RegisterParams) => registerMutation.mutateAsync(params),
    logout: () => logoutMutation.mutateAsync(),
    forgotPassword: (params: { email: string; redirectTo?: string }) =>
      forgotPasswordMutation.mutateAsync(params),
    resetPassword: (params: { newPassword: string; token: string }) =>
      resetPasswordMutation.mutateAsync(params),
    verifyEmail: (token: string) => verifyEmailMutation.mutateAsync(token),
    resendVerificationEmail: (params: { email: string; callbackURL?: string }) =>
      resendVerificationEmailMutation.mutateAsync(params),
    loginWithGoogle,
    loginWithGoogleCredential: (credential: string) =>
      loginWithGoogleCredentialMutation.mutateAsync({ credential }),

    // Direct Mutation Handles
    loginMutation,
    registerMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    verifyEmailMutation,
    resendVerificationEmailMutation,
    loginWithGoogleCredentialMutation,
  };
};

export default useAuth;
