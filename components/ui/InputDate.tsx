import { Input } from "./input";
import { useAppContext } from "@/src/context/useAppContext";

export function InputDate() {
  const { setMonth, setYear, month, year } = useAppContext();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [y, m] = e.target.value.split("-").map(Number);
    setMonth(m);
    setYear(y);
    localStorage.setItem("month", m.toString());
    localStorage.setItem("year", y.toString());
  };

  return (
    <div className={`flex flex-col gap-2 ml-auto text-end w-full `}>
      <Input
        type="month"
        id="month"
        name="month"
        value={`${year}-${String(month).padStart(2, "0")}`}
        className=" w-48  max-sm:w-46 max-sm:h-full   text-gray-700 border border-gray-300 rounded-lg px-4 max-sm:px-2 py-2 focus:outline-none focus:ring-1 focus:ring-gray-800 bg-[#F6F3ED] dark:bg-[#151526] dark:text-gray-200/80"
        onChange={handleChange}
      />
    </div>
  );
}
