import { Card } from "@/src/components/ui/card";
import { color } from "@/src/styles/color";
import { Calendar, CreditCard, TrendingUp } from "lucide-react";

export default function CardGastos() {
  return (
    <section className="grid grid-cols-3 w-full gap-8 mt-8">
      <Card
        className={`${color.backGroundGradient} flex flex-col gap-3 p-4 rounded-md grid-cols-3`}
      >
        <TrendingUp
          size={30}
          className={`text-gray-200 bg-[#6B7280] p-1.5 rounded-md `}
        />
        <p className={`text-[12px] text-gray-300`}>Gastos previsto do mês</p>
        <p className={`text-xl font-semibold tracking-wider text-gray-50`}>
          R$ 0,00
        </p>
      </Card>
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <Calendar
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
        />
        <p className={`text-[12px] ${color.textSecondary}`}>Despesas fixas</p>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          1
        </p>
      </Card>

      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <CreditCard
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
        />
        <p className={`text-[12px] ${color.textSecondary}`}>Parcelas ativas</p>
        <p
          className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
        >
          0
        </p>
      </Card>
    </section>
  );
}
