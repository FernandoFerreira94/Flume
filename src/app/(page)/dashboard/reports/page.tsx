"use client";
import { HeaderExpense } from "@/components/layout/HeaderExpense";
import CardReports from "@/components/layout/CardReposts";
import { Section } from "@/components/layout/Section";

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
