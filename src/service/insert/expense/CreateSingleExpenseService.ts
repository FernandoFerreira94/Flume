import { supabaseBrowser } from "@/lib/supabase/client";

import type { ExpenseProps } from "@/lib/types";

export async function CreateSingleExpenseService(data: ExpenseProps) {
  const { data: expense, error: expenseError } = await supabaseBrowser
    .from("expenses")
    .insert({
      ...data,
      expense_type: "single",
      installments_count: 1,
      total_value: data.value,
    })
    .select()
    .single();

  if (expenseError) {
    throw new Error("Erro ao criar despesa Single: " + expenseError.message);
  }

  const { error: installmentsError } = await supabaseBrowser
    .from("installments")
    .insert({
      expense_id: expense.id,
      installment_number: 1,
      due_date: data.first_due_date,
      value: data.value,
      paid: false,
    });

  if (installmentsError) {
    throw new Error(
      "Erro ao criar parcelas Single: " + installmentsError.message
    );
  }

  return expense;
}
