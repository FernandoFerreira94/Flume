"use client";
import { Button } from "@/components/ui/button";
import { HeaderExpense } from "@/src/components/Header/HeaderExpense";
import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { SideBar } from "@/src/components/SideBar/sideBar";
import { Plus } from "lucide-react";
export default function Expense() {
  return (
    <Main>
      <SideBar />
      <HeaderExpense
        titulo="Despesas"
        subTitulo="Gerencie seus gastos futuros"
      />
      <Section>
        <Button className="w-full items-center  h-12 dark:hover:bg-[#1F2937]">
          {" "}
          <Plus />
          Criar despesas
        </Button>
      </Section>
    </Main>
  );
}
