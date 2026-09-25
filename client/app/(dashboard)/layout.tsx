import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
