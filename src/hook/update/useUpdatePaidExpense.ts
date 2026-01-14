import { updatePaidExpenseService } from "@/src/service/update/updadePaidExpense";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { UpdatePaidExpenseProps } from "@/src/service/update/updadePaidExpense";
import { InstallmentProps } from "@/lib/types";

export function useUpdadePaidExpense(
  options?: UseMutationOptions<InstallmentProps, Error, UpdatePaidExpenseProps>
) {
  return useMutation({
    mutationFn: updatePaidExpenseService,
    ...options,
  });
}
