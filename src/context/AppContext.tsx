"use client";
import { createContext } from "react";
import { Session, User } from "@supabase/supabase-js";
import { SignUpSchemaType } from "../lib/zod/signUpSchema";

interface AppContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);
