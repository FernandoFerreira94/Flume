import { FaRegCalendarCheck } from "react-icons/fa";
import { CiCreditCard1 } from "react-icons/ci";
import { BsGraphUpArrow } from "react-icons/bs";
export function SeccionCard() {
  return (
    <div className="w-full flex mt-20 h-full p-8 bg-transparent  justify-around">
      <div className="flex flex-col items-center gap-4">
        <div className=" bg-[#3E4864] flex items-center justify-center rounded-xl p-4 w-16 shadow-lg">
          <FaRegCalendarCheck size={30} color="#F6F3ED" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">Planje o futuro</h1>
        <p className="text-gray-800/50 text-md">
          Visualize suas despesas dos próximos meses
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className=" bg-[#3E4864] flex items-center justify-center rounded-xl p-4 w-16 shadow-lg">
          <CiCreditCard1 size={30} color="#F6F3ED" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">
          Controle parcelas
        </h1>
        <p className="text-gray-800/50 text-md">
          Acompanhe todas as suas compras parceladas
        </p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className=" bg-[#3E4864] flex items-center justify-center rounded-xl p-4 w-16 shadow-lg">
          <BsGraphUpArrow size={30} color="#F6F3ED" />
        </div>

        <h1 className="text-xl font-semibold text-gray-800">
          Análise inteligente
        </h1>
        <p className="text-gray-800/50 text-md">
          Entenda seus padrões de gastos
        </p>
      </div>
    </div>
  );
}
