"use client";
import { Button } from "@/components/ui/button";
import { color } from "@/src/styles/color";
import { Plus } from "lucide-react";
import { FolderKanban, SquarePen, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useCreateCategories } from "@/src/hook/insert/useCreateCategories";
import { useAppContext } from "@/src/context/useAppContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";
import { Section } from "@/components/layout/Section";
import { HeaderExpense } from "@/components/layout/HeaderExpense";
import { useFetchCategories } from "@/src/hook/fetch/useFetchCategories";
import { Card, CardHeader } from "@/components/ui/card";
import { CategoryProps } from "@/lib/types";
import { useUpdateCategory } from "@/src/hook/update/useUpdateCategory";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";
import { useDeleteCategory } from "@/src/hook/delete/useDeleteCategory";
import FormCategory from "./FormCategory";

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
  // Query Key
  const queryClient = useQueryClient();

  const { mutate: mutateUpdate, isPending: isPendingUpdate } =
    useUpdateCategory({
      onSuccess: () => {
        setEditingCategory(null);
        queryClient.invalidateQueries({
          queryKey: queryKey.categories(user?.id as string),
        });
        toast.success("Categoria atualizada com sucesso!");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  const { mutate: mutateDelete } = useDeleteCategory({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.categories(user?.id as string),
      });
      toast.success("Categoria excluida com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

  function handleEditCategory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingCategory && user) {
      mutateUpdate({
        id: editingCategory.id,
        name: nameCategories,
        color: selectedColor,
        user_id: user.id,
      });
    }
  }

  function handleDeleteCategory(id: string) {
    if (user) {
      mutateDelete({
        id: id,
      });
    }
  }

  return (
    <>
      <HeaderExpense titulo="Categorias" subTitulo="Categorias de despesas" />
      <Section>
        <div className="h-12">
          <FormCategory />
        </div>

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
          <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-x-8 gap-y-4 pt-8 w-full">
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
                      size={23}
                      className={`transition ${color.textMuted} duration-300 ease-in-out  border-transparent p-1 rounded-sm hover:border-[#6B7240]/80 cursor-pointer`}
                      onClick={() => handleOpenEdit(category)}
                    />
                    <Trash
                      onClick={() => handleDeleteCategory(category.id)}
                      size={23}
                      className={`transition text-red-400 duration-300 ease-in-out border-2 border-transparent p-0.5 rounded-sm hover:border-red-400 cursor-pointer`}
                    />
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}

        <Dialog
          open={!!editingCategory} // Abre se houver uma categoria selecionada
          onOpenChange={(open) => !open && handleCloseEdit()}
        >
          <DialogContent className="dark:bg-[#1B1D25]">
            <DialogHeader>
              <DialogTitle>Editar Categoria</DialogTitle>
              <DialogDescription>Edite o nome e cor</DialogDescription>
            </DialogHeader>
            <form className="flex flex-col gap-4" onSubmit={handleEditCategory}>
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
                <Button type="submit" disabled={isPendingUpdate}>
                  {isPendingUpdate ? <Spinner /> : "Salvar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </Section>
    </>
  );
}
