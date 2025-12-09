import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { UserProps } from "../types/inedx";
import { signInService } from "../service/signInService";
import { SingInSchemaType } from "../lib/zod/signInSchema";

export function useSignInMutationFn(
  options?: UseMutationOptions<UserProps, Error, SingInSchemaType>
) {
  return useMutation({
    mutationFn: async (data) => await signInService(data),
    ...options,
  });
}
