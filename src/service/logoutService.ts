import { supabase } from "../supabase/supabase";

export async function logoutService() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Erro ao deslogar: ${error.message}`);
  }
}
