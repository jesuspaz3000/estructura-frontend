"use client";

import { ReactNode } from "react";
import { DashboardLayoutContainer } from "@/features/dashboard/components/DashboardLayoutContainer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <DashboardLayoutContainer>
      {children}
    </DashboardLayoutContainer>
  );
}