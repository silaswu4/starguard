"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/app-shell";

const MARKETING_PREFIXES = [
  "/platform",
  "/solutions",
  "/pricing",
  "/resources",
  "/company",
  "/security",
];

function isMarketingRoute(pathname: string | null) {
  if (!pathname) return false;
  if (pathname === "/") return true;
  return MARKETING_PREFIXES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  );
}

export function ShellRouter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isMarketingRoute(pathname)) return <>{children}</>;
  return <AppShell>{children}</AppShell>;
}
