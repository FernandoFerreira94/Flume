"use client";
import { Button } from "@/src/components/ui/button";
import { HeaderExpense } from "@/src/components/layout/HeaderExpense";
import { Section } from "@/src/components/layout/Section";
import { Plus } from "lucide-react";
export default function Expense() {
  return (
    <>
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
    </>
  );
}
