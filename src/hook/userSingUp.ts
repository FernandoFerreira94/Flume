import { SignUpSchemaType } from "../lib/zod/signUpSchema";
import { signUpService } from "../service/signUpService";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

async function signUpMutationFn(data: SignUpSchemaType) {
  const response = await signUpService(data);

  if (response?.error) {
    throw new Error(response.error);
  }

  return response;
}

export function useSignUp(
  options?: UseMutationOptions<SignUpSchemaType, Error, SignUpSchemaType>
) {
  return useMutation({
    mutationFn: async (data) => await signUpMutationFn(data),
    ...options,
  });
}
