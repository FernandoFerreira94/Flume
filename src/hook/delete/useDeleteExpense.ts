import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { deleteExpenseService } from "@/src/service/delete/deleteExpenseService";

export function useDeleteExpense(
  option?: UseMutationOptions<void, Error, string>
) {
  return useMutation({
    mutationFn: (id: string) => deleteExpenseService(id),
    ...option,
  });
}
