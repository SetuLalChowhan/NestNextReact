"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Layers, User } from "lucide-react";
import DashNavbar from "@/components/dashboard/common/DashNavbar";
import DashSidebar, { SidebarItem } from "@/components/dashboard/common/DashSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const sideBarItems: SidebarItem[] = [
    {
      id: 1,
      icon: <LayoutDashboard className="h-5 w-5" />,
      text: "Dashboard",
      path: "/dashboard",
      activePaths: ["/dashboard"],
    },
    {
      id: 2,
      icon: <Layers className="h-5 w-5" />,
      text: "UI Showcase",
      path: "/dashboard/showcase",
      activePaths: ["/dashboard/showcase"],
    },
    {
      id: 3,
      icon: <Settings className="h-5 w-5" />,
      text: "Settings",
      path: "/dashboard/settings",
      activePaths: ["/dashboard/settings"],
      sublink: [
        { id: 1, text: "Profile Details", path: "/dashboard/settings" },
      ],
    },
  ];

  return (
    <div className="flex h-screen min-h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Responsive Dashboard Sidebar */}
      <DashSidebar sidebar={sideBarItems} open={open} setOpen={setOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <DashNavbar open={open} setOpen={setOpen} />

        {/* Scrollable Viewport - Full Width */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-muted/20">
          <div className="w-full space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;