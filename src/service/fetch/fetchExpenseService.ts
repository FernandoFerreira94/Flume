import { supabaseBrowser } from "@/lib/supabase/client";

import type { ExpenseProps } from "@/lib/types";

export async function fetchExpenseService(userId: string) {
  const { data, error } = await supabaseBrowser
    .from("expenses")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data as ExpenseProps[];
}
