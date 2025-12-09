// Código Corrigido
"use client";
import Image from "next/image";
import IconLogo from "@/assets/icons/icon-azul-primary_-removebg-preview.png";
import { color } from "@/src/color/index";
import { LoginSheet } from "./SheetLogin";
import { SheetRegister } from "./SheetRegister";

export function Header() {
  return (
    <header className="w-full h-20 flex items-center ">
      <nav className="container mx-auto px-4 justify-between flex">
        <div className="flex items-center gap-2">
          <Image
            style={{ backgroundColor: color.azulPrimary }}
            className="p-2 rounded-md"
            src={IconLogo}
            alt="Logo"
            width={50}
            height={50}
          />
          <span className="text-3xl font-semibold tracking-tight text-[#343C52] dark:text-[#f6f3ed]">
            Flume
          </span>
        </div>
        <div className="flex gap-4">
          <span className="bg-[#3E4864] h-9 px-4 text-primary-foreground hover:bg-[#343C52]  cursor-pointer  dark:text-[#f6f3ed] items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
            <LoginSheet />
          </span>
          <span className="cursor-pointer inline-flex h-9 px-4 dark:text-[#f6f3ed] items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium  transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-2 border-[#3E4864] bg-background shadow-xs hover:bg-gray-50 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 text-g[#3E4864]">
            <SheetRegister titulo="Criar Conta" />
          </span>
        </div>
      </nav>
    </header>
  );
}
