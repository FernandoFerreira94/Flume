import { color } from "@/src/styles/color";
import { useAppContext } from "@/src/context/useAppContext";
import { useGetUser } from "@/src/hook/RectQuery/useGetUser";
export default function HeaderProfile() {
  const { session } = useAppContext();

  const { data } = useGetUser(session?.user.id as string);
  return (
    <header
      className={`w-full h-50  pl-50 bg-[#374151] dark:bg-[#222222] ${color.border} border-b `}
    >
      <article className="w-full h-full items-center justify-center flex  flex-col gap-4">
        <div className="w-18 h-18 bg-[#F6F3ED] rounded-full"></div>
        <div className={`flex items-center flex-col  text-[#F8FAFC]`}>
          <h1 className="text-xl font-semibold">
            {data?.first_name} {"  "}
            {data?.last_name}
          </h1>
          <p className="text-[12px] tracking-wide">{data?.email}</p>
        </div>
      </article>
    </header>
  );
}
