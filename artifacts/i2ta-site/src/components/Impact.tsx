import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Profissionais capacitados", color: "#7B3FE4", progress: 80, large: true },
  { value: 50, suffix: "+", label: "Soluções industriais entregues", color: "#00E0FF", progress: 65, large: true },
  { value: 3, suffix: "", label: "Estados de atuação", color: "#00FF9C", progress: 50 },
  { value: 100, suffix: "%", label: "Foco em impacto real", color: "#FFC857", progress: 100 },
  { value: 20, suffix: "+", label: "Projetos de P&D ativos", color: "#FF4D6D", progress: 55 },
  { value: 60, suffix: "+", label: "Parceiros estratégicos", color: "#7B3FE4", progress: 70 },
];

const impacts = [
  {
    title: "Fortalecimento Industrial",
    color: "#7B3FE4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="10" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9" y="6" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.3" />
        <rect x="15" y="2" width="4" height="17" rx="1" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    items: ["Otimização de processos por IA", "Redução de custos operacionais", "Soluções no Polo Industrial de Manaus"],
  },
  {
    title: "Desenvolvimento Regional",
    color: "#00E0FF",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.3" />
        <path d="M3 11H19M11 3C11 3 7 7 7 11C7 15 11 19 11 19M11 3C11 3 15 7 15 11C15 15 11 19 11 19" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    items: ["Soluções para a realidade amazônica", "Estímulo à inovação local", "Ecossistema tecnológico integrado"],
  },
  {
    title: "Capital Humano",
    color: "#00FF9C",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="7" r="4" stroke="currentColor" strokeWidth="1.3" />
        <path d="M4 19C4 15.686 7.134 13 11 13C14.866 13 18 15.686 18 19" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    items: ["Qualificação em IA e software", "Alinhamento à demanda industrial", "Disseminação do conhecimento"],
  },
  {
    title: "Impacto Social",
    color: "#FFC857",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 4L13.5 9H19L15 12.5L16.5 18L11 14.5L5.5 18L7 12.5L3 9H8.5L11 4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
    ),
    items: ["Saúde digital e inclusão", "Acesso à tecnologia em regiões remotas", "Redução de desigualdades digitais"],
  },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function ProgressBar({ value, color }: { value: number; color: string }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setWidth(value), 200); } },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="h-1 rounded-full w-full mt-2"
      style={{ background: "rgba(255,255,255,0.05)" }}
    >
      <div
        className="progress-bar-fill"
        style={{
          width: `${width}%`,
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
        }}
      />
    </div>
  );
}

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
            O i2TA tem como objetivo gerar impactos relevantes e mensuráveis no âmbito tecnológico, industrial, social e econômico da Amazônia.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-12 reveal">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`rounded-2xl p-5 flex flex-col ${s.large ? "lg:col-span-2 col-span-2" : "lg:col-span-1 col-span-1"}`}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${s.color}60, transparent)` }}
              />
              <div
                className="stat-counter text-gradient-animated mb-1"
                style={{ fontSize: s.large ? "clamp(2rem, 4vw, 3rem)" : "clamp(1.5rem, 3vw, 2.2rem)" }}
              >
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <div
                className="text-xs font-medium leading-tight"
                style={{ color: "#8A94A6" }}
              >
                {s.label}
              </div>
              <ProgressBar value={s.progress} color={s.color} />
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 reveal">
          {impacts.map((impact, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 group"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top left, ${impact.color}08, transparent 70%)` }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                style={{
                  background: `${impact.color}10`,
                  borderColor: `${impact.color}25`,
                  color: impact.color,
                }}
              >
                {impact.icon}
              </div>
              <h3
                className="font-display font-bold text-sm mb-3"
                style={{ color: "#F5F7FA" }}
              >
                {impact.title}
              </h3>
              <ul className="space-y-2">
                {impact.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs" style={{ color: "#8A94A6" }}>
                    <span
                      className="mt-1.5 flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ background: impact.color, boxShadow: `0 0 4px ${impact.color}80` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div
                className="mt-4 h-px"
                style={{ background: `linear-gradient(90deg, ${impact.color}40, transparent)`, transition: "opacity 0.3s ease" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
