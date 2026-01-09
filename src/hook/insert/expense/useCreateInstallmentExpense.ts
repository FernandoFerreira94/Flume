import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CreateInstallmentExpenseService } from "@/src/service/insert/expense/CreateInstallmentExpenseService";
import type { InstallmentExpenseProps } from "@/lib/types";

export function useCreateInstallmentExpense(
  options?: UseMutationOptions<
    InstallmentExpenseProps,
    Error,
    InstallmentExpenseProps
  >
) {
  return useMutation({
    mutationFn: (data: InstallmentExpenseProps) =>
      CreateInstallmentExpenseService(data),
    ...options,
  });
}
