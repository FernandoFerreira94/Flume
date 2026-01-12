import { supabaseBrowser } from "@/lib/supabase/client";

export async function deleteExpenseService(id: string): Promise<void> {
  const { error } = await supabaseBrowser
    .from("expenses")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error("Erro ao deletar despesa: " + error.message);
  }
}
