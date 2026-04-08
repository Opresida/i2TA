import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

/*
 * ── DADOS DE IMPACTO — DESCOMENTAR E ATUALIZAR QUANDO DISPONÍVEIS ──
 *
 * import { useEffect, useRef, useState } from "react";
 *
 * const stats = [
 *   { value: 500, suffix: "+", label: "Profissionais capacitados", color: "#7B3FE4", progress: 80, large: true },
 *   { value: 50, suffix: "+", label: "Soluções industriais entregues", color: "#00E0FF", progress: 65, large: true },
 *   { value: 3, suffix: "", label: "Estados de atuação", color: "#00FF9C", progress: 50 },
 *   { value: 100, suffix: "%", label: "Foco em impacto real", color: "#FFC857", progress: 100 },
 *   { value: 20, suffix: "+", label: "Projetos de P&D ativos", color: "#FF4D6D", progress: 55 },
 *   { value: 60, suffix: "+", label: "Parceiros estratégicos", color: "#7B3FE4", progress: 70 },
 * ];
 *
 * const impacts = [
 *   {
 *     title: "Fortalecimento Industrial",
 *     color: "#7B3FE4",
 *     icon: ( <svg>...</svg> ),
 *     items: ["Otimização de processos por IA", "Redução de custos operacionais", "Soluções no Polo Industrial de Manaus"],
 *   },
 *   {
 *     title: "Desenvolvimento Regional",
 *     color: "#00E0FF",
 *     icon: ( <svg>...</svg> ),
 *     items: ["Soluções para a realidade amazônica", "Estímulo à inovação local", "Ecossistema tecnológico integrado"],
 *   },
 *   {
 *     title: "Capital Humano",
 *     color: "#00FF9C",
 *     icon: ( <svg>...</svg> ),
 *     items: ["Qualificação em IA e software", "Alinhamento à demanda industrial", "Disseminação do conhecimento"],
 *   },
 *   {
 *     title: "Impacto Social",
 *     color: "#FFC857",
 *     icon: ( <svg>...</svg> ),
 *     items: ["Saúde digital e inclusão", "Acesso à tecnologia em regiões remotas", "Redução de desigualdades digitais"],
 *   },
 * ];
 *
 * Para reativar: descomentar os imports, os arrays stats/impacts,
 * os componentes AnimatedCounter e ProgressBar, e substituir o bloco
 * "em breve" pelo grid original (ver git history deste arquivo).
 *
 * function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
 *   const [count, setCount] = useState(0);
 *   const [started, setStarted] = useState(false);
 *   const ref = useRef<HTMLSpanElement>(null);
 *   useEffect(() => {
 *     const observer = new IntersectionObserver(
 *       ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
 *       { threshold: 0.5 }
 *     );
 *     if (ref.current) observer.observe(ref.current);
 *     return () => observer.disconnect();
 *   }, [started]);
 *   useEffect(() => {
 *     if (!started) return;
 *     let start = 0;
 *     const step = Math.ceil(target / (duration / 16));
 *     const timer = setInterval(() => {
 *       start += step;
 *       if (start >= target) { setCount(target); clearInterval(timer); }
 *       else { setCount(start); }
 *     }, 16);
 *     return () => clearInterval(timer);
 *   }, [started, target, duration]);
 *   return <span ref={ref}>{count}{suffix}</span>;
 * }
 *
 * function ProgressBar({ value, color }: { value: number; color: string }) {
 *   const [width, setWidth] = useState(0);
 *   const ref = useRef<HTMLDivElement>(null);
 *   useEffect(() => {
 *     const observer = new IntersectionObserver(
 *       ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setWidth(value), 200); } },
 *       { threshold: 0.5 }
 *     );
 *     if (ref.current) observer.observe(ref.current);
 *     return () => observer.disconnect();
 *   }, [value]);
 *   return (
 *     <div ref={ref} className="h-1 rounded-full w-full mt-2" style={{ background: "rgba(255,255,255,0.05)" }}>
 *       <div className="progress-bar-fill" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
 *     </div>
 *   );
 * }
 */

export default function Impact() {
  return (
    <section
      id="impacto"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      <div className="noise-bg" />
      <div
        className="glow-blob"
        style={{ width: "600px", height: "600px", background: "#7B3FE4", top: "10%", left: "50%", opacity: 0.06 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="section-tag">Resultados Esperados</span>
          <h2
            className="font-display font-bold tracking-tight"
            style={{ color: "#F5F7FA", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Impactos <span className="text-gradient">Transformadores</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            O i2TA tem como objetivo gerar impactos relevantes e mensuraveis no ambito tecnologico, industrial, social e economico da Amazonia.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 py-16"
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(123,63,228,0.15), rgba(0,224,255,0.15))" }}
          >
            <TrendingUp size={36} style={{ color: "#00E0FF" }} />
          </div>

          <p
            className="text-xl md:text-2xl font-semibold text-center"
            style={{
              background: "linear-gradient(135deg, #F5F7FA, #8A94A6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Em breve, nossos numeros de Impacto!
          </p>

          <p className="text-base text-center max-w-lg" style={{ color: "#8A94A6" }}>
            Estamos construindo resultados reais e mensuraveis.
            Em breve compartilharemos nossos indicadores de impacto na Amazonia.
          </p>

          <div
            className="mt-2 px-5 py-2.5 rounded-full border text-sm font-semibold"
            style={{
              borderColor: "rgba(0,224,255,0.25)",
              color: "#00E0FF",
              background: "rgba(0,224,255,0.06)",
            }}
          >
            Numeros em breve
          </div>
        </motion.div>
      </div>
    </section>
  );
}
