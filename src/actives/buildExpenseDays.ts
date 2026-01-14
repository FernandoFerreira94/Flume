import { parseLocalDate } from "./parseLocalDate";

export function buildExpenseDays(installments: { due_date: string }[]) {
  return installments.map((i) => parseLocalDate(i.due_date));
}
