import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Database,
  Lock,
  Sparkles,
  LayoutDashboard,
  Cpu,
  RefreshCw,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Modern Fullstack Boilerplate - Next.js, Vite Admin & NestJS",
  description:
    "Production-ready monorepo boilerplate featuring Next.js 16, Vite React Admin, NestJS API, Better-Auth, Prisma ORM, and Shadcn UI.",
};

const FEATURES = [
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Unified Better-Auth",
    description: "Robust authentication supporting email/password, social OAuth (Google), HTTP-only cookies, and Bearer token synchronization.",
  },
  {
    icon: <Layers className="h-6 w-6 text-primary" />,
    title: "Consistent Shadcn UI",
    description: "Shared Radix & Tailwind v4 component system across both Client & Admin with dynamic CSS theme tokens.",
  },
  {
    icon: <Cpu className="h-6 w-6 text-primary" />,
    title: "NestJS 12 + Prisma",
    description: "Enterprise backend architecture with PostgreSQL pooling, global validation pipes, structured logger, and Swagger docs.",
  },
  {
    icon: <LayoutDashboard className="h-6 w-6 text-primary" />,
    title: "Dual Client & Admin Portals",
    description: "Pre-configured Next.js customer portal alongside high-performance React + Vite Admin dashboard.",
  },
  {
    icon: <Palette className="h-6 w-6 text-primary" />,
    title: "Theme Token System",
    description: "Easily reskin the entire application by changing CSS variables in globals.css without modifying component logic.",
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "TanStack Query v5",
    description: "Declarative server state management, automated optimistic updates, and smart cache invalidation.",
  },
];

const STACK_BADGES = [
  "Next.js 16",
  "React 19",
  "NestJS 12",
  "Better-Auth",
  "Prisma ORM",
  "PostgreSQL",
  "Tailwind CSS v4",
  "Shadcn UI",
  "TanStack Query",
  "Zod",
];

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24 border-b border-border bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Clean Architecture Fullstack Boilerplate</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            The Clean Starting Point for Your Next <span className="text-primary">Fullstack Web App</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Enterprise NestJS REST API, Next.js 16 Client Portal, and React Vite Admin Panel powered by Better-Auth, Prisma, and Shadcn UI.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Button asChild size="lg" className="gap-2 text-sm font-semibold rounded-xl h-11 px-6 shadow-sm">
              <Link href="/dashboard">
                <span>Open User Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 text-sm font-semibold rounded-xl h-11 px-6">
              <Link href="/showcase">
                <Layers className="h-4 w-4 text-primary" />
                <span>Explore UI Showcase</span>
              </Link>
            </Button>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {STACK_BADGES.map((badge) => (
              <Badge key={badge} variant="secondary" className="text-xs px-3 py-1 font-medium bg-card border border-border/80">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Built for Speed and Scale</h2>
            <p className="text-sm text-muted-foreground">
              Pre-architected with best practices so you can focus directly on your business logic.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, idx) => (
              <Card key={idx} className="border border-border/80 shadow-xs hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="p-2.5 w-fit rounded-lg bg-primary/10 mb-2">{feature.icon}</div>
                  <CardTitle className="text-base font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-14 border-y border-border bg-card">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-extrabold text-primary">100%</div>
              <div className="text-xs text-muted-foreground mt-1">TypeScript Strict</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary">20+</div>
              <div className="text-xs text-muted-foreground mt-1">Shadcn UI Components</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary">&lt;30ms</div>
              <div className="text-xs text-muted-foreground mt-1">API Response Latency</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary">Dual</div>
              <div className="text-xs text-muted-foreground mt-1">Client + Admin Portals</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 bg-background text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Ready to Build Your Next Big Project?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            Everything is configured: Auth, Database, API validation, Admin panel, and Design tokens.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Button asChild size="lg" className="rounded-xl h-11 px-8 font-semibold">
              <Link href="/register">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl h-11 px-8 font-semibold">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}