import { color } from "@/src/styles/color";
import Link from "next/link";

export function Footer() {
  return (
    <footer
      className={`flex h-24 w-full items-center absolute bottom-0 justify-center mt-auto rounded-t-4xl float-end  bg-[#1F2937] dark:bg-[#374151] ${color.border} border-t `}
    >
      <Link
        href="https://fernandodev.vercel.app/"
        target="_blank"
        className="text-gray-100 hover:text-gray-400 transition duration-300 ease-in-out"
      >
        Todos os direitos reservados @WebDevFF © 2025
      </Link>
    </footer>
  );
}
