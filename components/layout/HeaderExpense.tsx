"use client";
import { color } from "@/src/styles/color";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header
      className={`w-full h-20  pl-50 ${color.surface} ${color.border} border`}
    >
      <section className=" w-full  container mx-auto  h-full flex  items-center  justify-between gap-1 px-20">
        <div className="w-full flex flex-col gap-1 jusctify-center">
          <h1 className={`text-xl font-semibold ${color.textPrimary}`}>
            {titulo}
          </h1>
          <p className={`text-[12px] ${color.textSecondary}`}>{subTitulo}</p>
        </div>

        {serachQuery && (
          <div className=" flex w-2/3 items-center justify-center gap-4 relative mr-auto max-sm:w-full ">
            <div className="w-full">
              <Input
                placeholder="Pesquisar..."
                className={`w-full pl-10 pr-4  rounded-md border border-gray-300/60 ${color.background} ${color.background} `}
                type="search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-500 max-sm:top-3"
              />
            </div>
            <InputDate />
          </div>
        )}
      </section>
    </header>
  );
}
