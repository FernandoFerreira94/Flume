"use client";
import { HeaderExpense } from "@/src/components/layout/HeaderExpense";
import CardReports from "@/src/components/layout/CardReposts";
import { Section } from "@/src/components/layout/Section";

export default function Reports() {
  return (
    <>
      <HeaderExpense titulo="Relatórios" />

      <Section>
        <CardReports />
      </Section>
    </>
  );
}
