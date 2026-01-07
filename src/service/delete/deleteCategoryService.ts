import { supabaseBrowser } from "@/lib/supabase/client";

export async function DeleteCategoryService({ id }: { id: string }) {
  const { data, error } = await supabaseBrowser
    .from("categories")
    .delete()
    .eq("id", id)
    .select() // Retorna o item que foi deletado
    .single();

  if (error) {
    throw new Error("Erro ao deletar categoria: " + error.message);
  }

  return data;
}
