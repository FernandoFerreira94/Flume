import { PieChart, Pie, Tooltip, Cell } from "recharts";

const data = [
  { name: "Cartao Lourdes", value: 400, color: "#8884d8" },
  { name: "Internet", value: 300, color: "#82ca9d" },
  { name: "Casa", value: 1290, color: "#ffc658" },
  { name: "Estudos", value: 60, color: "#ff7f50" },
  { name: "Consertos", value: 800, color: "#3f3f3f" },
];

export function GraficoPizza() {
  return (
    <PieChart width={200} height={200}>
      <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80}>
        {data.map((_, i) => (
          <Cell key={i} fill={data[i].color} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
