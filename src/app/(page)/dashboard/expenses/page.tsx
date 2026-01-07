"use client";

import { HeaderExpense } from "@/components/layout/HeaderExpense";
import { Section } from "@/components/layout/Section";
import { Calendar, Trash2, Check } from "lucide-react";
import FormCreateExpense from "./FormCreaterExpense";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Expense() {
  const [checked, setChecked] = useState(false);

  console.log(checked);
  return (
    <>
      <HeaderExpense
        titulo="Despesas"
        subTitulo="Gerencie seus gastos futuros"
        serachQuery={true}
      />
      <Section>
        <FormCreateExpense />

        <div className=" w-full mt-8 grid grid-cols-2 gap-4">
          <section className="w-full border py-4 px-4 bg-white rounded-lg border-gray-400 flex gap-2">
            {" "}
            <Checkbox
              checked={checked}
              onCheckedChange={(value) => {
                setChecked(value === true);
              }}
            />
            <div className="w-full flex flex-col gap-2">
              <div className="flex w-full justify-between items-center">
                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm font-medium ${
                      checked && "line-through text-neutral-500"
                    } `}
                  >
                    Netflix
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {checked && (
                    <>
                      <span className="text-xs font-medium bg-green-500/90 px-1.5 py-0.5 rounded-sm text-neutral-700">
                        pago
                      </span>
                    </>
                  )}
                  <p className="font-semibold text-sm">R$ 1.223,00</p>
                </div>
              </div>
              <div className="flex w-full items-center gap-8 ">
                <p className="text-xs text-neutral-600">01/01/2026</p>
                <p className="text-xs text-gray-600/80 font-medium bg-gray-200/60 px-2 py-1 rounded-sm">
                  fixa
                </p>
              </div>
            </div>
            <Trash2
              size={16}
              className="text-gray-400 transition duration-300 hover:text-red-600 cursor-pointer"
            />
          </section>
        </div>

        <div className="pt-20 flex flex-col justify-center items-center gap-4 ">
          <Calendar size={40} className="text-neutral-400/70 " />
          <p className="text-sm text-neutral-400/80">
            Nenhuma despesa cadastrada
          </p>
        </div>
      </Section>
    </>
  );
}
