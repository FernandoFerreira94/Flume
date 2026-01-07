import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateExpenseService } from "@/src/service/insert/CreateExpenseservice";
import type { ExpenseProps } from "@/src/service/insert/CreateExpenseservice";

export function useCreateExpense(
  options?: UseMutationOptions<ExpenseProps, Error, ExpenseProps>
) {
  return useMutation({
    mutationFn: CreateExpenseService,
    ...options,
  });
}
