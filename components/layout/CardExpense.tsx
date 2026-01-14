"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Trash2 } from "lucide-react";
import { convertValue } from "@/src/actives/convertValue";
import { formatDate } from "@/src/actives/formatDate";
import { isOverdue } from "@/src/actives/isOverdue";
import { useDeleteExpense } from "@/src/hook/delete/useDeleteExpense";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";
import { useUpdadePaidExpense } from "@/src/hook/update/useUpdatePaidExpense";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { formatCentsToBRL } from "@/src/app/(page)/dashboard/expenses/action";
import { buildExpenseDays } from "@/src/actives/buildExpenseDays";

interface CardExpenseProps {
  name: string;
  value: number;
  date: string;
  type: string;
  parcelasTotal?: number;
  parcelasPagas?: number;
  expense_id: string;
  user_id: string;
  paid: boolean;
  installment_id: string;
}

const schemaData = z.object({
  name: z.string().min(1, "Informe o nome da despesa"),
  value: z.number().int().nonnegative().min(0, "Informe o valor da despesa"),
});

type ScehmaData = z.infer<typeof schemaData>;

export default function CardExpense({
  name,
  value,
  date,
  type,
  parcelasTotal,
  parcelasPagas,
  expense_id,
  user_id,
  paid,
  installment_id,
}: CardExpenseProps) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const { mutate: updadePaid } = useUpdadePaidExpense({
    onSuccess: (Variable) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.installments(user_id),
      });
      if (Variable.paid) {
        toast.success(`Despesa ${Variable.expense.name} paga!`);
      } else {
        toast.info(`Despesa ${Variable.expense.name} não paga!`);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: mutateDelete } = useDeleteExpense({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey.installments(user_id),
      });
      toast.success("Despesa excluida com sucesso!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDelete(expenseId: string) {
    mutateDelete(expenseId);
  }

  const isOverdueExpense = isOverdue(date as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ScehmaData>({
    resolver: zodResolver(schemaData),
  });

  function onSubmit(data: ScehmaData) {
    setOpenDialog(false);
    updadePaid({
      installments_id: installment_id,
      value: data.value,
      name: data.name,
      expense_id,
    });

    reset();
  }

  return (
    <>
      <section
        className="w-full border py-4 px-4 bg-white rounded-lg border-gray-400/60 flex gap-2 hover:shadow-lg transition duration-300 ease-in-out 
    dark:bg-[#242731] dark:border-[#242731] dark:hover:shadow-gray-600/20
    "
      >
        {" "}
        <Checkbox
          checked={paid}
          onCheckedChange={() => {
            updadePaid({
              installments_id: installment_id,
              paid: !paid,
            });
          }}
        />
        <div className="w-full flex flex-col gap-2">
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center gap-4">
              <span
                className={`text-sm font-medium ${
                  paid && "line-through text-neutral-500"
                } `}
              >
                {name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {paid && (
                <>
                  <span className="text-xs font-medium bg-green-500/90 px-1.5 py-0.5 rounded-sm text-neutral-700 ">
                    pago
                  </span>
                </>
              )}
              <p className="font-semibold text-sm">{convertValue(value)}</p>
            </div>
          </div>
          <div className="flex w-full items-center gap-4 ">
            <p
              className={`text-xs ${
                isOverdueExpense
                  ? "text-red-600 dark:text-red-200/80"
                  : "text-neutral-600 dark:text-gray-200/80"
              }`}
            >
              {formatDate(date)}
            </p>
            <p className="text-xs text-gray-600/80 font-medium bg-gray-200/60 px-2 py-1 rounded-sm dark:bg-[#2E344A] dark:text-gray-200/60 ">
              {type === "installment"
                ? `${parcelasPagas}/ ${parcelasTotal}`
                : type}
            </p>
          </div>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Edit
              size={16}
              className="text-gray-400 transition duration-300 hover:text-blue-600 cursor-pointer dark:hover:text-blue-400"
            />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-[#1B1D25] font-normal">
            <DialogHeader>
              <DialogTitle>Editar despesa</DialogTitle>
              <DialogDescription className="mb-2 text-sm text-gray-600/80 dark:text-gray-400">
                Modificar nome e valor
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-2 w-full">
                <div>
                  <Label>Nome da despesa</Label>
                  <Input defaultValue={name} {...register("name")} />

                  {errors.name && (
                    <span className="text-xs text-red-600">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <Label>Valor da despesa</Label>
                  <Controller
                    name="value"
                    control={control}
                    defaultValue={value}
                    render={({ field }) => (
                      <Input
                        inputMode="numeric"
                        placeholder="R$ 0,00"
                        value={formatCentsToBRL(field.value)}
                        onChange={(e) => {
                          const onlyNumbers = e.target.value.replace(/\D/g, "");
                          field.onChange(Number(onlyNumbers));
                        }}
                        onBlur={() => {
                          field.onChange(field.value);
                        }}
                      />
                    )}
                  />

                  {errors.value && (
                    <span className="text-xs text-red-600">
                      {errors.value.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full ">
                <Button type="button" variant={"outline"}>
                  Cancelar
                </Button>
                <Button type="submit">Editar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
        <Trash2
          onClick={() => handleDelete(expense_id)}
          size={16}
          className="text-gray-400 transition duration-300 hover:text-red-600 cursor-pointer dark:hover:text-red-400"
        />
      </section>
    </>
  );
}
