"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useCreateCategories } from "@/src/hook/insert/useCreateCategories";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "@/src/context/useAppContext";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";
import { toast } from "sonner";
import { CategoryProps } from "@/lib/types";
import { Plus } from "lucide-react";

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

interface FormCategoryProps {
  title?: string;
  variante?: "default" | "ghost" | "link" | "outline";
  iconShow?: boolean;
}

export default function FormCategory({
  title = "Categorias",
  variante = "default",
  iconShow = true,
}: FormCategoryProps) {
  const { user } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [nameCategories, setNameCategories] = useState<string>("");
  const [editingCategory, setEditingCategory] = useState<CategoryProps | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string>("#cccccc");

  const queryClient = useQueryClient();
  //
  const { mutate, isPending } = useCreateCategories({
    onSuccess: () => {
      setOpenDialog(false);
      queryClient.invalidateQueries({
        queryKey: queryKey.categories(user?.id as string),
      });
      toast.success("Categoria criada com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleColorClick(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user) {
      mutate({
        name: nameCategories,
        color: selectedColor,
        user_id: user.id,
      });
    }
  }

  return (
    <>
      <Button
        type="button"
        variant={variante}
        className="w-full items-center  h-full dark:hover:bg-[#1F2937]"
        onClick={() => setOpenDialog(true)}
      >
        {" "}
        {iconShow && <Plus />}
        {title}
      </Button>

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
    </>
  );
}
