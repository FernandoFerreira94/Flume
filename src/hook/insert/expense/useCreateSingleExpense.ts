import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateSingleExpenseService } from "@/src/service/insert/expense/CreateSingleExpenseService";
import type { ExpenseProps } from "@/lib/types";

export function useCreateSingleExpense(
  options?: UseMutationOptions<ExpenseProps, Error, ExpenseProps>
) {
  return useMutation({
    mutationFn: CreateSingleExpenseService,
    ...options,
  });
}
