"use client";
import { SideBar } from "@/components/layout/sideBar";
import { color } from "@/src/styles/color";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className={`relative w-full min-h-screen flex flex-col  max-sm:mb-10 ${color.background} `}
    >
      <SideBar />
      {children}
    </main>
  );
}
