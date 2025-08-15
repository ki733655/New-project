// src/components/SidebarProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type SidebarContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
  isMounted: boolean;
};

const SidebarContext = createContext<SidebarContextType>({
  open: false,
  setOpen: () => {},
  isMounted: false,
});

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  // Read localStorage synchronously on initial render (client-only)
  const [open, setOpen] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebarOpen") === "true";
    }
    return false;
  });

  // Flag to indicate client mount (used to disable initial transitions)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Persist whenever open changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("sidebarOpen", open ? "true" : "false");
    }
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, setOpen, isMounted }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
export default SidebarProvider;
    