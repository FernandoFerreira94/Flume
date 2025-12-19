"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { UserSchemaProps } from "../lib/zod/userSchema";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserSchemaProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabaseBrowser.auth.getSession();
      setSession(sessionData.session);

      if (sessionData.session?.user) {
        const { data } = await supabaseBrowser
          .from("profiles")
          .select("*")
          .eq("id", sessionData.session.user.id)
          .single();

        setProfile(data);
      }

      setLoading(false);
    };

    init();

    const { data: listener } = supabaseBrowser.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session?.user) {
          const { data } = await supabaseBrowser
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          setProfile(data);
        } else {
          setProfile(null);
        }
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AppContext.Provider
      value={{
        session,
        isAuthenticated: !!session,
        loading,
        user: profile, // 🔥 agora é SEMPRE igual
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
}
