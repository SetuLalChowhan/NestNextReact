"use client";

import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "@/features/auth/api/queries";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { env } from "@/lib/config/env";

interface GoogleAuthButtonProps {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function GoogleAuthButton({
  disabled = false,
}: GoogleAuthButtonProps) {
  const { loginWithGoogleCredential, loginWithGoogle, loginWithGoogleCredentialMutation } = useAuth();
  const isGooglePending = loginWithGoogleCredentialMutation.isPending;
  const hasClientId = Boolean(
    env.NEXT_PUBLIC_GOOGLE_CLIENT_ID &&
    env.NEXT_PUBLIC_GOOGLE_CLIENT_ID.trim() !== "" &&
    env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== "dummy-google-client-id"
  );

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error("Google authentication failed. Please try again.");
      return;
    }
    try {
      await loginWithGoogleCredential(credentialResponse.credential);
    } catch {
      // Toast notification is automatically managed by useMutationClient
    }
  };

  if (!hasClientId) {
    return (
      <Button
        type="button"
        variant="outline"
        disabled={disabled || isGooglePending}
        onClick={() => loginWithGoogle()}
        className="w-full h-11 border border-border bg-card hover:bg-muted font-medium text-sm rounded-xl flex items-center justify-center gap-2.5 shadow-2xs cursor-pointer"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span>Continue with Google</span>
      </Button>
    );
  }

  return (
    <div
      className={`w-full relative flex justify-center items-center min-h-[44px] ${
        disabled ? "pointer-events-none opacity-60" : ""
      }`}
    >
      {isGooglePending ? (
        <div className="w-full h-11 border border-border bg-card text-foreground font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-2xs">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Connecting with Google...</span>
        </div>
      ) : (
        <div className="w-full flex justify-center overflow-hidden rounded-xl [&>div]:w-full [&>div]:flex [&>div]:justify-center">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => {
              toast.error("Google sign in was cancelled or failed.");
            }}
            theme="outline"
            size="large"
            shape="rectangular"
            text="continue_with"
            width="380"
          />
        </div>
      )}
    </div>
  );
}

export default GoogleAuthButton;
