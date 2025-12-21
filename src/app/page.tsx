import { Header } from "@/src/components/layout/header";
import { TextLogin } from "@/src/components/layout/TextHome";
import { RelatorioLogin } from "@/src/components/layout/RelatorioLogin";
import { SeccionCard } from "@/src/components/layout/SeccionCard";
import { Footer } from "../components/layout/Footer";
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
