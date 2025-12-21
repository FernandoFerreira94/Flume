import { Card } from "@/src/components/ui/card";
import { color } from "@/src/styles/color";
import { Calendar, ChartPie, TrendingUp } from "lucide-react";

export default function CardReports() {
  return (
    <section className="grid grid-cols-3 w-full gap-8 mt-8">
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <TrendingUp
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
          />
          <p className={`text-[12px] ${color.textSecondary}`}>
            Total de despesas
          </p>
        </div>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          R$ 141,00
        </p>
      </Card>
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <Calendar
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
          />
          <p className={`text-[12px] ${color.textSecondary}`}>
            Médoa por despesa
          </p>
        </div>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          R$ 141,00
        </p>
      </Card>

      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <div className="w-full flex items-center gap-4">
          <ChartPie
            size={30}
            className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
          />
          <p className={`text-[12px] ${color.textSecondary}`}>
            Parcelas ativas
          </p>
        </div>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          0
        </p>
      </Card>
    </section>
  );
}
