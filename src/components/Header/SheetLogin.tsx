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
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // 1. Importar useForm
import { zodResolver } from "@hookform/resolvers/zod"; // 2. Importar o resolver do Zod
import { Spinner } from "@/components/ui/spinner";
import { SheetRegister } from "./SheetRegister";
import { SingInSchemaType, SingInSchema } from "@/src/lib/zod/signInSchema";
import { useSignInMutationFn } from "@/src/hook/userSingIn";
import { toast } from "sonner";
import { loginWithGoogleService } from "@/src/service/loginWithGoogleService";

export function LoginSheet() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SingInSchemaType>({
    resolver: zodResolver(SingInSchema),
  });

  const { mutate, isPending } = useSignInMutationFn({
    onSuccess: (data) => {
      if (data.session && data.user) {
        router.push("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(data: SingInSchemaType) {
    mutate(data);

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <Sheet>
      <SheetTrigger className="cursor-pointer h-full w-full">
        Entrar
      </SheetTrigger>

      <SheetContent className="px-6 py-10 flex flex-col gap-6 ">
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
          onClick={loginWithGoogleService}
          variant="default"
          className="w-full h-10 flex items-center gap-3  font-medium "
        >
          <FaGoogle size={22} />
          Continuar com Google
        </Button>

        {/* Separador */}
        <div className="flex items-center gap-3 my-2">
          <div className=" bg-gray-300 dark:bg-gray-700" />{" "}
          <hr className="w-full h-px bg-gray-300 dark:bg-gray-300" />
          <span className="text-gray-500 dark:text-gray-300 text-sm">ou</span>
          <hr className="w-full h-px bg-gray-300 dark:bg-gray-300" />
          <div className="  bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Login por email */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="email" className="text-sm ">
              E-mail
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="seuemail@exemplo.com"
              className="h-11"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
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
                {...register("password")}
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
            {errors.password && (
              <p className="text-[10px] text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            variant="outline"
            type="submit"
            className="w-full h-10 flex items-center gap-3 disabled:opacity-100"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                <MdEmail size={22} />
                Entrar com E-mail
              </>
            )}
          </Button>
        </form>
        <p className="text-center text-gray-700 text-sm dark:text-[#f6f3ed]/60">
          Não possui uma conta?{" "}
          <button className="text-[#313851] font-semibold hover:underline dark:text-[#A5B4FC]">
            <SheetRegister titulo="Clica aqui" />
          </button>
        </p>
      </SheetContent>
    </Sheet>
  );
}
