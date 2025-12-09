import { Header } from "@/src/components/Header/header";
import { TextLogin } from "@/src/components/Home/TextHome";
import { RelatorioLogin } from "../components/Home/RelatorioLogin";
import { SeccionCard } from "../components/Home/SeccionCard";
import { Footer } from "../components/Footer/Footer";
export default function Login() {
  return (
    <>
      <main className="container mx-auto ">
        <Header />
        <section className="w-full flex mt-40 h-full">
          <TextLogin />
          <RelatorioLogin />
        </section>
        <SeccionCard />
        <Footer />
      </main>
    </>
  );
}
