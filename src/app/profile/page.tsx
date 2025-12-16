"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import HeaderProfile from "@/src/components/Header/HeaderProfile";
import { Main } from "@/src/components/Main";
import { Section } from "@/src/components/Section";
import { SideBar } from "@/src/components/SideBar/sideBar";
import { color } from "@/src/styles/color";
import { Mail, Calendar } from "lucide-react";
import { useAppContext } from "@/src/context/useAppContext";
import { Skeleton } from "@/components/ui/skeleton";

export default function Profile() {
  const { user } = useAppContext();

  return (
    <Main>
      <SideBar />
      <HeaderProfile />
      <Section>
        <Card className="p-4 rounded-lg">
          <CardContent className="flex gap-4 p-0">
            <Mail size={40} className={`bg-gray-200 p-2.5 rounded-md `} />
            <div>
              <Label
                htmlFor="email"
                className={`text-[12px] ${color.textSecondary}`}
              >
                Email
              </Label>
              <p>
                {user ? (
                  user.email
                ) : (
                  <Skeleton className="h-6 w-50 rounded-md" />
                )}
              </p>
            </div>
          </CardContent>
          <hr />
          <CardContent className="flex gap-4 p-0">
            <Calendar size={40} className={`bg-gray-200 p-2.5 rounded-md `} />
            <div>
              <Label
                htmlFor="Membro desde"
                className={`text-[12px] ${color.textSecondary}`}
              >
                Membro desde
              </Label>
              <p>
                {user ? (
                  user.created_at
                ) : (
                  <Skeleton className="h-6 w-50 rounded-md" />
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </Section>
    </Main>
  );
}
