import { TextAnimate } from "@/components/ui/text-animate";
import { SheetRegister } from "../Header/SheetRegister";
export function TextLogin() {
  return (
    <section className="w-1/2 pr-20 text-[#343C52] dark:text-[#f6f3ed]">
      <div className="flex items-center  gap-4 ">
        <div className="flex items-center gap-4">
          <span className="text-5xl font-semibold ">Antecipe </span>
          <div className="w-5 h-5 mt-5 bg-[#343C52] dark:bg-[#f6f3ed] border rounded-full"></div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-5xl font-semibold  ">Organize </span>
          <div className="w-5 h-5 mt-5 bg-[#343C52] dark:bg-[#f6f3ed]  border rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <span className="text-5xl font-semibold  ">Controle </span>
      </div>
      <div className="pt-14">
        <TextAnimate animation="blurIn" as="h1" duration={1}>
          Gerencie suas despesas futuras com inteligência. Planeje seus gastos,
          controle parcelas e nunca seja pego de surpresa.
        </TextAnimate>
      </div>
      <div className="bg-[#1F2937] dark:bg-[#374151] h-10 w-40 mt-10 rounded-lg text-gray-100 t flex items-center justify-center font-light">
        <SheetRegister titulo="Começar agora" />
      </div>{" "}
    </section>
  );
}
