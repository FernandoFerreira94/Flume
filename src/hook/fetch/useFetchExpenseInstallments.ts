import { useQuery } from "@tanstack/react-query";

import { fetchExpenseInstallmentsService } from "@/src/service/fetch/fetchExpenseInstallmentsService";
import { queryKey } from "../KeyQuery/queryKey";
import type { InstallmentProps } from "@/lib/types";

export function useFetchExpenseInstallments(userId: string) {
  return useQuery<InstallmentProps[], Error>({
    queryKey: queryKey.installments(userId),
    queryFn: () => fetchExpenseInstallmentsService(userId),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
}
