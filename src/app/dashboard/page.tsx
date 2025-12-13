"use client";

import { SideBar } from "@/src/components/SideBar/sideBar";
import { useAppContext } from "@/src/context/useAppContext";
import { useGetUser } from "@/src/hook/RectQuery/useGetUser";

export default function Dashboard() {
  const { session } = useAppContext();

  const { data } = useGetUser(session?.user.id as string);

  console.log(data);

  return (
    <main className="relative w-full  flex ">
      <SideBar />
      <header className="pl-50">
        <p className="text-black">asds</p>
        <p className="text-black">asds</p>
      </header>
    </main>
  );
}
