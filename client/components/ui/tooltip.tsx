"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  className?: string
}

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>

export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative inline-block group">{children}</div>
)

export const TooltipTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => (
  <>{children}</>
)

export const TooltipContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex z-50 overflow-hidden rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md animate-in fade-in-0 zoom-in-95 pointer-events-none whitespace-nowrap",
      className
    )}
  >
    {children}
  </div>
)
