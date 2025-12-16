"use client";
import { createContext } from "react";
import { Session } from "@supabase/supabase-js";
import { UserSchemaProps } from "../lib/zod/userSchema";

interface AppContextType {
  isAuthenticated: boolean;
  loading: boolean;
  session: Session | null;
  user: UserSchemaProps;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
