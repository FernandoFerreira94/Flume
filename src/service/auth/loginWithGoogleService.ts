import { supabaseBrowser } from "@/lib/supabase/client";

export async function loginWithGoogleService() {
  const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `https://flume-sigma.vercel.app`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
