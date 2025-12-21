import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { UserProps } from "@/src/lib/types";
import { signInService } from "@/src/service/signInService";
import { SingInSchemaType } from "@/src/lib/zod/signInSchema";

export function useSignInMutationFn(
  options?: UseMutationOptions<UserProps, Error, SingInSchemaType>
) {
  return useMutation({
    mutationFn: async (data) => await signInService(data),
    ...options,
  });
}
