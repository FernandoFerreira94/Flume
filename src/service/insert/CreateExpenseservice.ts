import { supabaseBrowser } from "@/lib/supabase/client";

export interface ExpenseProps {
  name: string;
  value: number;
  type: "fixed" | "installment" | "single";
  category_id: string;
  installments_count?: number;
  description?: string;
  due_date: string;
  user_id: string;
}

export async function CreateExpenseService(data: ExpenseProps) {
  const { data: expense, error } = await supabaseBrowser
    .from("expenses")
    .insert(data)
    .select()
    .single();

  if (error) {
    throw new Error("Erro ao criar despesa: " + error.message);
  }

  return expense;
}
