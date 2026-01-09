"use client";

import { HeaderExpense } from "@/components/layout/HeaderExpense";
import { Section } from "@/components/layout/Section";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const FormCreateExpense = dynamic(() => import("./FormCreaterExpense"), {
  ssr: false,
});

import { useFetchExpense } from "@/src/hook/fetch/useFetchExpense";
import CardExpense from "@/components/layout/CardExpense";
import { useAppContext } from "@/src/context/useAppContext";
import { Spinner } from "@/components/ui/spinner";

export default function Expense() {
  const { user } = useAppContext();
  const { data: expense, isPending } = useFetchExpense(user?.id as string);
  

  return (
    <>
      <HeaderExpense
        titulo="Despesas"
        subTitulo="Gerencie seus gastos futuros"
        serachQuery={true}
      />
      <Section>
        <FormCreateExpense />

        {isPending && (
          <>
            <div className="w-full flex items-center flex-col gap-4 justify-center mt-12">
              <Spinner className="size-10" />
              <p className="text-lg">Carregando...</p>
            </div>
          </>
        )}

        {expense && (
          <div className=" w-full mt-8 grid grid-cols-2 gap-4">
            {expense.map((expense) => (
              <CardExpense data={expense} key={expense.id} />
            ))}
          </div>
        )}

        {expense?.length === 0 && (
          <div className="pt-20 flex flex-col justify-center items-center gap-4 ">
            <Calendar size={40} className="text-neutral-400/70 " />
            <p className="text-sm text-neutral-400/80">
              Nenhuma despesa cadastrada
            </p>
          </div>
        )}
      </Section>
    </>
  );
}
