"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/api/queries";

interface GuardProps {
  children: React.ReactNode;
}

export default function Guard({ children }: GuardProps) {
  const router = useRouter();
  const { isAuthenticated, isSessionLoading } = useAuth();

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isSessionLoading, router]);

  if (isSessionLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export const PrivateRoute = Guard;