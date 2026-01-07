import { useQuery } from "@tanstack/react-query";

import { fetchCategoryService } from "@/src/service/fetch/fetchCategoryService";
import { queryKey } from "../KeyQuery/queryKey";
import type { CategoryProps } from "@/lib/types";

export function useFetchCategories(userId: string) {
  return useQuery<CategoryProps[], Error>({
    queryKey: queryKey.categories(userId),
    queryFn: () => fetchCategoryService(userId),
    refetchOnWindowFocus: false,
  });
}
