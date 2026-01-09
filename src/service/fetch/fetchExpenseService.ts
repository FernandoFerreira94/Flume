import { supabaseBrowser } from "@/lib/supabase/client";

import type { ExpenseProps } from "@/lib/types";

export async function fetchExpenseService(user_id: string) {
  const { data: expense, error } = await supabaseBrowser
    .from("expenses")
    .select(` *`)
    .eq("user_id", user_id);

  if (error) {
    throw new Error("Erro ao buscar despesas: " + error.message);
  }

  return expense as ExpenseProps[];
}
