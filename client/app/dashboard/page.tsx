"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Activity,
  ArrowUpRight,
  Box,
  Layers,
  ShieldCheck,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Settings,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/features/auth/api/queries"

const METRIC_CARDS = [
  {
    title: "Active Modules",
    value: "14",
    change: "+3 this week",
    icon: <Box className="h-5 w-5 text-primary" />,
  },
  {
    title: "System Telemetry",
    value: "99.98%",
    change: "Uptime steady",
    icon: <Activity className="h-5 w-5 text-emerald-500" />,
  },
  {
    title: "Security Shield",
    value: "Protected",
    change: "Better-Auth v1.7",
    icon: <ShieldCheck className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "API Performance",
    value: "32ms",
    change: "Sub-50ms latency",
    icon: <Zap className="h-5 w-5 text-amber-500" />,
  },
]

const RECENT_ACTIVITIES = [
  {
    id: "ACT-101",
    action: "User Authentication",
    status: "Success",
    time: "Just now",
    description: "Session established via Better-Auth HTTP-only credentials",
  },
  {
    id: "ACT-102",
    action: "Component Showcase Rendered",
    status: "Success",
    time: "5 minutes ago",
    description: "Shadcn UI library kitchen sink mounted successfully",
  },
  {
    id: "ACT-103",
    action: "Database Query Sync",
    status: "Success",
    time: "1 hour ago",
    description: "Prisma client connection pool verified",
  },
]

export default function DashboardHomePage() {
  const { user } = useAuth()
  const [range, setRange] = useState<"daily" | "weekly" | "monthly">("weekly")

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-2">
            <span>Welcome back, {user?.name || "Developer"}</span>
            <span className="text-primary text-xl">👋</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Fullstack production boilerplate with Next.js 16, Vite Admin, and NestJS Server.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Tabs
            value={range}
            onValueChange={(val) => setRange(val as "daily" | "weekly" | "monthly")}
            className="w-auto"
          >
            <TabsList className="bg-card border border-border p-1 rounded-lg h-9">
              <TabsTrigger value="daily" className="text-xs h-7 px-3">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="text-xs h-7 px-3">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="text-xs h-7 px-3">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>

          <Button asChild size="sm" className="gap-1.5 cursor-pointer">
            <Link href="/dashboard/showcase">
              <Sparkles className="h-4 w-4" />
              <span>UI Showcase</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRIC_CARDS.map((card, idx) => (
          <Card key={idx} className="border border-border/80 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {card.title}
              </CardTitle>
              <div className="p-2 rounded-lg bg-muted/40">{card.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span>{card.change}</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart & Quick Action Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity & Performance Chart Representation */}
        <Card className="border border-border/80 shadow-xs lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Weekly Telemetry & Activity Flow</CardTitle>
                <CardDescription className="text-xs">
                  Real-time network requests and application execution metrics
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                Live Data
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-48 w-full flex items-end gap-2 sm:gap-4 pt-8 px-2">
              {[
                { day: "Mon", val: 40 },
                { day: "Tue", val: 65 },
                { day: "Wed", val: 85 },
                { day: "Thu", val: 70 },
                { day: "Fri", val: 95 },
                { day: "Sat", val: 60 },
                { day: "Sun", val: 80 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                    {bar.val}%
                  </div>
                  <div
                    className="w-full bg-primary/20 group-hover:bg-primary rounded-t-md transition-all duration-300"
                    style={{ height: `${bar.val}%` }}
                  />
                  <span className="text-[11px] text-muted-foreground font-medium">{bar.day}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60 text-center">
              <div>
                <div className="text-xs text-muted-foreground">Total API Calls</div>
                <div className="text-lg font-bold text-foreground mt-0.5">12,480</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg Response</div>
                <div className="text-lg font-bold text-foreground mt-0.5">28 ms</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">99.98%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Boilerplate Info */}
        <Card className="border border-border/80 shadow-xs flex flex-col">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Shortcuts</CardTitle>
            <CardDescription className="text-xs">
              Jump directly to core platform features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5">
              <Link
                href="/dashboard/showcase"
                className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      UI Component Catalog
                    </div>
                    <div className="text-[11px] text-muted-foreground">Preview 20+ Shadcn primitives</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/dashboard/settings"
                className="flex items-center justify-between p-3 rounded-lg border border-border/60 hover:bg-muted/30 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Settings className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                      Account & Security
                    </div>
                    <div className="text-[11px] text-muted-foreground">Update profile and passwords</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>

            <div className="p-3.5 rounded-lg bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">💡 Pro-tip:</span> To customize your theme palette, simply update the CSS variables in <code className="font-mono text-[11px] text-primary">globals.css</code>!
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities Table */}
      <Card className="border border-border/80 shadow-xs">
        <CardHeader className="px-6 py-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Platform Activity</CardTitle>
              <CardDescription className="text-xs">
                Audit log of recent system and account events
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-xs">
              <Link href="/dashboard/activity">View All Logs</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/60">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-3.5">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{act.action}</div>
                    <div className="text-[11px] text-muted-foreground">{act.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-[10px] font-medium">
                    {act.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
