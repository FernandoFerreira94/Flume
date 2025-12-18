import { Header } from "@/src/components/Header/header";
import { TextLogin } from "@/src/components/Home/TextHome";
import { RelatorioLogin } from "../components/Home/RelatorioLogin";
import { SeccionCard } from "../components/Home/SeccionCard";
import { Footer } from "../components/Footer/Footer";
import { color } from "../styles/color";
export default function Login() {
  return (
    <>
      <div className={`w-full min-h-screen ${color.surfaceAlt}`}>
        <main className="container mx-auto min-h-screen relative">
          <Header />
          <section className="w-full flex justify-around mt-40 h-full">
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
