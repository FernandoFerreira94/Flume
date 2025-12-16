import { JSX } from "react";
import { color } from "@/src/styles/color";
import { SideBar } from "./SideBar/sideBar";
import { HeaderDashboard } from "./Header/HeaderDashboard";

export function Main({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <main
      className={`relative w-full min-h-screen flex flex-col ${color.background} `}
    >
      <SideBar />
      {children}
    </main>
  );
}
