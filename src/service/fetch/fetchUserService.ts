import { supabaseBrowser } from "../../../lib/supabase/client";

import { UserSchema, UserSchemaProps } from "../../../lib/zod/userSchema";

export async function fetchUserService(
  userId: string
): Promise<UserSchemaProps> {
  const { data, error } = await supabaseBrowser
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(`Usuario nao encontrado: ${error.message}`);
  }

  return UserSchema.parse(data);
}
