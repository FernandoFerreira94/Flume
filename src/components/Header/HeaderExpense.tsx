import { color } from "@/src/styles/color";

interface HeaderExpenseProps {
  titulo: string;
  subTitulo?: string;
}

export function HeaderExpense({ titulo, subTitulo }: HeaderExpenseProps) {
  return (
    <header
      className={`w-full h-20  pl-50 ${color.surface} ${color.border} border`}
    >
      <section className=" w-full  container mx-auto  h-full flex   flex-col  justify-center gap-1 px-20">
        <h1 className={`text-xl font-semibold ${color.textPrimary}`}>
          {titulo}
        </h1>
        <p className={`text-[12px] ${color.textSecondary}`}>{subTitulo}</p>
      </section>
    </header>
  );
}
