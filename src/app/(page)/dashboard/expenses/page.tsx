"use client";

import { HeaderExpense } from "@/components/layout/HeaderExpense";
import { Section } from "@/components/layout/Section";
import { Calendar } from "lucide-react";
import dynamic from "next/dynamic";

const FormCreateExpense = dynamic(() => import("./FormCreaterExpense"), {
  ssr: false,
});

import CardExpense from "@/components/layout/CardExpense";
import { useAppContext } from "@/src/context/useAppContext";
import { Spinner } from "@/components/ui/spinner";
import { useFetchExpenseInstallments } from "@/src/hook/fetch/useFetchExpenseInstallments";
import { isInMonth } from "@/src/actives/isInMonth";

export default function Expense() {
  const { user, month, year } = useAppContext();

  const { data: installments, isPending: isPendingInstallments } =
    useFetchExpenseInstallments(user?.id as string);

  const installmentsOfMonth = installments?.filter((i) =>
    isInMonth(i.due_date, month, year)
  );

  return (
    <>
      <HeaderExpense
        titulo="Despesas"
        subTitulo="Gerencie seus gastos futuros"
        serachQuery={true}
      />
      <Section>
        <FormCreateExpense />

        {isPendingInstallments && (
          <>
            <div className="w-full flex items-center flex-col gap-4 justify-center mt-12">
              <Spinner className="size-10" />
              <p className="text-lg">Carregando...</p>
            </div>
          </>
        )}

        {installmentsOfMonth && (
          <div className=" w-full mt-8 grid grid-cols-2 gap-4">
            {installmentsOfMonth.map((expense) => (
              <CardExpense
                key={expense.id}
                user_id={expense.expense.user_id}
                name={expense.expense.name}
                value={expense.value}
                date={expense.due_date}
                type={expense.expense.expense_type}
                parcelasTotal={expense.expense.installments_count}
                parcelasPagas={expense.installment_number}
                id={expense.expense.id}
              />
            ))}
          </div>
        )}

        {installmentsOfMonth?.length === 0 && (
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
