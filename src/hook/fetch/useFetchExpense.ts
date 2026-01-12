import { useQuery } from "@tanstack/react-query";

import { queryKey } from "../KeyQuery/queryKey";
import type { ExpenseProps } from "@/lib/types";
import { fetchExpenseService } from "@/src/service/fetch/fetchExpenseService";

export function useFetchExpense(userId: string) {
  return useQuery<ExpenseProps[], Error>({
    queryKey: queryKey.expense(userId),
    queryFn: () => fetchExpenseService(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}
