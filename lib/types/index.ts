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
  expense_type: "fixed" | "installment" | "single";
  category_id: string;
  installments_count?: number;
  description?: string;
  first_due_date?: string;
  user_id: string;
  id?: string;
  total_value?: number;
  active?: boolean;
  installments?: InstallmentProps[];
}

export interface InstallmentExpenseProps extends ExpenseProps {
  expense_type: "installment";
  installments_count: number;
}

export interface InstallmentProps {
  id: string;
  installment_number: number;
  due_date: string;
  value: number;
  paid: boolean;

  paid_at?: string;
  expense: {
    id: string;
    name: string;
    expense_type: string;
    user_id: string;
    first_due_date: string;
    installments_count: number;
  };
}
