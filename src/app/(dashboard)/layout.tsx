import { ReactNode } from "react";
import DaDashboardContainer from "@/components/dashboard";
import Header from "@/components/dashboard/header"

export default function Layout({ children } : Readonly<{ children: ReactNode; }>) {
  return (
    <DaDashboardContainer header={<Header />}>
      {children}
    </DaDashboardContainer>

  )
}
