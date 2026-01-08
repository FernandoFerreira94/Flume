import type { Session } from "@supabase/supabase-js";

export interface UserProps {
  user?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    birth_date: string;
    created_at: string;
  };
  session?: Session;
  error?: string;
}

export interface CategoryProps {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface ExpenseProps {
  name: string;
  value: number;
  type: "fixed" | "installment" | "single";
  category_id: string;
  installments_count?: number;
  description?: string;
  due_date: string;
  user_id: string;
  id: string;
}
