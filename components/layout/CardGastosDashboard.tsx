import { Card } from "@/components/ui/card";
import { color } from "@/src/styles/color";
import { Calendar, CreditCard, TrendingUp } from "lucide-react";
import { convertValue } from "@/src/actives/convertValue";
import { Skeleton } from "../ui/skeleton";

interface CardGastosProps {
  valorTotal: number;
  fixed: number;
  isntallments: number;
}

export default function CardGastos({
  valorTotal,
  fixed,
  isntallments,
}: CardGastosProps) {
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
        {valorTotal ? (
          <p className={`text-xl font-semibold tracking-wider text-gray-50`}>
            {convertValue(valorTotal)}
          </p>
        ) : (
          <Skeleton className="w-2/3 h-6 bg-[#6B7280]" />
        )}
      </Card>
      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <Calendar
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
        />
        <p className={`text-[12px] ${color.textSecondary}`}>Despesas fixas</p>
        {fixed ? (
          <p
            className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
          >
            {fixed}
          </p>
        ) : (
          <Skeleton className="w-8 h-6" />
        )}
      </Card>

      <Card className={` flex flex-col gap-3 p-4 rounded-md grid-cols-3`}>
        <CreditCard
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md `}
        />
        <p className={`text-[12px] ${color.textSecondary}`}>Parcelas ativas</p>
        {isntallments ? (
          <p
            className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
          >
            {isntallments}
          </p>
        ) : (
          <Skeleton className="w-8 h-6" />
        )}
      </Card>
    </section>
  );
}
