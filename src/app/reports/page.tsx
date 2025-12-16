"use client";
import { Card } from "@/components/ui/card";
import { HeaderExpense } from "@/src/components/Header/HeaderExpense";
import { Main } from "@/src/components/Main";
import CardReports from "@/src/components/reports/CardReposts";
import { Section } from "@/src/components/Section";
import { SideBar } from "@/src/components/SideBar/sideBar";

export default function Reports() {
  return (
    <Main>
      <SideBar />
      <HeaderExpense titulo="Relatórios" />
      <Section>
        <CardReports />
      </Section>
    </Main>
  );
}
