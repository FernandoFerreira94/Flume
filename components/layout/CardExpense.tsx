import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { convertValue } from "@/src/actives/convertValue";
import { formatDate } from "@/src/actives/formatDate";
import { isOverdue } from "@/src/actives/isOverdue";
import { useDeleteExpense } from "@/src/hook/delete/useDeleteExpense";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/src/hook/KeyQuery/queryKey";

interface CardExpenseProps {
  name: string;
  value: number;
  date: string;
  type: string;
  parcelasTotal?: number;
  parcelasPagas?: number;
  id: string;
  user_id: string;
}

export default function CardExpense({
  name,
  value,
  date,
  type,
  parcelasTotal,
  parcelasPagas,
  id,
  user_id,
}: CardExpenseProps) {
  const [checked, setChecked] = useState(false);

  const queryClient = useQueryClient();

  const isOverdueExpense = isOverdue(date as string);
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
  return (
    <section
      className="w-full border py-4 px-4 bg-white rounded-lg border-gray-400/60 flex gap-2 hover:shadow-lg transition duration-300 ease-in-out 
    dark:bg-[#242731] dark:border-[#242731] dark:hover:shadow-gray-600/20
    "
    >
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
              {name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {checked && (
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
            {formatDate(date as string)}
          </p>
          <p className="text-xs text-gray-600/80 font-medium bg-gray-200/60 px-2 py-1 rounded-sm dark:bg-[#2E344A] dark:text-gray-200/60 ">
            {type === "installment"
              ? `${parcelasPagas}/ ${parcelasTotal}`
              : type}
          </p>
        </div>
      </div>
      <Trash2
        onClick={() => handleDelete(id)}
        size={16}
        className="text-gray-400 transition duration-300 hover:text-red-600 cursor-pointer dark:hover:text-red-400"
      />
    </section>
  );
}
