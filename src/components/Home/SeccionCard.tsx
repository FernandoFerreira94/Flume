import { FaRegCalendarCheck } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
import { color } from "@/src/styles/color";
export function SeccionCard() {
  return (
    <div className="w-full flex mt-20 h-full p-8 bg-transparent  justify-around">
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <FaRegCalendarCheck
            size={30}
            className={`${color.light.textOnPrimary}`}
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">Planje o futuro</h1>
        <p className={`${color.light.textSecondary} text-sm`}>
          Visualize suas despesas dos próximos meses
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <CiCreditCard1 size={30} className={`${color.light.textOnPrimary}`} />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">
          Controle parcelas
        </h1>
        <p className={`${color.light.textSecondary} text-sm`}>
          Acompanhe todas as suas compras parceladas
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div
          className={` ${color.backGroundGradient} flex items-center justify-center rounded-xl p-4 w-16 shadow-lg transition hover:scale-110 duration-400 ease-in-out`}
        >
          <BsGraphUpArrow
            size={30}
            className={`${color.light.textOnPrimary} `}
          />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">
          Análise inteligente
        </h1>
        <p className={`${color.light.textSecondary} text-sm`}>
          Entenda seus padrões de gastos
        </p>
      </div>
    </div>
  );
}
