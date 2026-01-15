import { TextAnimate } from "@/components/ui/text-animate";
import { SheetRegister } from "@/src/app/auth/auth.components/Register.Sheet";
export function TextLogin() {
  return (
    <section className="w-1/2 max-sm:w-full flex flex-col pr-20  max-sm:items-center  text-[#343C52] dark:text-[#f6f3ed]  max-sm:px-8 ">
      <div className="flex items-center  gap-4  ">
        <div className="flex items-center gap-4">
          <span className="text-5xl max-sm:text-3xl font-semibold ">
            Antecipe{" "}
          </span>
          <div className="w-5 h-5 mt-5 bg-[#343C52] dark:bg-[#f6f3ed] border rounded-full max-sm:hidden"></div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-5xl max-sm:text-3xl font-semibold  ">
            Organize{" "}
          </span>
          <div className="w-5 h-5 mt-5 bg-[#343C52] dark:bg-[#f6f3ed]  border rounded-full max-sm:hidden"></div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-8">
        <span className="text-5xl max-sm:text-3xl font-semibold  ">
          Controle{" "}
        </span>
      </div>
      <div className="pt-14 max-sm:px-8 max-sm:pt-8">
        <TextAnimate animation="blurIn" as="h1" duration={1}>
          Gerencie suas despesas futuras com inteligência. Planeje seus gastos,
          controle parcelas e nunca seja pego de surpresa.
        </TextAnimate>
      </div>
      <div className="bg-[#1F2937] dark:bg-[#374151] h-10 w-1/2 max-sm:w-full mt-10 rounded-lg text-gray-100 flex items-center justify-center font-light ">
        <SheetRegister titulo="Começar agora" />
      </div>{" "}
    </section>
  );
}
