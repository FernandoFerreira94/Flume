"use client";
import { Card } from "@/components/ui/card";
import { color } from "@/src/styles/color";
import { Calendar, ChartPie, TrendingUp } from "lucide-react";
import { useFetchExpenseInstallments } from "@/src/hook/fetch/useFetchExpenseInstallments";
import { useAppContext } from "@/src/context/useAppContext";
import { sumUnpaidInstallments } from "@/src/actives/sumnUnPaidInstallments";
import { convertValue } from "@/src/actives/convertValue";
import { filterFixedExpenses } from "@/src/actives/filterTypeExpene";
import { useFetchExpense } from "@/src/hook/fetch/useFetchExpense";
import { Skeleton } from "../ui/skeleton";

export default function CardReports() {
  const { user } = useAppContext();
  const { data: isntallments } = useFetchExpenseInstallments(
    user?.id as string
  );

  const { data: expenses } = useFetchExpense(user?.id as string);

  const expenseTotal = sumUnpaidInstallments(isntallments ?? []);

  const { installmentsExpense } = filterFixedExpenses(expenses ?? []);

  function dividirTotal(valorTotal: number, count: number) {
    const result = (valorTotal / count).toFixed(2);
    return result;
  }

  const media = dividirTotal(expenseTotal, isntallments?.length ?? 0);

  return (
    <section className="grid grid-cols-3 max-sm:grid-cols-1 max-sm:gap-4 w-full gap-8 mt-8 max-sm:mt-0">
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <TrendingUp
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md max-sm:size-10`}
          />
          <p className={`text-[12px] max-sm:text-base ${color.textSecondary}`}>
            Total de despesas
          </p>
        </div>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          {convertValue(expenseTotal)}
        </p>
      </Card>
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <Calendar
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md max-sm:size-10`}
          />
          <p className={`text-[12px]  max-sm:text-base ${color.textSecondary}`}>
            Médoa por despesa
          </p>
        </div>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          {convertValue(Number(media))}
        </p>
      </Card>

      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <ChartPie
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md max-sm:size-10`}
          />
          <p className={`text-[12px] ${color.textSecondary}`}>
            Parcelas ativas
          </p>
        </div>
        <p className={`text-[12px] max-sm:text-base ${color.textSecondary}`}>
          Parcelas ativas
        </p>
        {installmentsExpense !== undefined ? (
          <p
            className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
          >
            {installmentsExpense.length}
          </p>
        ) : (
          <Skeleton className="w-8 h-6" />
        )}
      </Card>
    </section>
  );
}
