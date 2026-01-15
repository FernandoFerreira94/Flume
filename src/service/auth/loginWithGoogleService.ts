import { supabaseBrowser } from "@/lib/supabase/client";

export async function loginWithGoogleService() {
  const { data, error } = await supabaseBrowser.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/dashboard",
      // `https://flume-sigma.vercel.app/dashboard`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
