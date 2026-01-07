import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CategoriesSchemaProps } from "@/lib/zod/categoriesSchema";
import { UpdtadeCategoryService } from "@/src/service/update/updateCategoryService";

export function useUpdateCategory(
  options?: UseMutationOptions<
    CategoriesSchemaProps,
    Error,
    CategoriesSchemaProps
  >
) {
  return useMutation({
    mutationFn: UpdtadeCategoryService,
    ...options,
  });
}
