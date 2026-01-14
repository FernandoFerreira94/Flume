"use client";

import { useState } from "react";
import { useAppContext } from "@/src/context/useAppContext";
import { color } from "@/src/styles/color";
import { Skeleton } from "@/components/ui/skeleton";
import CardGastos from "@/components/layout/CardGastosDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraficoPizza } from "@/components/layout/GraficoPizza";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "@/components/layout/Section";
import { HeaderDashboard } from "@/components/layout/HeaderDashboard";
import { useFetchExpenseInstallments } from "@/src/hook/fetch/useFetchExpenseInstallments";
import { useFetchCategories } from "@/src/hook/fetch/useFetchCategories";
import { isInMonth } from "@/src/actives/isInMonth";
import { convertValue } from "@/src/actives/convertValue";
import { buildCategoryPercentageData } from "@/src/actives/buildCategoryPorcentageData";
import { useFetchExpense } from "@/src/hook/fetch/useFetchExpense";
import { filterFixedExpenses } from "@/src/actives/filterTypeExpene";
import { buildExpenseDays } from "@/src/actives/buildExpenseDays";
import { isSameDay } from "date-fns";
import { parseLocalDate } from "@/src/actives/parseLocalDate";
import { Checkbox } from "@/components/ui/checkbox";
import { useUpdadePaidExpense } from "@/src/hook/update/useUpdatePaidExpense";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";
import { toast } from "sonner";
import { DialogDescription } from "@radix-ui/react-dialog";

export default function Dashboard() {
  const { user, month, year } = useAppContext();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [, setDate] = useState<Date | undefined>(new Date());

  const queryClient = useQueryClient();
  const { data: installments } = useFetchExpenseInstallments(
    user?.id as string
  );

  const { mutate: updadePaid } = useUpdadePaidExpense({
    onSuccess: (Variable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.installments(user?.id as string),
      });
      console.log(Variable);
      if (Variable.paid) {
        toast.success("Pago!");
      } else {
        toast.info("Despesa voltou para pendente!");
      }
    },
  });
  const { data: categories } = useFetchCategories(user?.id as string);

  const { data: expenses } = useFetchExpense(user?.id as string);

  const categoryChartData = buildCategoryPercentageData(
    categories ?? [],
    installments ?? []
  );

  const installmentsOfMonth = installments?.filter((i) =>
    isInMonth(i.due_date, month, year)
  );

  const { fixedExpenses, installmentsExpense } = filterFixedExpenses(
    expenses ?? []
  );

  const totalGastoMEs = installmentsOfMonth?.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const expenseDays = buildExpenseDays(installments ?? []);

  const expensesOfSelectedDay = installments?.filter((item) =>
    selectedDay ? isSameDay(parseLocalDate(item.due_date), selectedDay) : false
  );

  return (
    <>
      <HeaderDashboard />
      <Section>
        <h1
          className={`text-2xl font-semibold flex gap-2 items-center ${color.textPrimary}`}
        >
          Olá,{" "}
          {user ? (
            user.first_name || user.full_name
          ) : (
            <Skeleton className="h-8 w-50 rounded-md" />
          )}
        </h1>
        <div className="flex items-center space-x-4"></div>
        <p className={`text-sm mt-1 ${color.textSecondary}`}>Visão geral</p>

        <CardGastos
          valorTotal={totalGastoMEs ?? 0}
          fixed={fixedExpenses.length}
          isntallments={installmentsExpense.length ?? 0}
        />

        <div className="grid grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className={`font-medium text-md ${color.textPrimary}`}>
                Gastos por categoria
              </CardTitle>
            </CardHeader>

            <CardContent className="flex items-center justify-between w-full  gap-4">
              <CardDescription className="grid grid-cols-2 w-full  items-center jusctify-between gap-8">
                <ul className="gap-1 flex flex-col w-full  ">
                  {categoryChartData ? (
                    categoryChartData.map((item) => (
                      <li
                        key={item.categoryId}
                        className="flex items-center justify-between w-full gap-2"
                      >
                        <div className="flex gap-1 items-center">
                          <div
                            className="w-4 h-3 rounded-[2px] "
                            style={{ backgroundColor: `${item.color}` }}
                          ></div>
                          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                            {item.name}
                          </p>
                        </div>

                        <span className="text-sm font-medium">
                          {item.percentage.toFixed(1)}%
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="w-full flex flex-col gap-1">
                      <Skeleton className="h-7 w-full rounded-md" />
                      <Skeleton className="h-7 w-full rounded-md" />
                      <Skeleton className="h-7 w-full rounded-md" />
                    </li>
                  )}
                </ul>
                {categories && installments ? (
                  <GraficoPizza
                    categorys={categories ?? []}
                    expenses={installments ?? []}
                  />
                ) : (
                  <Skeleton className="h-40 w-40 rounded-full" />
                )}
              </CardDescription>
            </CardContent>

            <CardContent className="flex justify-center mt-8 ">
              <CardDescription className="w-full flex justify-center">
                <ul className=" w-full flex flex-col items-center px-10">
                  {categoryChartData &&
                    categoryChartData.map((category) => (
                      <li
                        className="flex items-center gap-2 w-full "
                        key={category.id}
                      >
                        <div
                          className="w-4 h-3 rounded-[2px] "
                          style={{ backgroundColor: `${category.color}` }}
                        ></div>
                        <div className="flex justify-between w-full">
                          <span>{category.name}</span>
                          <span className="font-semibold">
                            {convertValue(category.total as number)}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Calendar
                onDayClick={(day) => {
                  setSelectedDay(day);
                  setOpenDialog(true);
                }}
                mode="single"
                onSelect={setDate}
                modifiers={{
                  hasExpense: expenseDays,
                }}
                modifiersClassNames={{
                  hasExpense: `relative ${color.surfaceAlt} text-[#f6f3ed]   rounded-md text-foreground font-semibold `,
                }}
                className="rounded-lg w-full"
              />
            </CardContent>
          </Card>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="sm:max-w-[425px] dark:bg-[#1B1D25] font-normal">
            <DialogHeader>
              <DialogTitle>
                Gastos do dia {selectedDay?.toLocaleDateString("pt-BR")}
              </DialogTitle>
              <DialogDescription className="mb-2 text-sm text-gray-600/80 dark:text-gray-400">
                Lista de gastos
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              {expensesOfSelectedDay?.length ? (
                expensesOfSelectedDay.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex justify-between border-b pb-1"
                  >
                    <div className="flex gap-2 items-center">
                      {" "}
                      <Checkbox
                        checked={expense.paid}
                        onCheckedChange={() => {
                          updadePaid({
                            installments_id: expense.id,
                            paid: !expense.paid,
                          });
                        }}
                      />
                      <span
                        className={`text-sm font-medium ${
                          expense.paid && "line-through text-neutral-500"
                        } `}
                      >
                        {expense.expense.name}
                      </span>
                    </div>
                    <span className="flex gap-4 items-center">
                      {" "}
                      {expense.paid && (
                        <>
                          <span className="text-xs font-medium bg-green-500/90 px-1.5 py-0.5 rounded-sm text-neutral-700 ">
                            pago
                          </span>
                        </>
                      )}
                      {convertValue(expense.value)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Nenhuma despesa neste dia
                </p>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Section>
    </>
  );
}
