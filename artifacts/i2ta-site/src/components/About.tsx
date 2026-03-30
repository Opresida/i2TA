import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: 20, suffix: "+", label: "Anos de P&D" },
  { value: 3, suffix: "", label: "Estados de atuação" },
  { value: 60, suffix: "+", label: "Parceiros estratégicos" },
  { value: 100, suffix: "%", label: "Foco em resultados" },
];

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
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
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  return (
    <section
      id="sobre"
      className="py-24 md:py-36 relative overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      <div className="noise-bg" />
      <div className="bg-grid" style={{ opacity: 0.15 }} />
      <div
        className="glow-blob"
        style={{ width: "600px", height: "600px", background: "#7B3FE4", top: "-10%", left: "-15%", opacity: 0.07 }}
      />
      <div
        className="glow-blob"
        style={{ width: "400px", height: "400px", background: "#00E0FF", bottom: "0%", right: "-10%", opacity: 0.05 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          <div className="reveal">
            <span className="section-tag">O Instituto</span>
            <h2
              className="font-display font-bold leading-tight tracking-tight mb-6"
              style={{ color: "#F5F7FA", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
            >
              Algoritmos gerando{" "}
              <span className="text-gradient-animated">Impacto Industrial.</span>
            </h2>
            <p className="text-base md:text-lg mb-5 leading-relaxed" style={{ color: "#8A94A6" }}>
              O <strong style={{ color: "#F5F7FA" }}>i2TA</strong> — Instituto de Inteligência e Tecnologia
              Aplicada da Amazônia — é uma Instituição Científica, Tecnológica e de Inovação (ICT),
              de direito privado e sem fins lucrativos, com atuação voltada ao desenvolvimento de
              soluções tecnológicas inovadoras.
            </p>
            <p className="text-base md:text-lg mb-12 leading-relaxed" style={{ color: "#8A94A6" }}>
              Estruturado para atuar de forma integrada nas três dimensões fundamentais —{" "}
              <strong style={{ color: "#F5F7FA" }}>Pesquisa</strong>,{" "}
              <strong style={{ color: "#F5F7FA" }}>Desenvolvimento</strong> e{" "}
              <strong style={{ color: "#F5F7FA" }}>Inovação</strong> — o Instituto promove a conexão
              entre indústria, tecnologia e desenvolvimento regional sustentável.
            </p>

            <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.05)", borderRadius: "16px", overflow: "hidden" }}>
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="p-6 flex flex-col gap-1"
                  style={{ background: "#0A0F1C" }}
                >
                  <div
                    className="stat-counter text-gradient-animated"
                    style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                  >
                    <AnimatedCounter target={m.value} suffix={m.suffix} />
                  </div>
                  <div className="text-xs font-medium tracking-wide uppercase" style={{ color: "#8A94A6" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgba(123,63,228,0.08) 0%, rgba(0,224,255,0.04) 100%)",
                border: "1px solid rgba(123,63,228,0.15)",
                minHeight: "480px",
              }}
            >
              <div className="scanline-overlay" />
              <div className="noise-bg" style={{ opacity: 0.05 }} />

              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="w-full h-full relative flex items-center justify-center">

                  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" style={{ opacity: 0.3 }}>
                    <defs>
                      <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#7B3FE4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7B3FE4" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(123,63,228,0.15)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(0,224,255,0.1)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="50" fill="url(#centerGlow)" />
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                      const rad = (deg * Math.PI) / 180;
                      const x1 = 200 + 50 * Math.cos(rad);
                      const y1 = 200 + 50 * Math.sin(rad);
                      const x2 = 200 + 150 * Math.cos(rad);
                      const y2 = 200 + 150 * Math.sin(rad);
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(123,63,228,0.15)" strokeWidth="1" />;
                    })}
                  </svg>

                  <div
                    className="anim-core relative z-10 flex items-center justify-center"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "18px",
                      border: "1px solid rgba(123,63,228,0.45)",
                      background: "rgba(10,15,28,0.92)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <img
                      src="https://i.imgur.com/bw6rmMQ.png"
                      style={{
                        height: "52px",
                        transform: "rotate(-45deg)",
                        filter: "drop-shadow(0 0 12px rgba(123,63,228,0.8))",
                      }}
                      alt="i2TA"
                    />
                  </div>

                  {[
                    { top: "12%", left: "10%", label: "PD&I", cls: "anim-node-1", color: "#00E0FF", size: 70 },
                    { top: "65%", left: "72%", label: "IoT", cls: "anim-node-2", color: "#00E0FF", size: 78 },
                    { top: "20%", left: "74%", label: "AI", cls: "anim-node-3", color: "#7B3FE4", size: 62 },
                    { top: "68%", left: "10%", label: "IA", cls: "anim-node-1", color: "#00FF9C", size: 60 },
                  ].map((node, i) => (
                    <div
                      key={i}
                      className={`absolute ${node.cls}`}
                      style={{
                        top: node.top, left: node.left,
                        width: node.size, height: node.size,
                        borderRadius: "12px",
                        border: `1px solid ${node.color}40`,
                        background: "rgba(10,15,28,0.88)",
                        backdropFilter: "blur(8px)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transform: "rotate(45deg)",
                        boxShadow: `0 0 15px ${node.color}20`,
                      }}
                    >
                      <span
                        className="font-display font-bold"
                        style={{ fontSize: "0.6rem", color: node.color, transform: "rotate(-45deg)" }}
                      >
                        {node.label}
                      </span>
                    </div>
                  ))}

                  <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }} viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                    <path d="M 68 80 L 200 200" stroke="#00E0FF" strokeWidth="1.5" fill="none" className="anim-flow-fast" strokeDasharray="6" />
                    <path d="M 320 88 L 200 200" stroke="#7B3FE4" strokeWidth="1" fill="none" className="anim-flow-slow" strokeDasharray="4 8" />
                    <path d="M 316 312 L 200 200" stroke="#00E0FF" strokeWidth="1.5" fill="none" className="anim-flow-fast" strokeDasharray="6" />
                    <path d="M 64 312 L 200 200" stroke="#00FF9C" strokeWidth="1" fill="none" className="anim-flow-slow" strokeDasharray="4 8" />
                  </svg>
                </div>
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{
                  background: "linear-gradient(0deg, rgba(10,15,28,0.95) 0%, transparent 100%)",
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {["Indústria 4.0", "IA & ML", "Cloud & IoT", "Amazônia Tech"].map((tag, i) => (
                    <span
                      key={i}
                      className="font-display text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        border: "1px solid rgba(0,224,255,0.2)",
                        background: "rgba(0,224,255,0.05)",
                        color: "#00E0FF",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl flex items-center justify-center border border-glow-pulse"
              style={{
                background: "linear-gradient(135deg, rgba(123,63,228,0.15), rgba(0,224,255,0.08))",
                borderColor: "rgba(0,224,255,0.2)",
                backdropFilter: "blur(10px)",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="8" stroke="#00E0FF" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="14" stroke="rgba(0,224,255,0.3)" strokeWidth="1" />
                <line x1="20" y1="6" x2="20" y2="2" stroke="#00E0FF" strokeWidth="1.5" />
                <line x1="20" y1="38" x2="20" y2="34" stroke="#00E0FF" strokeWidth="1.5" />
                <line x1="6" y1="20" x2="2" y2="20" stroke="#00E0FF" strokeWidth="1.5" />
                <line x1="38" y1="20" x2="34" y2="20" stroke="#00E0FF" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
