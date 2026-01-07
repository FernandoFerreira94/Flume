import { supabaseBrowser } from "@/lib/supabase/client";

import { CategoriesSchemaProps } from "@/lib/zod/categoriesSchema";

export async function UpdtadeCategoryService({
  user_id,
  id,
  name,
  color,
}: CategoriesSchemaProps) {
  const { data: existingCategory, error: fetchError } = await supabaseBrowser
    .from("categories")
    .select("id")
    .eq("user_id", user_id)
    .ilike("name", name)
    .neq("id", id)
    .maybeSingle();

  if (fetchError) {
    throw new Error("Erro ao verificar duplicidade: " + fetchError.message);
  }

  // 2. Se a categoria existir, lançar um erro
  if (existingCategory) {
    throw new Error("Já existe uma categoria com este nome.");
  }

  const { data: category, error } = await supabaseBrowser
    .from("categories")
    .update({
      name,
      color,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(" Error ao atualizar categoria: " + error.message);
  }

  return category;
}
