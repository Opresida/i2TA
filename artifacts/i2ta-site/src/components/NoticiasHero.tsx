import { motion } from "framer-motion";

export default function NoticiasHero() {
  return (
    <section
      className="relative overflow-hidden pt-36 pb-20 flex flex-col items-center justify-center text-center"
      style={{ background: "#0A0F1C", minHeight: "400px" }}
    >
      <div className="bg-grid" style={{ opacity: 0.12 }} />

      <div
        className="glow-blob"
        style={{
          width: "600px",
          height: "600px",
          background: "#7B3FE4",
          top: "-200px",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.12,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "400px",
          height: "400px",
          background: "#00E0FF",
          top: "50px",
          right: "-100px",
          opacity: 0.07,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border text-xs font-display tracking-widest uppercase"
          style={{
            background: "rgba(0,224,255,0.06)",
            borderColor: "rgba(0,224,255,0.18)",
            color: "#00E0FF",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#00E0FF" }}
          />
          Conhecimento em movimento
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold leading-tight mb-5"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#F5F7FA" }}
        >
          Notícias &{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Insights
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          style={{ color: "#8A94A6" }}
        >
          Acompanhe as pesquisas, inovações e iniciativas do i2TA que estão
          transformando o cenário tecnológico da Amazônia e gerando impacto real
          para comunidades, empresas e instituições.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10 h-px w-24 mx-auto"
          style={{
            background: "linear-gradient(90deg, transparent, #7B3FE4, #00E0FF, transparent)",
          }}
        />
      </div>
    </section>
  );
}
