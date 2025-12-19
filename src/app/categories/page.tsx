"use client";
import { Button } from "@/components/ui/button";
import { HeaderExpense } from "@/src/components/Header/HeaderExpense";
import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { SideBar } from "@/src/components/SideBar/sideBar";
import { color } from "@/src/styles/color";
import { Plus } from "lucide-react";
import { FolderKanban } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const coresInput = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#84cc16",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#3b82f6",
  "#6366f1",
  "#8b5cf6",
  "#a855f7",
  "#d946ef",
  "#ec4899",
  "#f43f5e", // cinza médio
];

export default function Expense() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [nameCategories, setNameCategories] = useState<string>("");

  function handleColorClick(e: React.FormEvent) {
    e.preventDefault();
    console.log("Cor:", selectedColor);
    console.log("Categoria:", nameCategories);

    if (!nameCategories || !selectedColor) {
      return;
    }

    setNameCategories("");
    setSelectedColor(null);
    setOpenDialog(false);
  }

  return (
    <Main>
      <SideBar />
      <HeaderExpense titulo="Categorias" subTitulo="Organize suas despesas" />
      <Section>
        <Button
          className="w-full items-center  h-12 dark:hover:bg-[#1F2937]"
          onClick={() => setOpenDialog(true)}
        >
          {" "}
          <Plus />
          Nova categoria
        </Button>
        <div className="w-full flex justify-center mt-14 flex-col items-center gap-4">
          <FolderKanban size={50} className={`${color.textMuted}`} />
          <p className={`text-sm ${color.textMuted}`}>
            Nenhuma categoria cadastrada
          </p>
        </div>
      </Section>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <form onSubmit={handleColorClick} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Nova categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria de despesa
              </DialogDescription>
            </DialogHeader>

            <div>
              <Label htmlFor="nameCategories">Nome</Label>
              <Input
                id="nameCategories"
                className="mt-2"
                value={nameCategories}
                onChange={(e) => setNameCategories(e.target.value)}
                placeholder="Ex: Alimentação"
              />
            </div>

            <div>
              <Label>Cor</Label>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {coresInput.map((color) => {
                  const isSelected = selectedColor === color;

                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-10 h-10 rounded-md transition-all border",
                        "hover:scale-110",
                        isSelected
                          ? "border-white border-2 shadow-[0_0_0_2px_rgba(255,255,255,0.6)]"
                          : "border-gray-500"
                      )}
                      style={{ backgroundColor: color }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpenDialog(false)}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={!nameCategories || !selectedColor}
              >
                Criar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Main>
  );
}
