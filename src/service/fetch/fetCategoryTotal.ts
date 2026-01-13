import { supabaseBrowser } from "@/lib/supabase/client";

export type CategoryTotalProps = {
  category_id: string;
  user_id: string;
  name: string;
  color: string;
  total: number;
};

export async function fetchCategoryTotal(userId: string) {
  const { data, error } = await supabaseBrowser
    .from("category_totals")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;

  return data as CategoryTotalProps[];
}
