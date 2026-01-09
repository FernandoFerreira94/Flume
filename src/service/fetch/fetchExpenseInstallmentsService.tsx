import { supabaseBrowser } from "@/lib/supabase/client";

import type { InstallmentProps } from "@/lib/types";

export async function fetchExpenseInstallmentsService(userId: string) {
  const { data, error } = await supabaseBrowser
    .from("installments")
    .select(
      `
     *,
      expense:expenses (
        id,
        name,
        expense_type,
        user_id,
        first_due_date,
        installments_count
      )
    `
    )
    .eq("expense.user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as InstallmentProps[];
}
