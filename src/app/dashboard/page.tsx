"use client";

import { useState } from "react";
import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { HeaderDashboard } from "@/src/components/Header/HeaderDashboard";
import { useAppContext } from "@/src/context/useAppContext";
import { useGetUser } from "@/src/hook/RectQuery/useGetUser";
import { color } from "@/src/styles/color";
import { Skeleton } from "@/components/ui/skeleton";
import CardGastos from "@/src/components/dashboard/CardGastosDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraficoPizza } from "@/src/components/dashboard/GraficoPizza";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Dashboard() {
  const { session } = useAppContext();
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const { data } = useGetUser(session?.user.id as string);
  const [openDialog, setOpenDialog] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const expenseDays = [
    new Date(2025, 11, 10), // 10/12/2025
    new Date(2025, 11, 15),
  ];
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
        <div className="grid grid-cols-2 gap-8 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className={`font-medium text-md ${color.textPrimary}`}>
                Gastos por categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center gap-4">
              <CardDescription>
                <ul className="gap-1 flex flex-col ">
                  <li className="flex items-center  gap-2">Casa 33%</li>
                  <li> Cartao lourdes 45%</li>
                  <li> Servicos 15%</li>
                  <li> Compras 8%</li>
                  <li> Passeio 12%</li>
                </ul>
              </CardDescription>
              <GraficoPizza />
            </CardContent>
            <CardContent className="flex justify-center mt-8">
              <CardDescription>
                <ul>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded-[2px] bg-[#8884d8]"></div>{" "}
                    Casa
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded-[2px] bg-[#82ca9d]"></div>{" "}
                    Cartao lourdes
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded-[2px] bg-[#ffc658]"></div>{" "}
                    Servicos
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded-[2px] bg-[#ff7f50]"></div>{" "}
                    Compras
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-3 rounded-[2px] bg-[#3f3f3f]"></div>{" "}
                    Passeio
                  </li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Calendar
                onDayClick={(day) => {
                  setSelectedDay(day);
                  setOpenDialog(true);
                }}
                mode="single"
                onSelect={setDate}
                modifiers={{
                  hasExpense: expenseDays,
                }}
                modifiersClassNames={{
                  hasExpense: `relative ${color.surfaceAlt} text-[#f6f3ed]   rounded-md text-foreground font-semibold `,
                }}
                className="rounded-lg w-full"
              />
            </CardContent>
          </Card>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Gastos do dia {selectedDay?.toLocaleDateString("pt-BR")}
              </DialogTitle>
              <DialogDescription>
                Aqui você renderiza os gastos desse dia.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </Section>
    </Main>
  );
}
