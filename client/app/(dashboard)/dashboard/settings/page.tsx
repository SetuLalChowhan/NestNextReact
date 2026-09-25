"use client";

import React, { useState } from "react";
import { User, Mail, Phone, Shield, KeyRound, Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/api/queries";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api/client";
import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "@/features/auth/types";

export default function SettingsPage() {
  const { user, role, isSessionLoading } = useAuth();
  const queryClient = useQueryClient();

  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isSaving, setIsSaving] = useState(false);

  // Sync state with user data once loaded
  React.useEffect(() => {
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await apiClient.patch("/users/me", {
        name,
        phone: phone || null,
      });
      toast.success("Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: authKeys.all });
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Account Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your personal profile, contact information, and authentication credentials.
        </p>
      </div>

      {/* Profile Form Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-semibold text-foreground text-base">
                {user?.name || "Your Profile"}
              </h2>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-semibold">
            {role || "USER"}
          </Badge>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs font-semibold">
                Full Name
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="pl-9 h-9 text-sm"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="pl-9 h-9 text-sm bg-muted/50 cursor-not-allowed opacity-80"
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs font-semibold">
                Phone Number
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="pl-9 h-9 text-sm"
                />
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-xs font-semibold">
                Role Permission
              </Label>
              <div className="relative">
                <Input
                  id="role"
                  value={role || "USER"}
                  disabled
                  className="pl-9 h-9 text-sm bg-muted/50 cursor-not-allowed opacity-80"
                />
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSaving} className="gap-2 shadow-xs">
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Changes…
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Security Credentials Section */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
            <KeyRound className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm">Security & Password</h3>
            <p className="text-xs text-muted-foreground">
              Manage your password and active Better-Auth credential tokens.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 border border-border/60">
          <div>
            <span className="text-xs font-semibold text-foreground block">
              Password Protection
            </span>
            <span className="text-xs text-muted-foreground">
              Need to reset or change your current password?
            </span>
          </div>
          <Button asChild variant="outline" size="sm" className="bg-background shadow-2xs">
            <a href="/forgot-password">
              Request Password Reset
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
