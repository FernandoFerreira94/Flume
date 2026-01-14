import { HeaderExpense } from "@/components/layout/HeaderExpense";
import CardReports from "@/components/layout/CardReposts";
import { Section } from "@/components/layout/Section";
import { GraficoColuna } from "@/components/ui/graficoColuna";

export default function Reports() {
  return (
    <>
      <HeaderExpense titulo="Relatórios" />

      <Section>
        <CardReports />
        <section className=" mt-12 w-2/3 gap-8 ">
          <div className="bg-white border border-gray-200 rounded-md p-4">
            <GraficoColuna />
          </div>
        </section>
      </Section>
    </>
  );
}
