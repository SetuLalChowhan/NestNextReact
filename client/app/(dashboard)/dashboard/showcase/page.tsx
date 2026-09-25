"use client";

import React from "react";
import ComponentsShowcase from "@/components/showcase/ComponentsShowcase";

export default function DashboardShowcasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Component Showcase
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Explore and test all interactive Shadcn UI primitives, form controls, dialogues, and states.
        </p>
      </div>

      <div className="pt-2">
        <ComponentsShowcase />
      </div>
    </div>
  );
}
