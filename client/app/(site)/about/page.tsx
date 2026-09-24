import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Box, Code, Cpu, Database, Layers, Lock, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About the Boilerplate Architecture",
  description: "Learn about the clean modular monorepo structure powering this application.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 max-w-5xl space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          About this Platform
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Designed with clean architecture, enterprise standards, and developer experience at the core.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border border-border/80 shadow-xs">
          <CardHeader>
            <div className="p-2.5 w-fit rounded-lg bg-primary/10 mb-2">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-bold">NestJS REST API</CardTitle>
            <CardDescription className="text-xs">Modular, scalable server backend</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>• Better-Auth integration with Prisma Pg adapter.</p>
            <p>• Global exception filters & response interceptors.</p>
            <p>• Automatic OpenAPI/Swagger documentation at <code>/api/docs</code>.</p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-xs">
          <CardHeader>
            <div className="p-2.5 w-fit rounded-lg bg-primary/10 mb-2">
              <Layers className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-bold">Next.js 16 Client</CardTitle>
            <CardDescription className="text-xs">Customer portal & public site</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>• App router with server and client components.</p>
            <p>• TanStack Query v5 state management.</p>
            <p>• Shadcn UI primitives with Tailwind CSS v4 tokens.</p>
          </CardContent>
        </Card>

        <Card className="border border-border/80 shadow-xs">
          <CardHeader>
            <div className="p-2.5 w-fit rounded-lg bg-primary/10 mb-2">
              <Box className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-base font-bold">React + Vite Admin</CardTitle>
            <CardDescription className="text-xs">High performance management panel</CardDescription>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-2">
            <p>• Instant HMR with Vite 7.</p>
            <p>• Role-guarded router with lazy loading.</p>
            <p>• Complete user management & UI kitchen sink.</p>
          </CardContent>
        </Card>
      </div>

      <div className="p-8 rounded-2xl bg-card border border-border/80 shadow-xs text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Explore the Complete UI Library</h2>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          Preview buttons, dialogs, inputs, date pickers, multi-selects, data tables, and badges across light and dark modes.
        </p>
        <Button asChild size="lg" className="rounded-xl h-10 px-6 font-semibold">
          <Link href="/showcase">View UI Kitchen Sink</Link>
        </Button>
      </div>
    </div>
  );
}
