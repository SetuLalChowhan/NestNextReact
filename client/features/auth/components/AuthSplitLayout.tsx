import React from "react";
import Image, { StaticImageData } from "next/image";
import BrandLogo from "@/components/common/BrandLogo";
import { ShieldCheck } from "lucide-react";
import commonAuthImage from "@/assets/images/authImages.jpg";

interface AuthSplitLayoutProps {
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  headline?: string;
  subheadline?: string;
  trustBadge?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function AuthSplitLayout({
  imageSrc,
  imageAlt = "Fullstack Developer Workspace",
  headline = "Build Fast. Scale Effortlessly.",
  subheadline = "Production-ready monorepo starter kit featuring Next.js, React Vite, and NestJS.",
  trustBadge = "Next.js 16 • React 19 • NestJS 12",
  title,
  description,
  children,
}: AuthSplitLayoutProps) {
  const selectedImage = imageSrc || commonAuthImage;

  return (
    <main className="min-h-dvh w-full flex flex-col lg:flex-row bg-background antialiased selection:bg-accent selection:text-primary">
      {/* Left Column: Visual Storytelling */}
      <section
        aria-label="Brand and Storytelling"
        className="hidden lg:flex lg:w-1/2 p-4 xl:p-6 sticky top-0 h-dvh"
      >
        <div className="relative w-full h-full rounded-2xl xl:rounded-3xl overflow-hidden shadow-card border border-border/40 bg-muted">
          {/* Brand Logo */}
          <div className="absolute top-6 left-6 z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-background/95 backdrop-blur-md shadow-xs border border-border">
              <BrandLogo iconSize={18} />
            </div>
          </div>

          <Image
            src={selectedImage}
            alt={imageAlt}
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Bottom message */}
          <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-10 text-white flex flex-col gap-3">
            {trustBadge && (
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/20 shadow-xs">
                <ShieldCheck className="h-3.5 w-3.5 text-primary-foreground shrink-0" />
                <span>{trustBadge}</span>
              </div>
            )}
            <h2 className="text-xl xl:text-2xl font-semibold tracking-tight text-white leading-snug">
              {headline}
            </h2>
            <p className="text-xs xl:text-sm text-white/85 max-w-md leading-relaxed">
              {subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Right Column: Auth Form */}
      <section
        aria-label="Authentication Form"
        className="w-full lg:w-1/2 min-h-dvh flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12"
      >
        <div className="lg:hidden flex items-center justify-between pb-3.5 border-b border-border/60">
          <BrandLogo iconSize={18} />
        </div>

        <div className="w-full max-w-[540px] mx-auto my-auto py-4 sm:py-6">
          <div className="mb-5 sm:mb-6 text-left">
            <h1 className="text-xl sm:text-2xl lg:text-[28px] font-bold tracking-tight text-foreground leading-tight">
              {title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {description}
            </p>
          </div>

          <div>{children}</div>
        </div>

        <footer className="w-full pt-3 text-center text-xs text-muted-foreground">
          <p>
            Better-Auth Session • Protected with 256-bit encryption.
          </p>
        </footer>
      </section>
    </main>
  );
}

export default AuthSplitLayout;
