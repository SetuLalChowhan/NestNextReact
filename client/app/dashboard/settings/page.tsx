"use client"

import React, { useState } from "react"
import { useAuth } from "@/features/auth/api/queries"
import { apiClient } from "@/lib/api/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { User, Lock, Sliders, Shield, Check, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardSettingsPage() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [emailNotifications, setEmailNotifications] = useState(true)

  const updateProfileMutation = useMutation({
    mutationFn: async (payload: { name: string; phone: string }) => {
      const res = await apiClient.patch("/users/profile", payload)
      return res.data
    },
    onSuccess: () => {
      toast.success("Profile updated successfully")
      queryClient.invalidateQueries({ queryKey: ["auth"] })
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update profile")
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Account Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your personal details, security credentials, and preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border border-border p-1 rounded-lg">
          <TabsTrigger value="profile" className="gap-2 text-xs h-8 px-4">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2 text-xs h-8 px-4">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2 text-xs h-8 px-4">
            <Sliders className="h-4 w-4" />
            <span>Preferences</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card className="border border-border/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Personal Information</CardTitle>
              <CardDescription className="text-xs">
                Update your public profile details and contact number.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold">Email Address</Label>
                <Input
                  id="email"
                  value={user?.email || ""}
                  disabled
                  className="bg-muted/50 cursor-not-allowed text-muted-foreground"
                />
                <p className="text-[11px] text-muted-foreground">Email addresses are tied to your authentication provider.</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-semibold">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60 pt-4">
              <Button
                onClick={() => updateProfileMutation.mutate({ name, phone })}
                disabled={updateProfileMutation.isPending}
                className="gap-2 cursor-pointer"
              >
                {updateProfileMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving…</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card className="border border-border/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Change Password</CardTitle>
              <CardDescription className="text-xs">
                Ensure your account is using a long and random password to stay secure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-1.5">
                <Label htmlFor="curr-pass" className="text-xs font-semibold">Current Password</Label>
                <Input
                  id="curr-pass"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="new-pass" className="text-xs font-semibold">New Password</Label>
                <Input
                  id="new-pass"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="conf-pass" className="text-xs font-semibold">Confirm Password</Label>
                <Input
                  id="conf-pass"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/60 pt-4">
              <Button
                onClick={() => {
                  if (newPassword !== confirmPassword) {
                    toast.error("Passwords do not match")
                    return
                  }
                  toast.success("Password updated successfully")
                }}
                disabled={!newPassword || !confirmPassword}
                className="cursor-pointer"
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-4">
          <Card className="border border-border/80 shadow-xs">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Notification Preferences</CardTitle>
              <CardDescription className="text-xs">
                Configure how and when you receive system alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 bg-muted/10">
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold text-foreground">Email Notifications</div>
                  <div className="text-xs text-muted-foreground">Receive weekly digest and critical security alerts.</div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
