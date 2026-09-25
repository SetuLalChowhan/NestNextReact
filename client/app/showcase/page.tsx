import React from "react"
import type { Metadata } from "next"
import ComponentsShowcase from "@/components/showcase/ComponentsShowcase"
import Header from "@/shared/Header"
import Footer from "@/shared/Footer"


export const metadata: Metadata = {
  title: "UI Components Showcase - Boilerplate",
  description: "Comprehensive kitchen sink of Shadcn UI components and design system tokens.",
}

export default function ShowcasePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 container mx-auto px-4 md:px-8 py-10 max-w-6xl">
        <ComponentsShowcase />
      </main>
      <Footer />
    </div>
  )
}
