"use client";
import { Button } from "@/components/ui/button";

import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar22 } from "@/components/ui/dateBirth";

import { formatCentsToBRL, parseBRLToCents } from "./action";
import { useAppContext } from "@/src/context/useAppContext";
import { useFetchCategories } from "@/src/hook/fetch/useFetchCategories";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useCreateExpense } from "@/src/hook/insert/useCreateExpense";
import { toast } from "sonner";

const schemaExpense = z
  .object({
    name: z.string().min(1, "Informe o nome da despesa"),
    value: z.number().int().nonnegative().min(1, "Informe o valor da despesa"),
    type: z.enum(["fixed", "installment"]),
    category_id: z.string().min(1, "Selecione uma categoria"),
    installment_count: z
      .number("Informe o número de parcelas")
      .int()
      .min(1)
      .optional(),
    description: z.string().optional(),
    due_date: z.string("Informe a data de vencimento"),
  })
  .refine(
    (data) => data.type === "fixed" || data.installment_count !== undefined,
    {
      message: "Informe o número de parcelas",
      path: ["installment_count"],
    }
  );

type SchemaExpenseType = z.infer<typeof schemaExpense>;

export default function FormCreateExpense() {
  const { user } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useCreateExpense({
    onSuccess: () => {
      toast.success("Despesa criada com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SchemaExpenseType>({
    resolver: zodResolver(schemaExpense),
    defaultValues: {
      category_id: "", // Inicialize o valor
      type: "fixed",
    },
  });
  const { data: categories } = useFetchCategories(user?.id as string);
  const categoriaSelecionada = categories?.find(
    (c) => c.id === watch("category_id")
  );
  const selectedType = watch("type");

  function onSubmit(data: SchemaExpenseType) {
    console.log("Dados enviados:", data);
    mutate({
      ...data,
      user_id: user?.id as string,
    });
    setOpenDialog(false);
    reset();
  }

  return (
    <Dialog
      open={openDialog}
      onOpenChange={(open) => {
        setOpenDialog(open);

        if (!open) {
          reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="w-full items-center  h-12 dark:hover:bg-[#1F2937] bg-[#374151]"
          onClick={() => setOpenDialog(true)}
        >
          {" "}
          <Plus />
          Criar despesas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-[#1B1D25] font-normal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Nova despesa</DialogTitle>
            <DialogDescription>Criar uma despesa nova</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-1 relative">
              <Label htmlFor="nameExpense">Nome</Label>
              <Input
                className=""
                id="nameExpense"
                placeholder="Ex: Netflix"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="grid gap-1 relative">
              <Label htmlFor="value">Valor</Label>
              <Controller
                name="value"
                control={control}
                defaultValue={0}
                render={({ field }) => (
                  <Input
                    className={`  dark:text-gray-200/80 ${
                      field.value ? "text-neutral-800" : "text-neutral-800/60"
                    } `}
                    inputMode="numeric"
                    placeholder="R$ 0,00"
                    value={formatCentsToBRL(field.value)}
                    onChange={(e) => {
                      const cents = parseBRLToCents(e.target.value);
                      field.onChange(cents);
                    }}
                  />
                )}
              />
              {errors.value && (
                <span className="text-red-500 text-xs">
                  {errors.value.message}
                </span>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Tipo</Label>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  className={` ${
                    selectedType === "fixed"
                      ? "dark:bg-[#2C3346]"
                      : "bg-[#F6F3ED] text-gray-800 hover:bg-[#F6F3ED] border border-gray-800/80 dark:bg-[#222222] dark:text-gray-200  dark:hover:bg-neutral-800"
                  }`}
                  type="button"
                  onClick={() => setValue("type", "fixed")}
                >
                  Fixa
                </Button>
                <Button
                  className={` ${
                    selectedType === "installment"
                      ? "dark:bg-[#2C3346]"
                      : "bg-[#F6F3ED] text-gray-800 hover:bg-[#F6F3ED] border border-gray-800/80 dark:bg-[#222222] dark:text-gray-200  dark:hover:bg-neutral-800"
                  }`}
                  type="button"
                  onClick={() => setValue("type", "installment")}
                >
                  Parcelada
                </Button>
              </div>
            </div>

            {/* PARCELAS */}
            {selectedType === "installment" && (
              <div className="grid gap-1">
                <Label>Parcelas</Label>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  {...register("installment_count", {
                    valueAsNumber: true,
                  })}
                />
                {errors.installment_count && (
                  <span className="text-red-500 text-xs">
                    {errors.installment_count.message}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-4 ">
              <div>
                <Popover open={open} onOpenChange={setOpen}>
                  <Label className="mb-1">Categoria</Label>

                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={`w-full border-gray-400/80 justify-between ${
                        categoriaSelecionada
                          ? `text-gray-800`
                          : "text-gray-800/60"
                      }`}
                    >
                      {categoriaSelecionada?.name || "Selecionar categoria"}

                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-full p-0 ">
                    <Command>
                      <CommandInput
                        placeholder="Busca categoria..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>
                          Nenhuma categoria encontrada.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories?.map((item) => (
                            <CommandItem
                              key={item.id}
                              value={item.name}
                              onSelect={(currentValue) => {
                                setValue("category_id", item.id, {
                                  shouldValidate: true,
                                });
                                setOpen(false);
                                console.log(currentValue);
                                //  setValue("category_id_id", item.id);
                              }}
                            >
                              <article className="flex justify-between w-full items-center">
                                <span>{item.name}</span>
                                <span
                                  style={{ backgroundColor: item.color }}
                                  className="w-3 h-3 rounded-full mr-2"
                                ></span>
                              </article>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* Exibe erro se não houver categoria */}
                {errors.category_id && (
                  <span className="text-red-500 text-xs">
                    {errors.category_id.message}
                  </span>
                )}
              </div>

              <div>
                <Controller
                  name="due_date"
                  control={control}
                  render={({ field }) => (
                    <Calendar22
                      title="Vencimento"
                      value={field.value ? new Date(field.value) : undefined}
                      onChange={(date) => {
                        field.onChange(
                          date ? date.toISOString().split("T")[0] : undefined
                        );
                      }}
                    />
                  )}
                />
                {errors.due_date && (
                  <span className="text-red-500 text-xs">
                    {errors.due_date.message}
                  </span>
                )}
              </div>
              <div>
                <Label className="mb-1" htmlFor="description">
                  Descrição
                </Label>
                <Textarea
                  placeholder="Ex: Compra de Netflix"
                  {...register("description")}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-4 mt-4">
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className="w-full h-10 bg-[#F6F3ED] border text-gray-800 hover:bg-[#F6F3ED] border-gray-800/80 dark:bg-[#222222] dark:text-gray-200  dark:hover:bg-neutral-800"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full h-10 dark:bg-[#2C3346]">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
