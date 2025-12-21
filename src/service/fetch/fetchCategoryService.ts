import { supabaseBrowser } from "@/src/lib/supabase/client";

import type { CategoryProps } from "@/src/lib/types";

export async function fetchCategoryService(userId: string) {
  const { data: categoryData, error: categoryError } = await supabaseBrowser
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (categoryError) {
    throw new Error(`Erro ao buscar categorias: ${categoryError.message}`);
  }

  return categoryData as CategoryProps[];
}
