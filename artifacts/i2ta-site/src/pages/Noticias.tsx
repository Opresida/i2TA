import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import Navbar from "@/components/Navbar";
import NoticiasHero from "@/components/NoticiasHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Noticias() {
  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      <Navbar />
      <NoticiasHero />

      <section className="relative py-24 pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(123,63,228,0.15), rgba(0,224,255,0.15))" }}
            >
              <Bell size={36} style={{ color: "#7B3FE4" }} />
            </div>

            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{
                background: "linear-gradient(135deg, #F5F7FA, #8A94A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Em breve, novidades!
            </h2>

            <p className="text-lg leading-relaxed max-w-xl" style={{ color: "#8A94A6" }}>
              Estamos preparando conteudos exclusivos sobre tecnologia, inovacao e inteligencia artificial.
              Fique atento — em breve publicaremos nossas primeiras noticias aqui.
            </p>

            <div
              className="mt-4 px-6 py-3 rounded-full border text-sm font-semibold"
              style={{
                borderColor: "rgba(123,63,228,0.3)",
                color: "#7B3FE4",
                background: "rgba(123,63,228,0.06)",
              }}
            >
              Novidades a caminho
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
