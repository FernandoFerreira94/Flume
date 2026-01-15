import { color } from "@/src/styles/color";
import { useAppContext } from "@/src/context/useAppContext";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export default function HeaderProfile() {
  const { user } = useAppContext();
  return (
    <header
      className={`w-full h-50  pl-50 bg-[#374151] dark:bg-[#222222] ${color.border} border-b max-sm:pl-0`}
    >
      <article className="w-full h-full items-center justify-center flex  flex-col gap-4">
        <div className="w-18 h-18 bg-[#F6F3ED] rounded-full overflow-hidden flex items-center justify-center">
          {user?.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="avatar"
              width={100}
              height={100}
            />
          ) : (
            <div className="w-[100px] h-[100px] rounded-full bg-gray-300 animate-pulse" />
          )}
        </div>

        <div className={`flex items-center flex-col gap-1  text-[#F8FAFC]`}>
          <h1 className="text-xl font-semibold">
            {user ? (
              user.full_name
            ) : (
              <Skeleton className="h-8 w-50 rounded-md bg-[#6B7280]" />
            )}
          </h1>{" "}
          {user ? (
            <p className="text-[12px] tracking-wide">{user.email}</p>
          ) : (
            <Skeleton className="h-5 w-40 rounded-md bg-[#6B7280]" />
          )}
        </div>
      </article>
    </header>
  );
}
