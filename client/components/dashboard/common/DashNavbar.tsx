"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Menu,
  User as UserIcon,
  Settings,
  LogOut,
  Search,
  ExternalLink,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/features/auth/api/queries";

export interface DashNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DashNavbar: React.FC<DashNavbarProps> = ({ open, setOpen }) => {
  const pathname = usePathname();
  const { user, logout, logoutMutation } = useAuth();

  // Generate dynamic breadcrumbs based on pathname
  const pathnames = pathname.split("/").filter(Boolean);

  const initials = (user?.name ?? user?.email ?? "US")
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 md:px-8 shrink-0">
      {/* Left side: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 shrink-0 lg:hidden text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Dynamic Breadcrumbs */}
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground text-xs md:text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames
              .filter((segment) => segment !== "dashboard")
              .map((value, index, arr) => {
                const to = `/dashboard/${arr.slice(0, index + 1).join("/")}`;
                const isLast = index === arr.length - 1;
                const formattedName =
                  value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");

                return (
                  <React.Fragment key={to}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage className="font-semibold text-foreground truncate max-w-[120px] md:max-w-[200px] text-xs md:text-sm">
                          {formattedName}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link
                            href={to}
                            className="text-muted-foreground hover:text-foreground capitalize text-xs md:text-sm transition-colors"
                          >
                            {formattedName}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Right side: Global search, links, notifications, profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search bar */}
        <div className="relative w-40 md:w-56 hidden md:block">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search dashboard..."
            className="pl-8 h-8 text-xs bg-muted/50 border-border focus-visible:ring-primary"
          />
        </div>

        {/* Quick Link to Main Website */}
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground h-8 px-2.5"
        >
          <Link href="/">
            <ExternalLink className="h-3.5 w-3.5" />
            <span>Website</span>
          </Link>
        </Button>

        {/* Quick Link to Showcase */}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="hidden lg:inline-flex items-center gap-1.5 text-xs h-8 px-2.5 bg-background shadow-2xs"
        >
          <Link href="/dashboard/showcase">
            <Layers className="h-3.5 w-3.5 text-primary" />
            <span>UI Showcase</span>
          </Link>
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 text-muted-foreground hover:text-foreground rounded-full cursor-pointer"
            >
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg">
            <DropdownMenuLabel className="p-3.5 font-semibold text-sm border-b border-border">
              Notifications
            </DropdownMenuLabel>
            <div className="p-6 text-center">
              <p className="text-xs text-muted-foreground">
                No new notifications. Everything is up to date!
              </p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-8 w-8 rounded-full p-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Avatar className="h-8 w-8 border border-border">
                {user?.image && <AvatarImage src={user.image} alt={user.name ?? "User"} />}
                <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 shadow-lg">
            <DropdownMenuLabel className="font-normal flex flex-col p-3">
              <span className="font-semibold text-sm text-foreground truncate">
                {user?.name ?? "Logged In User"}
              </span>
              <span className="text-xs text-muted-foreground truncate mt-0.5">
                {user?.email ?? "user@example.com"}
              </span>
              {user?.role && (
                <span className="mt-1.5 inline-block w-fit text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase">
                  {user.role}
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-2 w-full py-1.5 text-xs">
                <UserIcon className="h-3.5 w-3.5 text-muted-foreground" />
                Dashboard Overview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 w-full py-1.5 text-xs"
              >
                <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                Account Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link
                href="/dashboard/showcase"
                className="flex items-center gap-2 w-full py-1.5 text-xs"
              >
                <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                Component Showcase
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              disabled={logoutMutation.isPending}
              onClick={() => logout()}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer py-1.5 text-xs font-medium"
            >
              <div className="flex items-center gap-2 w-full">
                <LogOut className="h-3.5 w-3.5" />
                {logoutMutation.isPending ? "Logging out…" : "Log Out"}
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashNavbar;