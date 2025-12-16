"use client";
import { Button } from "@/components/ui/button";
import { HeaderExpense } from "@/src/components/Header/HeaderExpense";
import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { SideBar } from "@/src/components/SideBar/sideBar";
import { color } from "@/src/styles/color";
import { Plus } from "lucide-react";
import { FolderKanban } from "lucide-react";
export default function Expense() {
  return (
    <Main>
      <SideBar />
      <HeaderExpense titulo="Categorias" subTitulo="Organize suas despesas" />
      <Section>
        <Button className="w-full items-center  h-12 dark:hover:bg-[#1F2937]">
          {" "}
          <Plus />
          Nova categoria
        </Button>
        <div className="w-full flex justify-center mt-14 flex-col items-center gap-4">
          <FolderKanban size={50} className={`${color.textMuted}`} />
          <p className={`text-sm ${color.textMuted}`}>
            Nenhuma categoria cadastrada
          </p>
        </div>
      </Section>
    </Main>
  );
}
