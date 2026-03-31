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
              className="relative w-full overflow-hidden rounded-2xl group/container flex items-center justify-center"
              style={{
                minHeight: "450px",
                background: "#080B14",
                border: "1px solid #1A2235",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(123,63,228,0.12) 0%, rgba(10,15,28,0) 60%)",
                  opacity: 0.6,
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(rgba(0,224,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  opacity: 0.2,
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 overflow-hidden">
                <div className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] relative flex items-center justify-center" style={{ aspectRatio: "1/1" }}>

                  <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.35 }}>
                    <defs>
                      <radialGradient id="aboutNodeNetworkGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#7B3FE4" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#7B3FE4" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(123,63,228,0.15)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(0,224,255,0.1)" strokeWidth="1" />
                    <circle cx="200" cy="200" r="50" fill="url(#aboutNodeNetworkGlow)" />
                    <line x1="60" y1="60" x2="340" y2="340" stroke="rgba(123,63,228,0.15)" strokeWidth="1" />
                    <line x1="340" y1="60" x2="60" y2="340" stroke="rgba(123,63,228,0.15)" strokeWidth="1" />
                    <line x1="200" y1="20" x2="200" y2="380" stroke="rgba(123,63,228,0.1)" strokeWidth="1" />
                    <line x1="20" y1="200" x2="380" y2="200" stroke="rgba(123,63,228,0.1)" strokeWidth="1" />
                  </svg>

                  <div className="anim-core relative z-20 flex items-center justify-center cursor-pointer w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[130px] md:h-[130px] group">
                    <div className="absolute inset-0 rounded-[20px] overflow-hidden opacity-60 transition-opacity duration-500 group-hover:opacity-100">
                      <div className="about-core-spin" />
                    </div>
                    <div className="absolute inset-[2px] rounded-[18px] border border-[rgba(123,63,228,0.3)] bg-[rgba(10,15,28,0.92)] backdrop-blur-[12px] flex items-center justify-center z-10 transition-all duration-300 shadow-[inset_0_0_20px_rgba(123,63,228,0.2)] group-hover:bg-[#0B0F1C] group-hover:border-[rgba(0,224,255,0.5)]">
                      <div className="flex items-center justify-center -rotate-45 transition-transform duration-500 group-hover:scale-110">
                        <img
                          alt="i2TA"
                          src="https://i.imgur.com/bw6rmMQ.png"
                          style={{ filter: "drop-shadow(0px 0px 15px rgba(123,63,228,0.9))" }}
                          className="block h-[32px] sm:h-[42px] md:h-[56px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute z-30 flex items-center justify-center" style={{ top: "15%", left: "15%", width: 0, height: 0 }}>
                    <div className="anim-node-1">
                      <div className="group w-[45px] h-[45px] sm:w-[55px] sm:h-[55px] md:w-[70px] md:h-[70px] rounded-xl border border-[rgba(0,224,255,0.25)] bg-[rgba(10,15,28,0.88)] backdrop-blur-[8px] flex items-center justify-center rotate-45 cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,224,255,0.125)] hover:scale-125 hover:border-[#00E0FF] hover:shadow-[0_0_25px_rgba(0,224,255,0.6)] hover:bg-[#0B101D]">
                        <span className="font-display font-bold text-[0.45rem] sm:text-[0.5rem] md:text-[0.6rem] -rotate-45 text-[#00E0FF] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#00E0FF]">PD&I</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute z-30 flex items-center justify-center" style={{ top: "15%", left: "85%", width: 0, height: 0 }}>
                    <div className="anim-node-3">
                      <div className="group w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[62px] md:h-[62px] rounded-xl border border-[rgba(123,63,228,0.25)] bg-[rgba(10,15,28,0.88)] backdrop-blur-[8px] flex items-center justify-center rotate-45 cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(123,63,228,0.125)] hover:scale-125 hover:border-[#7B3FE4] hover:shadow-[0_0_25px_rgba(123,63,228,0.6)] hover:bg-[#0B101D]">
                        <span className="font-display font-bold text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] -rotate-45 text-[#7B3FE4] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#7B3FE4]">AI</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute z-30 flex items-center justify-center" style={{ top: "85%", left: "85%", width: 0, height: 0 }}>
                    <div className="anim-node-2">
                      <div className="group w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] md:w-[78px] md:h-[78px] rounded-xl border border-[rgba(0,224,255,0.25)] bg-[rgba(10,15,28,0.88)] backdrop-blur-[8px] flex items-center justify-center rotate-45 cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,224,255,0.125)] hover:scale-110 hover:border-[#00E0FF] hover:shadow-[0_0_25px_rgba(0,224,255,0.6)] hover:bg-[#0B101D]">
                        <span className="font-display font-bold text-[0.45rem] sm:text-[0.5rem] md:text-[0.6rem] -rotate-45 text-[#00E0FF] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#00E0FF]">IoT</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute z-30 flex items-center justify-center" style={{ top: "85%", left: "15%", width: 0, height: 0 }}>
                    <div className="anim-node-1" style={{ animationDelay: "-2s" }}>
                      <div className="group w-[38px] h-[38px] sm:w-[48px] sm:h-[48px] md:w-[60px] md:h-[60px] rounded-xl border border-[rgba(0,255,156,0.25)] bg-[rgba(10,15,28,0.88)] backdrop-blur-[8px] flex items-center justify-center rotate-45 cursor-pointer transition-all duration-300 shadow-[0_0_15px_rgba(0,255,156,0.125)] hover:scale-125 hover:border-[#00FF9C] hover:shadow-[0_0_25px_rgba(0,255,156,0.5)] hover:bg-[#0B101D]">
                        <span className="font-display font-bold text-[0.4rem] sm:text-[0.5rem] md:text-[0.6rem] -rotate-45 text-[#00FF9C] transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_#00FF9C]">IA</span>
                      </div>
                    </div>
                  </div>

                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet" style={{ opacity: 0.65 }}>
                    <path d="M 60 60 L 200 200" stroke="#00E0FF" strokeWidth="1.5" fill="none" className="anim-flow-fast" strokeDasharray="6" />
                    <path d="M 340 60 L 200 200" stroke="#7B3FE4" strokeWidth="1.5" fill="none" className="anim-flow-slow" strokeDasharray="4 8" />
                    <path d="M 340 340 L 200 200" stroke="#00E0FF" strokeWidth="1.5" fill="none" className="anim-flow-fast" strokeDasharray="6" />
                    <path d="M 60 340 L 200 200" stroke="#00FF9C" strokeWidth="1.5" fill="none" className="anim-flow-slow" strokeDasharray="4 8" />
                  </svg>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
