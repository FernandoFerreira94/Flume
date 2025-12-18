"use client";
import { ReactNode, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/src/supabase/supabase";
import type { Session } from "@supabase/supabase-js";
import { UserSchemaProps } from "../lib/zod/userSchema";
import { useGetUser } from "../hook/RectQuery/useGetUser";
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const user = useGetUser(session?.user.id as string).data as UserSchemaProps;

  return (
    <AppContext.Provider
      value={{
        session,
        setSession,
        isAuthenticated: !!session,
        loading,
        user,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
}
