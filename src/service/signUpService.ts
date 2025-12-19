import { supabaseBrowser } from "../lib/supabase/client";

import { SignUpSchemaType } from "../lib/zod/signUpSchema";

export async function signUpService({
  email,
  password,
  first_name,
  last_name,
  birth_date,
}: SignUpSchemaType) {
  const { data, error } = await supabaseBrowser.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name,
        last_name,
        birth_date,
        full_name: `${first_name} ${last_name}`,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
