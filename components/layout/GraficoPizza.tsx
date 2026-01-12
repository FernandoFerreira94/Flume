import { PieChart, Pie, Tooltip, Cell } from "recharts";
import type { CategoryProps, InstallmentProps } from "@/lib/types";
import { convertValue } from "@/src/actives/convertValue";
interface GraficoProps {
  categorys: CategoryProps[];
  expenses: InstallmentProps[];
}

export function GraficoPizza({ categorys, expenses }: GraficoProps) {
  
  const chartDataCategory = categorys
    .map((category) => {
      const total = expenses
        .filter((item) => item.expense.category_id === category.id)
        .reduce((sum, item) => sum + item.value, 0);

      return {
        name: category.name,
        value: total / 100,
        color: category.color,
      };
    })
    .filter((item) => item.value > 0);

  return (
    <PieChart width={160} height={160}>
      <Pie
        data={chartDataCategory}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
      >
        {chartDataCategory.map((item, i) => (
          <Cell key={i} fill={item.color} />
        ))}
      </Pie>
      <Tooltip
        itemStyle={{ fill: "transparent", fontSize: 12, fontWeight: 400 }}
        formatter={(value) => convertValue(Math.round(Number(value) * 100))}
      />
    </PieChart>
  );
}
