import { CategoryProps, InstallmentProps } from "@/lib/types";
import { isInMonth } from "./isInMonth";

function getNextMonths(month: number, year: number, count = 6) {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(year, month - 1 + i, 1);
    return {
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      label: date.toLocaleString("pt-BR", { month: "short" }),
    };
  });
}

export function buildChartData(
  installments: InstallmentProps[],
  categories: CategoryProps[],
  month: number,
  year: number
) {
  const months = getNextMonths(month, year, 6);

  return months.map(({ month, year, label }) => {
    const row: Record<string, number | string> = { month: label };

    categories.forEach((cat) => {
      row[cat.name] = 0;
    });

    installments.forEach((inst) => {
      if (isInMonth(inst.due_date, month, year) && inst.expense?.category_id) {
        const category = categories.find(
          (c) => c.id === inst.expense.category_id
        );

        if (category) {
          row[category.name] = (row[category.name] as number) + inst.value;
        }
      }
    });

    return row;
  });
}
