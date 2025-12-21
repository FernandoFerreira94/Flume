"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Label } from "@/src/components/ui/label";

import { color } from "@/src/styles/color";
import { Mail, Calendar, LogOut, Cake } from "lucide-react";
import { useAppContext } from "@/src/context/useAppContext";
import { Skeleton } from "@/src/components/ui/skeleton";
import { formatDate } from "@/src/actives/formatDate";
import { Button } from "@/src/components/ui/button";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { supabaseBrowser } from "@/src/lib/supabase/client";
import { Calendar22 } from "@/src/components/ui/dateBirth";
import { Section } from "@/src/components/layout/Section";
import HeaderProfile from "@/src/components/layout/HeaderProfile";

export default function Profile() {
  const { user } = useAppContext();
  const router = useRouter();
  const dateFormatada = formatDate(user?.created_at as string);
  const dataNascimentoFormatada = formatDate(user?.birth_date as string);

  async function handleLogout() {
    supabaseBrowser.auth.signOut();
    Cookies.remove("flume-token");
    localStorage.setItem("theme", "light");
    router.push("/");
  }

  return (
    <>
      <HeaderProfile />
      <Section>
        <Card className={`p-4 rounded-lg  ${color.border}`}>
          <CardContent className="flex gap-4 p-0">
            <Mail
              size={40}
              className={`${color.backGroundGradient} text-[#f6f3ed] p-2.5 rounded-md `}
            />
            <div>
              <Label
                htmlFor="email"
                className={`text-[12px] ${color.textSecondary}`}
              >
                Email
              </Label>
              {user ? (
                <p>{user.email}</p>
              ) : (
                <Skeleton className="h-6 w-50 rounded-md" />
              )}
            </div>
          </CardContent>
          <hr />
          <CardContent className="flex gap-4 p-0">
            <Calendar
              size={40}
              className={`${color.backGroundGradient} text-[#f6f3ed] p-2.5 rounded-md `}
            />
            <div>
              <Label
                htmlFor="Membro desde"
                className={`text-[12px] ${color.textSecondary}`}
              >
                Membro desde
              </Label>
              {user ? (
                <p>{dateFormatada}</p>
              ) : (
                <Skeleton className="h-6 w-50 rounded-md" />
              )}
            </div>
          </CardContent>
          <hr />
          <CardContent className="flex gap-4 p-0">
            <Cake
              size={40}
              className={`${color.backGroundGradient} text-[#f6f3ed] p-2.5 rounded-md `}
            />
            <div>
              <Label
                htmlFor="Data de nascimento"
                className={`text-[12px] ${color.textSecondary}`}
              >
                {user?.birth_date && "Data de nascimento"}
              </Label>
              {user ? (
                <div>
                  <p>
                    {user?.birth_date ? (
                      dataNascimentoFormatada
                    ) : (
                      <Calendar22 onChange={() => {}} />
                    )}
                  </p>
                </div>
              ) : (
                <Skeleton className="h-6 w-50 rounded-md" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className={`px-4 py-6 rounded-lg mt-8  ${color.border}`}>
          <CardHeader className="gap-y-4">
            <CardTitle className="font-medium">Sobre o Flume</CardTitle>

            <CardDescription>
              Flume é seu gerenciador financeiro pessoal focado no futuro.
              Antecipe despesas, organize suas finanças e mantenha o controle
              total sobre seus gastos.
            </CardDescription>
            <CardDescription>
              Versão{" "}
              <span className="font-semibold text-gray-800 dark:text-[#f6f3ed]">
                1.0.0
              </span>
            </CardDescription>
          </CardHeader>
        </Card>
        <Button
          onClick={handleLogout}
          variant={"outline"}
          className="w-full mt-4 h-12 text-red-500 border-red-500 hover:bg-red-50 hover:text-red-500"
        >
          {" "}
          <LogOut /> Sair{" "}
        </Button>
      </Section>
    </>
  );
}
