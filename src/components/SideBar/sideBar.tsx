import { color } from "@/src/styles/color";
import { PiChartLineUp } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { House, Wallet, Tag, BarChart3, User } from "lucide-react";
import Link from "next/link";
const lightColors = color.light;
const navItems = [
  { name: "Home", href: "/dashboard", icon: House },
  { name: "Despesas", href: "/expenses", icon: Wallet },
  { name: "Categorias", href: "/categories", icon: Tag },
  { name: "Relatórios", href: "/reports", icon: BarChart3 },
  { name: "Perfil", href: "/profile", icon: User },
];

export function SideBar() {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <header
      // 1. Largura, Altura Total da Tela e Posição Fixa
      className={`
      4 w-50 h-screen fixed 
        border-r 
        ${lightColors.surface}
        ${lightColors.border}
      `}
    >
      <div
        className={`
          flex items-center gap-2 w-full py-6 pl-4 border-b 
           ${lightColors.border}
        `}
      >
        <PiChartLineUp
          className={`p-2 rounded-lg  ${color.backGroundGradient} ${lightColors.textOnPrimary}`} // Usando a cor escura do seu gradiente
          size={35}
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
                      ? `${color.backGroundGradient} ${lightColors.textOnPrimary}`
                      : "hover:bg-[#F6F3ED]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className={`space-y-1 px-3 py-4 `}>
          <li>
            <button
              className={`flex gap-2 items-center px-3 py-2.5 rounded-md cursor-pointer w-full
                   
                 
                       hover:bg-[#F6F3ED]
                  }`}
            >
              Dark Mode
            </button>
          </li>
          <li>
            <button>PT</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
