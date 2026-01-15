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
    <section className="grid grid-cols-3 max-sm:grid-cols-1 max-sm:gap-4 w-full gap-8 mt-8 max-sm:mt-8">
      <Card
        className={`${color.backGroundGradient} flex flex-col gap-3 p-4 rounded-md `}
      >
        <TrendingUp
          size={30}
          className={`text-gray-200 bg-[#6B7280] p-1.5 rounded-md max-sm:size-10`}
        />
        <p className={`text-[12px] text-gray-300 max-sm:text-base`}>
          Gastos previsto do mês
        </p>
        {valorTotal !== undefined ? (
          <p className={`text-xl font-semibold tracking-wider text-gray-50 `}>
            {convertValue(valorTotal)}
          </p>
        ) : (
          <Skeleton className="w-2/3 h-6 bg-[#6B7280]" />
        )}
      </Card>
      <Card className={` flex flex-col gap-3 p-4 rounded-md `}>
        <Calendar
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md max-sm:size-10`}
        />
        <p className={`text-[12px] max-sm:text-base ${color.textSecondary}`}>
          Despesas fixas
        </p>
        {fixed !== undefined ? (
          <p
            className={`text-xl font-semibold tracking-wider ${color.textPrimary}`}
          >
            {fixed}
          </p>
        ) : (
          <Skeleton className="w-8 h-6" />
        )}
      </Card>

      <Card className={` flex flex-col gap-3 p-4 rounded-md `}>
        <CreditCard
          size={30}
          className={`text-gray-800 bg-gray-300 p-1.5 rounded-md max-sm:size-10`}
        />
        <p className={`text-[12px] max-sm:text-base ${color.textSecondary}`}>
          Parcelas ativas
        </p>
        {isntallments !== undefined ? (
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
