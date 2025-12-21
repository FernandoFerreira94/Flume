import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { CategoriesSchemaProps } from "@/src/lib/zod/categoriesSchema";
import { createCategoriesService } from "@/src/service/insert/createCategoriesService";

export function useCreateCategories(
  options?: UseMutationOptions<
    CategoriesSchemaProps,
    Error,
    CategoriesSchemaProps
  >
) {
  return useMutation({
    mutationFn: createCategoriesService,
    ...options,
  });
}
