// Código Corrigido
"use client";

import { color } from "@/src/styles/color";
import { LoginSheet } from "@/src/app/auth/auth.components/Login.Sheet";
import { SheetRegister } from "../../app/auth/auth.components/Register.Sheet";
import { PiChartLineUp } from "react-icons/pi";

export function Header() {
  return (
    <header className="w-full h-20 flex items-center ">
      <nav className="container mx-auto px-4 justify-between flex">
        <div className="flex items-center gap-2">
          <PiChartLineUp
            className={`p-2 rounded-lg  ${color.backGroundGradient} text-[#F6F3ED]`} // Usando a cor escura do seu gradiente
            size={40}
          />
          <span className="text-xl font-semibold tracking-tight text-[#1F2937] dark:text-[#f6f3ed]">
            Flume
          </span>
        </div>
        <div className="flex gap-4">
          <span className="bg-[#1F2937] dark:bg-[#374151] h-9 px-4 text-primary-foreground hover:scale-105 duration-400 ease-in-out  cursor-pointer  dark:text-[#f6f3ed] items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 ">
            <LoginSheet />
          </span>
          <span className="cursor-pointer inline-flex h-9 px-4 dark:bg-transparent dark:border-[#f6f3ed]  dark:text-[#f6f3ed]  items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none  focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40  border-2 border-transparent  hover:border-[#1F2937] bg-background shadow-xs hover:bg-gray-50 hover:text-accent-foreground  dark:hover:bg-input/50 text-[#1F2937]">
            <SheetRegister titulo="Criar Conta" />
          </span>
        </div>
      </nav>
    </header>
  );
}
