import { useQuery } from "@tanstack/react-query";

import { queryKey } from "../KeyQuery/queryKey";
import type { CategoryProps } from "@/lib/types";
import {
  CategoryTotalProps,
  fetchCategoryTotal,
} from "@/src/service/fetch/fetCategoryTotal";

export function useFetchCategoryTotal(userId: string) {
  return useQuery<CategoryTotalProps[], Error>({
    queryKey: ["category-totals", userId],
    queryFn: () => fetchCategoryTotal(userId),
    enabled: !!userId,
  });
}
