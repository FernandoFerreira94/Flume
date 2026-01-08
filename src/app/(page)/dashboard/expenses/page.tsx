"use client";

import { HeaderExpense } from "@/components/layout/HeaderExpense";
import { Section } from "@/components/layout/Section";
import { Calendar } from "lucide-react";
import FormCreateExpense from "./FormCreaterExpense";
import { useFetchExpense } from "@/src/hook/fetch/useFetchExpense";
import CardExpense from "@/components/layout/CardExpense";
import { useAppContext } from "@/src/context/useAppContext";

export default function Expense() {
  const { user } = useAppContext();
  const { data: expense } = useFetchExpense(user?.id as string);
  console.log(expense);

  function convertValue(valorEmCentavos: number) {
    return (valorEmCentavos / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <>
      <HeaderExpense
        titulo="Despesas"
        subTitulo="Gerencie seus gastos futuros"
        serachQuery={true}
      />
      <Section>
        <FormCreateExpense />

        {expense ? (
          <div className=" w-full mt-8 grid grid-cols-2 gap-4">
            {expense.map((expense) => (
              <CardExpense
                key={expense.id}
                name={expense.name}
                value={convertValue(expense.value)}
                type={expense.type}
                due_date={expense.due_date}
              />
            ))}
          </div>
        ) : (
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
