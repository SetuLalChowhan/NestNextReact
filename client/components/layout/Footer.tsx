"use client";

import React from "react";
import Link from "next/link";
import BrandLogo from "@/components/common/BrandLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <BrandLogo showTagline={true} />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2">
              Modern fullstack web application boilerplate featuring Next.js 16, Vite React Admin, and NestJS Backend with Better-Auth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3.5">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/showcase" className="hover:text-primary transition-colors">
                  UI Component Kitchen
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Architecture & Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth & Access */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3.5">
              Authentication
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-primary transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground mb-3.5">
              Developers
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="http://localhost:5000/api/docs" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  OpenAPI / Swagger Docs
                </a>
              </li>
              <li>
                <Link href="/showcase" className="hover:text-primary transition-colors">
                  Shadcn UI Primitives
                </Link>
              </li>
              <li>
                <Link href="/dashboard/activity" className="hover:text-primary transition-colors">
                  Audit Telemetry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Fullstack Boilerplate. All rights reserved.</p>
          <p className="flex items-center gap-1.5 font-medium text-foreground/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
            Better-Auth &bull; NestJS 12 &bull; Next.js 16
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
