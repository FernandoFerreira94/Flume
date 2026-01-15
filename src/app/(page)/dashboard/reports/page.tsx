import { HeaderExpense } from "@/components/layout/HeaderExpense";
import CardReports from "@/components/layout/CardReposts";
import { Section } from "@/components/layout/Section";
import { GraficoColuna } from "@/components/layout/graficoColuna";

export default function Reports() {
  return (
    <>
      <HeaderExpense titulo="Relatórios" subTitulo="Relatório das despesas" />

      <Section>
        <CardReports />
        <section className=" mt-12 w-2/3 gap-8  max-sm:w-full">
          <div className="bg-white border border-gray-200 rounded-md p-4 max-sm:p-0">
            <GraficoColuna />
          </div>
        </section>
      </Section>
    </>
  );
}
