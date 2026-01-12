import { supabaseBrowser } from "@/lib/supabase/client";

import type { InstallmentProps } from "@/lib/types";

export async function fetchExpenseInstallmentsService(userId: string) {
  const { data, error } = await supabaseBrowser
    .from("installments")
    .select(
      `
    *,
    expense:expenses (
      *,
      category:categories (*)
    )
  `
    )
    .eq("expense.user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as InstallmentProps[];
}
