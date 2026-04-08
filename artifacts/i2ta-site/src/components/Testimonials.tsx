import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import { TimelineContent } from "@/components/ui/timeline-animation";
// Componente de slider preservado — descomentar quando houver depoimentos reais
// import TestimonialSlider, { Testimonial } from "@/components/ui/testimonial-slider";

/*
 * ── DEPOIMENTOS REAIS — DESCOMENTAR E PREENCHER QUANDO DISPONÍVEIS ──
 *
 * const testimonials: Testimonial[] = [
 *   {
 *     quote: "Depoimento real aqui...",
 *     name: "Nome do Parceiro",
 *     role: "Cargo",
 *     org: "Empresa / Organização",
 *     img: "https://ui-avatars.com/api/?name=Nome&background=00E0FF&color=0A0F1C&size=96&bold=true",
 *     accent: "cyan",  // "cyan" ou "purple"
 *   },
 * ];
 *
 * Para reativar, substituir o bloco de "em breve" abaixo por:
 *   <TestimonialSlider testimonials={testimonials} autoRotateInterval={7000} />
 */

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="py-20 md:py-28 relative"
      style={{ background: "var(--i2ta-dark)" }}
    >
      <div
        className="glow-blob"
        style={{
          width: "600px",
          height: "600px",
          background: "var(--i2ta-cyan)",
          top: "20%",
          left: "-10%",
          opacity: 0.05,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--i2ta-purple)",
          bottom: "10%",
          right: "-5%",
          opacity: 0.07,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <TimelineContent animationNum={0} className="text-center mb-14">
          <span className="section-tag">O que dizem sobre nos</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--i2ta-white)" }}
          >
            Depoimentos de <span className="text-gradient">Parceiros</span>
          </h2>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--i2ta-gray)" }}
          >
            Empresas, governos e pesquisadores que transformaram seus desafios
            em resultados concretos com o i2TA.
          </p>
        </TimelineContent>

        <TimelineContent animationNum={1}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-6 py-16"
          >
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, rgba(123,63,228,0.15), rgba(0,224,255,0.15))" }}
            >
              <MessageSquareQuote size={36} style={{ color: "#7B3FE4" }} />
            </div>

            <p
              className="text-xl md:text-2xl font-semibold text-center"
              style={{
                background: "linear-gradient(135deg, #F5F7FA, #8A94A6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Em breve, depoimentos de nossos parceiros!
            </p>

            <p className="text-base text-center max-w-lg" style={{ color: "#8A94A6" }}>
              Estamos reunindo historias reais de impacto e transformacao.
              Em breve voce conhecera quem ja esta construindo o futuro com o i2TA.
            </p>

            <div
              className="mt-2 px-5 py-2.5 rounded-full border text-sm font-semibold"
              style={{
                borderColor: "rgba(0,224,255,0.25)",
                color: "#00E0FF",
                background: "rgba(0,224,255,0.06)",
              }}
            >
              Novidades em breve
            </div>
          </motion.div>
        </TimelineContent>
      </div>
    </section>
  );
}
