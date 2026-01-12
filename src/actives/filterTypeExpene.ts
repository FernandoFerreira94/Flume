import { ExpenseProps } from "@/lib/types";

export function filterFixedExpenses(expenses: ExpenseProps[]) {
  const fixedExpenses = expenses.filter(
    (expense) => expense.expense_type === "fixed"
  );
  const installmentsExpense = expenses.filter(
    (expense) => expense.expense_type === "installment"
  );

  return { fixedExpenses, installmentsExpense };
}
