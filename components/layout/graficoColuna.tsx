"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useFetchExpenseInstallments } from "@/src/hook/fetch/useFetchExpenseInstallments";
import { useAppContext } from "@/src/context/useAppContext";
import { useFetchCategories } from "@/src/hook/fetch/useFetchCategories";
import { useMemo } from "react";
import { buildChartData } from "@/src/actives/getNextMonth";

export function GraficoColuna() {
  const { month, year, user } = useAppContext();

  const { data: installments } = useFetchExpenseInstallments(
    user?.id as string
  );

  const { data: categories } = useFetchCategories(user?.id as string);

  const chartData = useMemo(() => {
    if (!installments || !categories) return [];
    return buildChartData(installments, categories, month, year);
  }, [installments, categories, month, year]);

  const dynamicChartConfig = useMemo(() => {
    if (!categories) return {};

    return Object.fromEntries(
      categories.map((cat) => [
        cat.name,
        {
          label: cat.name,
          color: cat.color ?? "#8884d8",
        },
      ])
    );
  }, [categories]);

  return (
    <ChartContainer config={dynamicChartConfig} className="p-2 w-full ">
      <BarChart data={chartData} barCategoryGap={32} barGap={6}>
        <CartesianGrid vertical={false} />

        <XAxis dataKey="month" />

        <YAxis
          className=""
          tickLine={false}
          axisLine={true}
          tickFormatter={(value) =>
            (value / 100).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
              maximumFractionDigits: 2,
            })
          }
        />

        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />

        {categories &&
          categories.map((cat) => (
            <Bar
              key={cat.id}
              dataKey={cat.name}
              barSize={18}
              fill={cat.color}
              radius={4}
            />
          ))}
      </BarChart>
    </ChartContainer>
  );
}
