"use client";

import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { HeaderDashboard } from "@/src/components/Header/HeaderDashboard";
import { useAppContext } from "@/src/context/useAppContext";
import { useGetUser } from "@/src/hook/RectQuery/useGetUser";
import { color } from "@/src/styles/color";
import { Skeleton } from "@/components/ui/skeleton";
import CardGastos from "@/src/components/dashboard/CardGastosDashboard";
export default function Dashboard() {
  const { session } = useAppContext();

  const { data } = useGetUser(session?.user.id as string);

  return (
    <Main>
      <HeaderDashboard />
      <Section>
        <h1
          className={`text-2xl font-semibold flex gap-2 items-center ${color.textPrimary}`}
        >
          Olá,{" "}
          {data ? (
            data.first_name
          ) : (
            <Skeleton className="h-8 w-50 rounded-md" />
          )}
        </h1>
        <div className="flex items-center space-x-4"></div>
        <p className={`text-sm mt-1 ${color.textSecondary}`}>Visão geral</p>
        <CardGastos />
      </Section>
    </Main>
  );
}
