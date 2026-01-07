import { createBrowserClient } from "@supabase/ssr";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "As variáveis de ambiente do Supabase não estão configuradas."
  );
}
export const supabaseBrowser = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);
