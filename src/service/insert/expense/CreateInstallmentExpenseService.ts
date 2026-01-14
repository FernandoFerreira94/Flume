import { supabaseBrowser } from "@/lib/supabase/client";

import type { InstallmentExpenseProps } from "@/lib/types";
import { addMonthsSafe } from "@/src/actives/addMonthSafe";

export async function CreateInstallmentExpenseService(
  data: InstallmentExpenseProps
) {
  const { data: expense, error: expenseError } = await supabaseBrowser
    .from("expenses")
    .insert({
      user_id: data.user_id,
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      expense_type: "installment",
      value: data.value,
      installments_count: data.installments_count,
      total_value: data.value * data.installments_count,
      first_due_date: data.first_due_date,
      active: true,
    })
    .select()
    .single();

  if (expenseError) {
    throw new Error(
      "Erro ao criar despesa Installment: " + expenseError.message
    );
  }

  const firstDate = new Date(`${data.first_due_date}T00:00:00`);

  const installments = Array.from(
    { length: data.installments_count },
    (_, index) => {
      const dueDate = addMonthsSafe(firstDate, index);

      return {
        expense_id: expense.id,
        installment_number: index + 1,
        due_date: dueDate.toISOString().slice(0, 10),
        value: data.value,
        paid: false,
        user_id: data.user_id,
      };
    }
  );

  const { error: installmentsError } = await supabaseBrowser
    .from("installments")
    .insert(installments);

  if (installmentsError) {
    throw new Error("Erro ao criar parcelas: " + installmentsError.message);
  }

  return expense;
}
