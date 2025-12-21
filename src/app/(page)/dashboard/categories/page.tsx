"use client";
import { Button } from "@/src/components/ui/button";
import { color } from "@/src/styles/color";
import { Plus } from "lucide-react";
import { FolderKanban, SquarePen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useState } from "react";
import { useCreateCategories } from "@/src/hook/insert/useCreateCategories";
import { useAppContext } from "@/src/context/useAppContext";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { cn } from "@/src/lib/utils";
import { Spinner } from "@/src/components/ui/spinner";
import { Section } from "@/src/components/layout/Section";
import { HeaderExpense } from "@/src/components/layout/HeaderExpense";
import { useFetchCategories } from "@/src/hook/fetch/useFetchCategories";
import { Card, CardHeader } from "@/src/components/ui/card";
import { CategoryProps } from "@/src/lib/types";

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

export default function Categories() {
  const { user } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("#cccccc");
  const [nameCategories, setNameCategories] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<CategoryProps | null>(
    null
  );
  // Insert Categories
  const { mutate, isPending } = useCreateCategories({
    onSuccess: () => {
      setOpenDialog(false);
      setNameCategories("");
      setSelectedColor("#cccccc");
    },
  });

  function handleColorClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Cor:", selectedColor);
    console.log("Categoria:", nameCategories);

    if (user) {
      mutate({
        name: nameCategories,
        color: selectedColor,
        user_id: user.id,
      });
    }
  }

  // Fetch Categories
  const { data: categories, isLoading } = useFetchCategories(
    user?.id as string
  );

  const handleOpenEdit = (category: CategoryProps) => {
    setEditingCategory(category);
    setNameCategories(category.name);
    setSelectedColor(category.color);
  };

  // Função para limpar e fechar o edit
  const handleCloseEdit = () => {
    setEditingCategory(null);
    setNameCategories("");
    setSelectedColor("#cccccc");
  };

  console.log(categories);

  return (
    <>
      <HeaderExpense titulo="Categorias" />
      <Section>
        <Button
          className="w-full items-center  h-12 dark:hover:bg-[#1F2937]"
          onClick={() => setOpenDialog(true)}
        >
          {" "}
          <Plus />
          Nova categoria
        </Button>

        {isLoading && (
          <div className="w-full flex justify-center mt-14 flex-col items-center gap-4">
            <Spinner className={`size-10 ${color.textMuted}`} />
            <p className={`text-sm ${color.textMuted}`}>Carregando...</p>
          </div>
        )}

        {categories && categories.length === 0 ? (
          <div className="w-full flex justify-center mt-14 flex-col items-center gap-4">
            <FolderKanban size={50} className={`${color.textMuted}`} />
            <p className={`text-sm ${color.textMuted}`}>
              Nenhuma categoria cadastrada
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-18 gap-y-8 pt-8 w-full">
            {categories?.map((category) => (
              <Card key={category.id} className="mt-0 w-full px-0 py-4 grid">
                <CardHeader className="flex gap-4 justify-between items-center">
                  <div className="flex gap-3 items-center">
                    <div
                      style={{ backgroundColor: category.color }}
                      className={`w-5 h-5  rounded-full`}
                    ></div>
                    <span
                      className={`text-[15px] font-medium ${color.textPrimary}`}
                    >
                      {category.name}
                    </span>
                  </div>
                  <div className={`flex items-center gap-2  } `}>
                    <SquarePen
                      size={28}
                      className={`transition ${color.textMuted} duration-300 ease-in-out border-2 border-transparent p-1 rounded-sm hover:border-[#6B7280]/80 cursor-pointer`}
                      onClick={() => handleOpenEdit(category)}
                    />
                    <Trash
                      size={28}
                      className={`transition text-red-400 duration-300 ease-in-out border-2 border-transparent p-1 rounded-sm hover:border-red-400 cursor-pointer`}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova categoria</DialogTitle>
              <DialogDescription>
                Crie uma nova categoria de despesa
              </DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleColorClick}>
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
                          "w-10 h-10 rounded-md transition-all border cursor-pointer",
                          "hover:scale-110",
                          isSelected
                            ? `border-gray-700 border-2 shadow-[${color}] dark:border-gray-100 scale-120`
                            : "border-gray-500 "
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
                  {isPending ? <Spinner /> : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!editingCategory} // Abre se houver uma categoria selecionada
          onOpenChange={(open) => !open && handleCloseEdit()}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>Edite o nome e cor</DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-4"
              onSubmit={() => alert("Editado com sucesso")}
            >
              <div>
                <Label htmlFor="editName">Nome</Label>
                <Input
                  id="editName"
                  value={nameCategories} // Agora usa o estado controlado
                  onChange={(e) => setNameCategories(e.target.value)}
                />
              </div>

              {/* Seletor de Cores (igual ao outro) */}
              <div>
                <Label>Cor</Label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {coresInput.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c }}
                      className={cn(
                        "w-10 h-10 rounded-md border",
                        selectedColor === c
                          ? "border-black scale-110"
                          : "border-transparent"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseEdit}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar Alterações</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Section>
    </>
  );
}
