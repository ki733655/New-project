"use client";

import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/Header/Main";
import Footer from "@/components/layout/Footer/Footer";
import Login from "@/components/Login/Login";
import { ReactNode } from "react";

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname();

  if (pathname === "/login") {
    return <Login />;
  }

  return (
    <MainLayout>
      {children}
      <Footer />
    </MainLayout>
  );
}
