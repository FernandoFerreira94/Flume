"use client";
import { createContext } from "react";
import { Session } from "@supabase/supabase-js";

interface AppContextType {
  isAuthenticated: boolean;
  loading: boolean;
  session: Session | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
