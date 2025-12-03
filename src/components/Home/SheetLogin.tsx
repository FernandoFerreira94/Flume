"use client";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
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

export function LoginSheet() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer h-full w-full">
        Entrar
      </SheetTrigger>

      <SheetContent className="px-6 py-10 flex flex-col gap-6">
        <SheetHeader className="space-y-2">
          <SheetTitle className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Acesse sua conta
          </SheetTitle>

          <SheetDescription className="text-sm text-gray-600 dark:text-gray-300">
            Entre para acompanhar suas despesas futuras, metas financeiras e
            categorias personalizadas.
          </SheetDescription>
        </SheetHeader>

        {/* Botão Google */}
        <Button
          variant="default"
          className="w-full h-10 flex items-center gap-3  font-medium"
        >
          <FaGoogle size={22} />
          Continuar com Google
        </Button>

        {/* Separador */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
          <span className="text-gray-500 text-sm">ou</span>
          <div className="flex-1 h-[1px] bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Login por email */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm">
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              className="h-11"
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="password" className="text-sm">
              Senha
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                className="h-11"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <MdVisibilityOff size={22} />
                ) : (
                  <MdVisibility size={22} />
                )}
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full h-10 flex items-center gap-3"
          >
            <MdEmail size={22} />
            Entrar com E-mail
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
