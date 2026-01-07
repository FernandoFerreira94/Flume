import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { DeleteCategoryService } from "@/src/service/delete/deleteCategoryService";

export function useDeleteCategory(
  option?: UseMutationOptions<string, Error, { id: string }>
) {
  return useMutation({
    mutationFn: DeleteCategoryService,
    ...option,
  });
}
