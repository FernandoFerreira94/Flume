import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface CardExpenseProps {
  name: string;
  value: string;
  type: string;
  due_date: string;
}

export default function CardExpense({
  name,
  value,
  type,
  due_date,
}: CardExpenseProps) {
  const [checked, setChecked] = useState(false);
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
            <p className="font-semibold text-sm">{value}</p>
          </div>
        </div>
        <div className="flex w-full items-center gap-8 ">
          <p className="text-xs text-neutral-600 dark:text-gray-200/80">
            {due_date}
          </p>
          <p className="text-xs text-gray-600/80 font-medium bg-gray-200/60 px-2 py-1 rounded-sm dark:bg-[#2E344A] dark:text-gray-200/60 ">
            {type}
          </p>
        </div>
      </div>
      <Trash2
        size={16}
        className="text-gray-400 transition duration-300 hover:text-red-600 cursor-pointer dark:hover:text-red-400"
      />
    </section>
  );
}
