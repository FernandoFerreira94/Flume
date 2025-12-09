import { z } from "zod";

export const SignUpSchema = z.object({
  first_name: z.string().min(3, "Nome muito curto").max(80, "Nome muito longo"),
  last_name: z
    .string()
    .min(3, "Sobrenome muito curto")
    .max(80, "Sobrenome muito longo"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  birth_date: z.string().min(10, "Data de nascimento inválida"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
