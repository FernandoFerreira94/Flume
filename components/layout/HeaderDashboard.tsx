"use client";
import { color } from "@/src/styles/color";
import { InputDate } from "../ui/InputDate";
import dynamic from "next/dynamic";
const FormCreateExpense = dynamic(
  () => import("@/src/app/(page)/dashboard/expenses/FormCreaterExpense"),
  {
    ssr: false,
  }
);
const date = new Date();
const month = date
  .toLocaleDateString("pt-BR", {
    month: "long",
  })
  .replace(/^./, (c) => c.toUpperCase());
const year = date.getFullYear();
export function HeaderDashboard() {
  return (
    <header
      className={`w-full h-18  pl-50 max-sm:pl-0 ${color.surface} ${color.border}`}
    >
      <section className=" w-full  container mx-auto  h-full flex items-center  justify-between px-20 max-sm:px-2">
        <h1
          className={`text-xl font-semibold max-sm:font-bold  ${color.textPrimary}`}
        >
          {month} {year}
        </h1>
        <div className=" flex  gap-4 items-center justify-end   max-sm:gap-2 ">
          <InputDate />
          <div className="max-sm:w-16 max-sm:h-11">
            <FormCreateExpense title={false} />
          </div>
        </div>
      </section>
    </header>
  );
}
