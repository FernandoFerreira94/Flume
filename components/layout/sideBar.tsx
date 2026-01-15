import Image from "next/image";
import { PiChartLineUp } from "react-icons/pi";
import { color } from "@/src/styles/color";
import { usePathname } from "next/navigation";
import { Home, Receipt, FolderKanban, BarChart3, User } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useAppContext } from "@/src/context/useAppContext";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Despesas", href: "/dashboard/expenses", icon: Receipt },
  { name: "Categorias", href: "/dashboard/categories", icon: FolderKanban },
  { name: "Relatórios", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Perfil", href: "/dashboard/profile", icon: User },
];

export function SideBar() {
  const { user } = useAppContext();
  const pathname = usePathname();

  return (
    <div>
      <header
        // 1. Largura, Altura Total da Tela e Posição Fixa
        className={`
      4 w-50  h-screen fixed  bottom-0 z-20
        border-r   max-sm:w-full  max-sm:h-20
        ${color.surface}
       
        ${color.border}
      `}
      >
        <div
          className={`
          flex items-center gap-2 w-full py-5 pl-4 border-b  max-sm:hidden
           ${color.border} 
        `}
        >
          <PiChartLineUp
            className={`p-2 rounded-md  ${color.backGroundGradient} text-[#F6F3ED]`} // Usando a cor escura do seu gradiente
            size={37}
          />
          <span
            className="font-semibold tracking-tight 
          text-lg"
          >
            Flume
          </span>
        </div>

        <nav className="h-[calc(100vh-69px)] flex flex-col justify-between   max-sm:h-full  max-sm:flex-row">
          <ul className="space-y-1 px-3 py-4  max-sm:flex  max-sm:justify-between  max-sm:w-full">
            {navItems.map((item) => {
              const Icon = item.icon; // Componente do ícone
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex  max-sm:flex-col gap-2  max-sm:gap-1 items-center px-3  max-sm:px-1  max-sm:py-1 py-2.5 rounded-md cursor-pointer ${
                      pathname === item.href
                        ? `${color.backGroundGradient}  text-[#F6F3ED] dark:text-[#F6F3ED] }`
                        : "hover:bg-[#F6F3ED] dark:hover:bg-[#1B1D25] "
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul
            className={`flex flex-col gap-2 px-3 py-4 border-t  max-sm:hidden ${color.border} ${color.border}`}
          >
            <li
              className={`flex gap-2 items-center  rounded-md cursor-pointer   `}
            >
              <Link
                href="/dashboard/profile"
                className={`flex gap-2 items-center rounded-md cursor-pointer  `}
              >
                {user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="Avatar"
                    width={100}
                    height={100}
                    className="w-8 h-8 rounded-full ml-2"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full ml-2 bg-gray-200 flex items-center justify-center">
                    <User size={16} /> {/* Ícone de fallback do Lucide */}
                  </div>
                )}
              </Link>
            </li>
            <li
              className={`flex gap-2 items-center rounded-md cursor-pointer hover:bg-[#F6F3ED] dark:hover:bg-[#1B1D25] `}
            >
              <AnimatedThemeToggler
                className={` flex gap-2 text-sm font-light  items-center px-3 py-2.5  cursor-pointer w-full  }`}
              />{" "}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
