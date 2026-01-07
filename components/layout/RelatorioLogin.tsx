import { Card, CardContent } from "@/components/ui/card";
import { color } from "@/src/styles/color";
export function RelatorioLogin() {
  return (
    <>
      <Card className="relative  w-2/5 h-100 ">
        <CardContent className="gap-4 flex flex-col ">
          <div
            className={`w-full  h-22 rounded-2xl shadow-md px-8 text-gray-100/80 flex flex-col justify-center gap-1 ${color.backGroundGradient}`}
          >
            <p className="text-md">Gastos previsto do mês</p>
            <p className="text-3xl font-bold text-gray-100">R$ 2.450,00</p>
          </div>
          <div className="w-full bg-[#F6F3ED] dark:bg-[#222222] dark:text-[#f6f3ed] h-18 shadow-md rounded-2xl px-8  flex items-center justify-between gap-2 text-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-orange-500 "></div>
              <p className="text-lg font-semibold font-sans">Netflix</p>
            </div>
            <p className="text-lg font-bold text-gray-800 font-sans dark:text-[#f6f3ed]">
              R$ 55,90
            </p>
          </div>
          <div className="w-full bg-[#F6F3ED] dark:bg-[#222222] dark:text-[#f6f3ed] h-18 shadow-md rounded-2xl px-8  flex items-center justify-between gap-2 text-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-blue-400 "></div>
              <p className="text-lg font-semibold font-sans ">
                Cartão de Crédito
              </p>
            </div>
            <p className="text-lg font-bold text-gray-800 font-sans dark:text-[#f6f3ed]">
              R$ 1.200,00
            </p>
          </div>
          <div className="w-full bg-[#F6F3ED] dark:bg-[#222222] dark:text-[#f6f3ed] h-18 shadow-md rounded-2xl px-8  flex items-center justify-between gap-2 text-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500 "></div>
              <p className="text-lg font-semibold font-sans">Internet</p>
            </div>
            <p className="text-lg font-bold text-gray-800 font-sans dark:text-[#f6f3ed]">
              R$ 99,90
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
