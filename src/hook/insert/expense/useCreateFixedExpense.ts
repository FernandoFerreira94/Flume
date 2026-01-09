import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateFixedExpenseService } from "@/src/service/insert/expense/CreateFixedExpenseService";
import type { ExpenseProps } from "@/lib/types";

export function useCreateFixedExpense(
  options?: UseMutationOptions<ExpenseProps, Error, ExpenseProps>
) {
  return useMutation({
    mutationFn: (data: ExpenseProps) => CreateFixedExpenseService(data),
    ...options,
  });
}
