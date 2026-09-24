import React from "react"
import type { Metadata } from "next"
import ComponentsShowcase from "@/components/showcase/ComponentsShowcase"

export const metadata: Metadata = {
  title: "Components Showcase - Dashboard",
  description: "Explore all interactive UI primitives within the dashboard shell.",
}

export default function DashboardShowcasePage() {
  return (
    <div className="space-y-6">
      <ComponentsShowcase />
    </div>
  )
}
