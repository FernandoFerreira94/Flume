import { supabase } from "../supabase/supabase";

import { UserSchema, UserSchemaProps } from "../lib/zod/userSchema";

export async function fetchUserService
(userId: string): Promise<UserSchemaProps> {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Usuario nao encontrado: ${error.message}`);
  }

  return UserSchema.parse(data);
}
