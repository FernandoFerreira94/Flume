// service/signInService.ts

import { supabaseBrowser } from "@/lib/supabase/client";
import { SingInSchemaType } from "@/lib/zod/signInSchema";

export async function signInService({ email, password }: SingInSchemaType) {
  try {
    const { data: authData, error: authError } =
      await supabaseBrowser.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      throw new Error(`Email ou senha incorretos`);
    }

    const userId = authData.user?.id;
    const session = authData.session;

    if (!userId || !session) {
      throw new Error("Erro ao logar: Usuário ou sessão não encontrados.");
    }

    const { data: userData, error: userDataError } = await supabaseBrowser
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (userDataError) {
      throw new Error(
        `Erro ao buscar dados do usuário: ${userDataError.message}`
      );
    }

    return { user: userData, session };
  } catch (error) {
    throw error;
  }
}
