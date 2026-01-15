import { supabaseBrowser } from "@/lib/supabase/client";

export async function loginWithGoogleService() {
  const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
  });

  if (error) {
    throw error;
  }

  return data;
}
