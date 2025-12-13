import { z } from "zod";
import { CapitalizedString } from "@/src/actives/upCaseName";

export const SignUpSchema = z.object({
  first_name: z
    .string()
    .min(3, "Nome curto")
    .max(80, "Nome longo")
    .pipe(CapitalizedString),
  last_name: z
    .string()
    .min(3, "Sobrenome curto")
    .max(80, "Sobrenome longo")
    .pipe(CapitalizedString),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  birth_date: z.string().min(10, "Data de nascimento inválida"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
