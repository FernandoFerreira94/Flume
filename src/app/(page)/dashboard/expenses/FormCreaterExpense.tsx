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
import { useCreateSingleExpense } from "@/src/hook/insert/expense/useCreateSingleExpense";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateInstallmentExpense } from "@/src/hook/insert/expense/useCreateInstallmentExpense";
import { useCreateFixedExpense } from "@/src/hook/insert/expense/useCreateFixedExpense";
import FormCategory from "../categories/FormCategory";

// SCHEMA EXPENSE
const schemaExpense = z
  .object({
    name: z.string().min(1, "Informe o nome da despesa"),
    value: z.number().int().nonnegative().min(0, "Informe o valor da despesa"),
    expense_type: z.enum(["single", "fixed", "installment"]),
    category_id: z.string().min(1, "Selecione uma categoria"),
    installments_count: z
      .number("Informe o número de parcelas")
      .int()
      .min(1)
      .optional(),
    description: z.string().optional(),
    first_due_date: z.string("Informe a data de vencimento"),
  })
  .refine(
    (data) =>
      data.expense_type !== "installment" ||
      (data.installments_count !== undefined && data.installments_count > 1),
    {
      message: "Informe o número de parcelas",
      path: ["installments_count"],
    }
  );

type SchemaExpenseType = z.infer<typeof schemaExpense>;

export default function FormCreateExpense({
  title = true,
}: {
  title?: boolean;
}) {
  const { user } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  // FETCH EXPENSE
  const { data: categories } = useFetchCategories(user?.id as string);

  // KEY QUERY
  const queryClient = useQueryClient();
  const invalidadeExpense = () =>
    queryClient.invalidateQueries({
      queryKey: queryKey.installments(user?.id as string),
    });

  // INSERT
  // MUTATE SINGLE
  const { mutate: mutateSingle, isPending: isPendingSingle } =
    useCreateSingleExpense({
      onSuccess: () => {
        invalidadeExpense();
        toast.success("Despesa criada com sucesso!");

        setOpenDialog(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  // MUTATE INSTALLMENT
  const { mutate: mutateInstallments, isPending: isPendingInstallments } =
    useCreateInstallmentExpense({
      onSuccess: () => {
        invalidadeExpense();
        toast.success("Despesa criada com sucesso!");

        setOpenDialog(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  // MUTATE FIXED
  const { mutate: mutateFixed, isPending: isPendingFixed } =
    useCreateFixedExpense({
      onSuccess: () => {
        invalidadeExpense();
        toast.success("Despesa criada com sucesso!");

        setOpenDialog(false);
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  // LOADING
  const disabled = isPendingSingle || isPendingInstallments;

  // USEFORM
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
      expense_type: "single",
    },
  });

  const categoriaSelecionada = categories?.find(
    (c) => c.id === watch("category_id")
  );
  const selectedType = watch("expense_type");

  // FUNCAO DE SUBMISSAO
  async function onSubmit(data: SchemaExpenseType) {
    const basePayload = {
      user_id: user?.id as string,
      name: data.name,
      description: data.description,
      category_id: data.category_id,
      value: data.value,
      first_due_date: data.first_due_date,
    };

    // INSTALLMENT
    if (data.expense_type === "installment") {
      mutateInstallments({
        ...basePayload,
        expense_type: "installment",
        installments_count: data.installments_count!,
      });
      return;
    }

    if (data.expense_type === "fixed") {
      mutateFixed({
        ...basePayload,
        expense_type: "fixed",
      });
      return;
    }

    // SINGLE ou FIXED
    mutateSingle({
      ...basePayload,
      expense_type: data.expense_type,
      installments_count: 1,
      total_value: data.value,
    });
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
          disabled={disabled}
          className="w-full items-center h-full max-sm:text-none dark:hover:bg-[#1F2937] bg-[#374151] "
          onClick={() => setOpenDialog(true)}
        >
          {disabled ? (
            <Spinner />
          ) : (
            <>
              {" "}
              <Plus className="max-sm:size-7 size-4" />
              {title && <span>Despesas</span>}
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] dark:bg-[#1B1D25] font-normal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Nova despesa</DialogTitle>
            <DialogDescription className="mb-2">
              Criar uma despesa nova
            </DialogDescription>
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

            <div className="grid gap-2">
              <Label>Tipo</Label>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  className={` ${
                    selectedType === "single"
                      ? "dark:bg-[#2C3346]"
                      : "bg-[#F6F3ED] text-gray-800 hover:bg-[#F6F3ED] border border-gray-800/80 dark:bg-[#222222] dark:text-gray-200  dark:hover:bg-neutral-800"
                  }`}
                  type="button"
                  onClick={() => setValue("expense_type", "single")}
                >
                  Unica
                </Button>
                <Button
                  className={` ${
                    selectedType === "fixed"
                      ? "dark:bg-[#2C3346]"
                      : "bg-[#F6F3ED] text-gray-800 hover:bg-[#F6F3ED] border border-gray-800/80 dark:bg-[#222222] dark:text-gray-200  dark:hover:bg-neutral-800"
                  }`}
                  type="button"
                  onClick={() => setValue("expense_type", "fixed")}
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
                  onClick={() => setValue("expense_type", "installment")}
                >
                  Parcelada
                </Button>
              </div>
            </div>

            <div className="grid gap-1 relative">
              <Label htmlFor="value">
                {selectedType === "installment" ? "Valor da parcela" : "Valor"}
              </Label>
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

            {/* PARCELAS */}
            {selectedType === "installment" && (
              <div className="grid gap-1">
                <Label>Parcelas</Label>
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  {...register("installments_count", {
                    valueAsNumber: true,
                  })}
                />
                {errors.installments_count && (
                  <span className="text-red-500 text-xs">
                    {errors.installments_count.message}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col gap-2 ">
              <div className=" ">
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
                              onSelect={() => {
                                setValue("category_id", item.id, {
                                  shouldValidate: true,
                                });
                                setOpen(false);
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

                <div className="w-30 h-6 pt-2 float-right ">
                  <FormCategory
                    variante={"link"}
                    title="Criar categoria"
                    iconShow={true}
                  />
                </div>
                {/* Exibe erro se não houver categoria */}
                {errors.category_id && (
                  <span className="text-red-500 text-xs">
                    {errors.category_id.message}
                  </span>
                )}
              </div>

              <div>
                <Controller
                  name="first_due_date"
                  control={control}
                  render={({ field }) => (
                    <Calendar22
                      title="Vencimento"
                      value={
                        field.value
                          ? new Date(`${field.value}T12:00:00`)
                          : undefined
                      }
                      onChange={(date) => {
                        if (!date) {
                          field.onChange(undefined);
                          return;
                        }

                        const yyyy = date.getFullYear();
                        const mm = String(date.getMonth() + 1).padStart(2, "0");
                        const dd = String(date.getDate()).padStart(2, "0");

                        field.onChange(`${yyyy}-${mm}-${dd}`);
                      }}
                    />
                  )}
                />
                {errors.first_due_date && (
                  <span className="text-red-500 text-xs">
                    {errors.first_due_date.message}
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
            <Button
              disabled={isPendingSingle}
              type="submit"
              className="w-full h-10 dark:bg-[#2C3346]"
            >
              {disabled ? <Spinner /> : "Criando"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
