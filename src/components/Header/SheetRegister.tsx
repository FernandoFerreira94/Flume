// Updated SheetRegister component with improved UX and added birth_date input
// NOTE: Replace paths with your actual project paths if needed

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
import { LoginSheet } from "../Header/SheetLogin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/ui/spinner";
import { useSignUp } from "@/src/hook/userSingUp";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SignUpSchemaType, SignUpSchema } from "@/src/lib/zod/signUpSchema";
import { Calendar22 } from "../dateBirth";
import { Controller } from "react-hook-form";

interface SheetRegisterProps {
  titulo: string;
}

export function SheetRegister({ titulo }: SheetRegisterProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate, isPending } = useSignUp({
    onSuccess: (data) => {
      router.push("/");
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: SignUpSchemaType) {
    mutate(data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

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

          <form
            className="flex flex-col gap-5 mt-6 w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Nome completo com melhor UX */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div>
                <Label htmlFor="first_name">Primeiro nome</Label>
                <Input
                  type="text"
                  id="first_name"
                  placeholder="Ex: Ana"
                  className="mt-1"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="last_name">Sobrenome</Label>
                <Input
                  type="text"
                  id="last_name"
                  placeholder="Ex: Silva"
                  className="mt-1"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <p className="text-[10px] text-red-500 mt-1">
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Data de nascimento */}
            <Controller
              control={control}
              name="birth_date"
              render={({ field }) => (
                <Calendar22
                  value={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    // sempre envie YYYY-MM-DD
                    const formatted = date
                      ? date.toISOString().split("T")[0]
                      : undefined;

                    field.onChange(formatted);
                  }}
                />
              )}
            />
            {errors.birth_date && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.birth_date.message}
              </p>
            )}

            {/* Email */}
            <div className="w-full">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="seuemail@exemplo.com"
                className="mt-1"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-[10px] text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Senha */}
            <div className="w-full relative">
              <Label htmlFor="password">Senha</Label>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
                className="mt-1 pr-10"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
              {errors.password && (
                <p className="text-[10px] text-red-500 mt-1 absolute">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botão Criar Conta */}
            <Button
              variant="default"
              disabled={isSubmitting || isPending}
              type="submit"
              className="w-full mt-3 h-10"
            >
              {isSubmitting ? <Spinner /> : "Criar Conta"}
            </Button>
          </form>

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
