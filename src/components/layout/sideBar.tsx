import { color } from "@/src/styles/color";
import { PiChartLineUp } from "react-icons/pi";
import { usePathname } from "next/navigation";
import {
  Home,
  Receipt,
  FolderKanban,
  BarChart3,
  User,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "@/src/components/ui/animated-theme-toggler";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Despesas", href: "/dashboard/expenses", icon: Receipt },
  { name: "Categorias", href: "/dashboard/categories", icon: FolderKanban },
  { name: "Relatórios", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Perfil", href: "/dashboard/profile", icon: User },
];

export function SideBar() {
  const pathname = usePathname();

  return (
    <div>
      <header
        // 1. Largura, Altura Total da Tela e Posição Fixa
        className={`
      4 w-50 h-screen fixed 
        border-r 
        ${color.surface}
       
        ${color.border}
      `}
      >
        <div
          className={`
          flex items-center gap-2 w-full py-5 pl-4 border-b 
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

        <nav className="h-[calc(100vh-69px)] flex flex-col justify-between  ">
          <ul className="space-y-1 px-3 py-4">
            {navItems.map((item) => {
              const Icon = item.icon; // Componente do ícone
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex gap-2 items-center px-3 py-2.5 rounded-md cursor-pointer ${
                      pathname === item.href
                        ? `${color.backGroundGradient} text-[#F6F3ED] dark:text-[#F6F3ED] }`
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
            className={`flex flex-col gap-1 px-3 py-2 border-t ${color.border} ${color.border}`}
          >
            <li
              className={`flex gap-2 items-center rounded-md cursor-pointer hover:bg-[#F6F3ED] dark:hover:bg-[#1B1D25] `}
            >
              <AnimatedThemeToggler
                className={` flex gap-2 text-sm font-light  items-center px-3 py-2.5  cursor-pointer w-full  }`}
              />{" "}
            </li>
            <li
              className={`flex gap-2 items-center px-3 py-2.5 rounded-md cursor-pointer hover:bg-[#F6F3ED] dark:hover:bg-[#1B1D25] mb-2`}
            >
              <Globe size={18} className={color.textPrimary} />
              <span
                className={`text-sm font-semibold tracking-wider ${color.textPrimary}`}
              >
                PT
              </span>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
