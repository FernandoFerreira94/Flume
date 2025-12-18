import { Calendar, CreditCard, TrendingUp } from "lucide-react";
import { color } from "@/src/styles/color";
export function SeccionCard() {
  return (
    <div className="w-full flex mt-20 h-full p-8 bg-transparent  justify-around">
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <Calendar size={30} className={`text-[#f6f3ed]`} />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-[#f6f3ed]">
          Planje o futuro
        </h1>
        <p className={`${color.textSecondary} text-sm`}>
          Visualize suas despesas dos próximos meses
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <CreditCard size={30} className={`text-[#f6f3ed]`} />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-[#f6f3ed]">
          Controle parcelas
        </h1>
        <p className={`${color.textSecondary} text-sm`}>
          Acompanhe todas as suas compras parceladas
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <TrendingUp size={30} className={`text-[#f6f3ed] `} />
        </div>

        <h1 className="text-xl font-semibold text-gray-800 dark:text-[#f6f3ed]">
          Análise inteligente
        </h1>
        <p className={`${color.textSecondary} text-sm`}>
          Entenda seus padrões de gastos
        </p>
      </div>
    </div>
  );
}
