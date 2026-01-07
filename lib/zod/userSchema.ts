import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email("Email inválido"),
  birth_date: z.string().min(10, "Data de nascimento inválida"),
  created_at: z.string(),
  avatar_url: z.string().optional(),
  full_name: z.string().optional(),
});

export type UserSchemaProps = z.infer<typeof UserSchema>;
