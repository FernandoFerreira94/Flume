import { useQuery } from "@tanstack/react-query";

import { fetchCategoryService } from "@/src/service/fetch/fetchCategoryService";
import { queryKey } from "../KeyQuery/queryKey";
import type { CategoryProps } from "@/src/lib/types";
import { CategoriesSchemaProps } from "@/src/lib/zod/categoriesSchema";

export function useFetchCategories(userId: string) {
  return useQuery<CategoryProps[], Error, CategoriesSchemaProps[]>({
    queryKey: queryKey.categories(userId),
    queryFn: () => fetchCategoryService(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}
