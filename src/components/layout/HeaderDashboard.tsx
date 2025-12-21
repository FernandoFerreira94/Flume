"use client";
import { Input } from "@/src/components/ui/input";
import { color } from "@/src/styles/color";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";

export function HeaderDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <header className={`w-full h-18  pl-50 ${color.surface} ${color.border}`}>
      <section className=" w-full  container mx-auto  h-full flex items-center  justify-between px-20">
        <h1 className={`text-xl font-semibold ${color.textPrimary}`}>
          Dezembro 20025
        </h1>
        <div className="flex gap-4 items-center w-6/12">
          <div className="w-full h-full flex items-end relative mr-auto max-sm:w-full ">
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
          <Button>
            {" "}
            <Plus /> Criar despesas
          </Button>
        </div>
      </section>
    </header>
  );
}
