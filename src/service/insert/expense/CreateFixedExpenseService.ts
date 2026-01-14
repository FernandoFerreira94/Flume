import { supabaseBrowser } from "@/lib/supabase/client";
import type { ExpenseProps } from "@/lib/types";
import { addMonthsSafe } from "@/src/actives/addMonthSafe";

const FIXED_MONTHS_AHEAD = 12;

export async function CreateFixedExpenseService(data: ExpenseProps) {
  const { data: expense, error: expenseError } = await supabaseBrowser
    .from("expenses")
    .insert({
      user_id: data.user_id,
      category_id: data.category_id,
      name: data.name,
      description: data.description,
      expense_type: "fixed",
      value: data.value,
      total_value: null, // fixed não tem total fechado
      installments_count: null,
      first_due_date: data.first_due_date,
      active: true,
    })
    .select()
    .single();

  if (expenseError) {
    throw new Error("Erro ao criar despesa Fixed: " + expenseError.message);
  }

  const firstDate = new Date(`${data.first_due_date}T00:00:00`);

  const installments = Array.from(
    { length: FIXED_MONTHS_AHEAD },
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
    throw new Error(
      "Erro ao criar parcelas Fixed: " + installmentsError.message
    );
  }

  return expense;
}
