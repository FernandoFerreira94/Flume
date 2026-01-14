"use client";
import { color } from "@/src/styles/color";
import { Button } from "@/components/ui/button";
import { InputDate } from "../ui/InputDate";
import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
const FormCreateExpense = dynamic(
  () => import("@/src/app/(page)/dashboard/expenses/FormCreaterExpense"),
  {
    ssr: false,
  }
);
export function HeaderDashboard() {
  return (
    <header className={`w-full h-18  pl-50 ${color.surface} ${color.border}`}>
      <section className=" w-full  container mx-auto  h-full flex items-center  justify-between px-20">
        <h1 className={`text-xl font-semibold ${color.textPrimary}`}>
          Dezembro 20025
        </h1>
        <div className=" flex  gap-4 items-center justify-end   max-sm:w-full ">
          <InputDate />
          <div className="">
            <FormCreateExpense />
          </div>
        </div>
      </section>
    </header>
  );
}
