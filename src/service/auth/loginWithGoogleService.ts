import { supabaseBrowser } from "@/lib/supabase/client";

export async function loginWithGoogleService() {
  const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
