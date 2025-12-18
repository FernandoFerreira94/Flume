import { color } from "@/src/styles/color";
import { useAppContext } from "@/src/context/useAppContext";
import { useGetUser } from "@/src/hook/RectQuery/useGetUser";
import { Skeleton } from "@/components/ui/skeleton";
export default function HeaderProfile() {
  const { user } = useAppContext();

  return (
    <header
      className={`w-full h-50  pl-50 bg-[#374151] dark:bg-[#222222] ${color.border} border-b `}
    >
      <article className="w-full h-full items-center justify-center flex  flex-col gap-4">
        <div className="w-18 h-18 bg-[#F6F3ED] rounded-full"></div>
        <div className={`flex items-center flex-col gap-1  text-[#F8FAFC]`}>
          <h1 className="text-xl font-semibold">
            {user ? (
              user.first_name + " " + user.last_name
            ) : (
              <Skeleton className="h-8 w-50 rounded-md bg-[#6B7280]" />
            )}
          </h1>
          <p className="text-[12px] tracking-wide">
            {" "}
            {user ? (
              user.email
            ) : (
              <Skeleton className="h-5 w-40 rounded-md bg-[#6B7280]" />
            )}
          </p>
        </div>
      </article>
    </header>
  );
}
