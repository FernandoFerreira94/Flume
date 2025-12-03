"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSheet } from "./SheetLogin";
interface SheetRegisterProps {
  titulo: string;
}

export function SheetRegister({ titulo }: SheetRegisterProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer h-full w-full">
        {titulo}
      </SheetTrigger>

      <SheetContent className="px-6">
        <SheetHeader>
          <SheetTitle className="text-xl mt-10 text-gray-800">
            Crie sua conta
          </SheetTitle>

          <SheetDescription className="pt-4 text-gray-600">
            Preencha os dados abaixo para começar a usar o Flume e organizar
            suas finanças.
          </SheetDescription>

          <form className="flex flex-col gap-5 mt-6 w-full">
            {/* Nome */}
            <div className="w-full">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                type="text"
                id="name"
                placeholder="Seu nome"
                className="mt-1"
              />
            </div>

            {/* Email */}
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="mt-1"
              />
            </div>

            {/* Senha */}
            <div className="w-full relative">
              <Label htmlFor="password">Senha</Label>

              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
                className="mt-1 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Botão Criar Conta */}
            <Button variant="default" className="w-full mt-3 h-10">
              Criar conta
            </Button>
          </form>

          {/* Já tem conta? */}
          <p className="text-center text-gray-700 text-sm mt-6">
            Já possui conta?{" "}
            <button className="text-[#313851] font-semibold hover:underline">
              <LoginSheet />
            </button>
          </p>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
