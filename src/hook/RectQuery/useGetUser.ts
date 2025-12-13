import { useQuery } from "@tanstack/react-query";

import { fetchUserService } from "@/src/service/fetchUserService";
import { queryKey } from "./queryKey";
import { UserSchemaProps } from "@/src/lib/zod/userSchema";

import Cookies from "js-cookie";
import { supabase } from "@/src/supabase/supabase";

import { redirect } from "next/navigation";

const getUserData = async (): Promise<UserSchemaProps> => {
  const storedToken = Cookies.get("flume-token");

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!storedToken && !session) {
    return redirect("/");
  }

  const userData = await fetchUserService(session?.user.id as string);

  return userData;
};

export function useGetUser(userId: string) {
  return useQuery({
    queryKey: queryKey.user(userId),
    queryFn: () => getUserData(),
    enabled: !!userId,
  });
}
