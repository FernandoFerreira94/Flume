"use client";
import { color } from "@/src/styles/color";

import { InputDate } from "../ui/InputDate";

interface HeaderExpenseProps {
  titulo: string;
  subTitulo?: string;
  serachQuery?: boolean;
}

export function HeaderExpense({
  titulo,
  subTitulo,
  serachQuery,
}: HeaderExpenseProps) {
  return (
    <header
      className={`w-full h-20  pl-50 max-sm:pl-0 ${color.surface} ${color.border} `}
    >
      <section className=" w-full  container mx-auto  h-full flex  items-center  justify-between gap-1 px-20 max-sm:px-2">
        <div className="w-full flex flex-col gap-1 jusctify-center">
          <h1
            className={`text-xl max-sm:text-2xl font-semibold ${color.textPrimary}`}
          >
            {titulo}
          </h1>
          <p className={`text-[12px] max-sm:text-sm ${color.textSecondary}`}>
            {subTitulo}
          </p>
        </div>

        {serachQuery && (
          <div className=" flex   items-end justify-end   max-sm:w-full ">
            <InputDate />
          </div>
        )}
      </section>
    </header>
  );
}
