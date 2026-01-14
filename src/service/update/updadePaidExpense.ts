import { supabaseBrowser } from "@/lib/supabase/client";
import { InstallmentProps } from "@/lib/types";

export interface UpdatePaidExpenseProps {
  installments_id: string;
  paid?: boolean;
  name?: string;
  value?: number;
  expense_id?: string;
}

export async function updatePaidExpenseService({
  installments_id,
  paid,
  name,
  value,
  expense_id,
}: UpdatePaidExpenseProps) {
  const { data, error } = await supabaseBrowser
    .from("installments")
    .update({
      paid,

      value,
    })
    .eq("id", installments_id)
    .select(`* , expense:expenses(*)`)
    .single();

  if (error) {
    throw new Error("Erro ao atualizar despesa paid: " + error.message);
  }

  const { data: expense, error: expenseError } = await supabaseBrowser
    .from("expenses")
    .update({
      name,
    })
    .eq("id", expense_id);

  if (expenseError) {
    throw new Error(
      "Erro ao atualizar nome da despesa: " + expenseError.message
    );
  }

  return data as InstallmentProps;
}
