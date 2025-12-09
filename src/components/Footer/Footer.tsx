import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex h-24 w-full items-center justify-center bg-[#3E4864] rounded-t-4xl mt-20">
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
