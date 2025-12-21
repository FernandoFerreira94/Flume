import { SignUpSchemaType } from "@/src/lib/zod/signUpSchema";
import { signUpService } from "@/src/service/auth/signUpService";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useSignUp(
  // Definimos 'void' como o primeiro parâmetro do Generic
  options?: UseMutationOptions<void, Error, SignUpSchemaType>
) {
  return useMutation({
    mutationFn: async (data: SignUpSchemaType) => {
      await signUpService(data);
    },
    ...options,
  });
}
