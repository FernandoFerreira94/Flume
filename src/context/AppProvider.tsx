"use client";
import { ReactNode, useState, useEffect } from "react";
import { AppContext } from "./AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { supabase } from "@/src/supabase/supabase";
import type { Session, User } from "@supabase/supabase-js";
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [laoding, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Recupera sessão ao carregar a aplicação
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // 2️⃣ Escuta mudanças de auth (login / logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    console.log(session);
    console.log(user);
    return () => subscription.unsubscribe();
  }, []);
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        session,
        isAuthenticated: !!user,
        loading: laoding,
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppContext.Provider>
  );
}
