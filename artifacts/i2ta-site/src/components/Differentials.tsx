import { useRef, useEffect } from "react";

const diffs = [
  {
    num: "01",
    title: "Tecnologia Aplicada",
    desc: "Forte atuação em tecnologia aplicada — não apenas pesquisa teórica, mas soluções que geram resultados reais e mensuráveis para a indústria.",
    accent: "123, 63, 228",
  },
  {
    num: "02",
    title: "Integração com a Indústria",
    desc: "Integração direta com as demandas reais da indústria, especialmente do Polo Industrial de Manaus, garantindo relevância e aplicabilidade imediata.",
    accent: "0, 224, 255",
  },
  {
    num: "03",
    title: "Soluções Escaláveis",
    desc: "Foco em soluções escaláveis e comercializáveis, criando produtos tecnológicos que podem crescer com as demandas do mercado local, regional e nacional.",
    accent: "123, 63, 228",
  },
  {
    num: "04",
    title: "Realidade Amazônica",
    desc: "Atuação voltada à realidade única da Amazônia, com soluções desenvolvidas para os desafios específicos da região — infraestrutura, distâncias e inclusão.",
    accent: "0, 255, 156",
  },
  {
    num: "05",
    title: "Inovação em Resultado",
    desc: "Capacidade de transformar inovação em resultado prático — do conceito ao produto final, conduzindo todo o ciclo de PD&I com excelência técnica.",
    accent: "255, 200, 87",
  },
  {
    num: "06",
    title: "Inteligência Estratégica",
    desc: "Desenvolvimento de plataforma de análise de dados regionais capaz de identificar padrões, mapear tendências e apoiar decisões baseadas em evidências.",
    accent: "0, 224, 255",
  },
];

export default function Differentials() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const stickyTop = parseFloat(getComputedStyle(card).top) || 0;
        if (rect.top <= stickyTop + 1) {
          card.classList.add("is-stacked");
        } else {
          card.classList.remove("is-stacked");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="diferenciais"
      className="py-24 md:py-32 relative border-y"
      style={{
        background: "linear-gradient(180deg, rgba(13,42,82,0.08) 0%, #0A0F1C 70%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="noise-bg" />
      <div className="bg-grid" style={{ opacity: 0.1 }} />
      <div
        className="glow-blob"
        style={{ width: "600px", height: "600px", background: "#00E0FF", bottom: "-20%", left: "-10%", opacity: 0.04 }}
      />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="section-tag">Por que o i2TA</span>
          <h2
            className="font-display font-bold tracking-tight"
            style={{ color: "#F5F7FA", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Nosso{" "}
            <span className="text-gradient">Diferencial Estratégico</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            O que nos torna únicos no ecossistema de inovação da Amazônia.
          </p>
        </div>

        <div className="stack-cards-wrapper">
          {diffs.map((d, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="stack-card diff-item"
              style={
                {
                  "--idx": i,
                  "--accent": d.accent,
                } as React.CSSProperties
              }
            >
              <div className="flex items-start gap-6 md:gap-10">
                <div className="flex-shrink-0 leading-none select-none diff-num" aria-hidden>
                  {d.num}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3
                      className="font-display font-bold"
                      style={{ color: "#F5F7FA", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                    >
                      {d.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed"
                    style={{ color: "#8A94A6" }}
                  >
                    {d.desc}
                  </p>
                </div>

                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1"
                  style={{
                    border: `1px solid rgba(${d.accent}, 0.3)`,
                    color: `rgb(${d.accent})`,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2 7H12M8 3L12 7L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
