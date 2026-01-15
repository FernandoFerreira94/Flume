import { Header } from "@/components/layout/header";
import { TextLogin } from "@/components/layout/TextHome";
import { RelatorioLogin } from "@/components/layout/RelatorioLogin";
import { SeccionCard } from "@/components/layout/SeccionCard";
import { Footer } from "../../components/layout/Footer";
import { color } from "../styles/color";
export default function Login() {
  return (
    <>
      <div className={`w-full min-h-screen  ${color.surfaceAlt}`}>
        <main className="container mx-auto min-h-screen relative flex flex-col ">
          <Header />
          <section className="w-full flex items-center  justify-around mt-40 max-sm:mt-8 h-full max-sm:flex-col">
            <TextLogin />
            <RelatorioLogin />
          </section>
          <SeccionCard />

          <Footer />
        </main>
      </div>
    </>
  );
}
