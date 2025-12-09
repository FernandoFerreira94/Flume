import { supabase } from "../supabase/supabase";

import { SignUpSchemaType } from "../lib/zod/signUpSchema";

export async function signUpService({
  email,
  password,
  first_name,
  last_name,
  birth_date,
}: SignUpSchemaType) {
  try {
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingUserError) {
      throw new Error(
        `Erro ao verificar usuário existente: ${existingUserError.message}`
      );
    }

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw new Error(`Erro ao registrar: ${authError.message}`);
    }

    const user_id = authData.user?.id;

    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        first_name,
        birth_date,
        last_name,
        email,
        id: user_id,
      })
      .select()
      .single();

    if (userError) {
      throw new Error(`Erro ao salvar usuário: ${userError.message}`);
    }

    return userData;
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
}
