import { supabaseBrowser } from "../../lib/supabase/client";

import { CategoriesSchemaProps } from "../../lib/zod/categoriesSchema";

export async function createCategoriesService({
  user_id,
  name,
  color,
}: CategoriesSchemaProps) {
  const { data: category, error } = await supabaseBrowser
    .from("categories")
    .insert({
      user_id,
      name,
      color,
    })
    .select()
    .single();

  if (error) {
    throw new Error(" Error ao criar categoria: " + error.message);
  }

  return category;
}
