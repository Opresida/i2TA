const diffs = [
  {
    num: "01",
    title: "Tecnologia Aplicada",
    desc: "Forte atuação em tecnologia aplicada — não apenas pesquisa teórica, mas soluções que geram resultados reais e mensuráveis para a indústria.",
    color: "#7B3FE4",
  },
  {
    num: "02",
    title: "Integração com a Indústria",
    desc: "Integração direta com as demandas reais da indústria, especialmente do Polo Industrial de Manaus, garantindo relevância e aplicabilidade imediata.",
    color: "#00E0FF",
  },
  {
    num: "03",
    title: "Soluções Escaláveis",
    desc: "Foco em soluções escaláveis e comercializáveis, criando produtos tecnológicos que podem crescer com as demandas do mercado local, regional e nacional.",
    color: "#7B3FE4",
  },
  {
    num: "04",
    title: "Realidade Amazônica",
    desc: "Atuação voltada à realidade única da Amazônia, com soluções desenvolvidas para os desafios específicos da região — infraestrutura, distâncias e inclusão.",
    color: "#00FF9C",
  },
  {
    num: "05",
    title: "Inovação em Resultado",
    desc: "Capacidade de transformar inovação em resultado prático — do conceito ao produto final, conduzindo todo o ciclo de PD&I com excelência técnica.",
    color: "#FFC857",
  },
  {
    num: "06",
    title: "Inteligência Estratégica",
    desc: "Desenvolvimento de plataforma de análise de dados regionais capaz de identificar padrões, mapear tendências e apoiar decisões baseadas em evidências.",
    color: "#00E0FF",
  },
];

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="py-24 md:py-32 relative overflow-hidden border-y"
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
        <div className="text-center mb-16 reveal">
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

        <div className="space-y-0">
          {diffs.map((d, i) => (
            <div key={i}>
              <div
                className="diff-item group py-6 md:py-8 flex items-start gap-6 md:gap-10 cursor-default reveal"
                style={{ transitionDelay: `${i * 0.05}s` }}
              >
                <div className="flex-shrink-0 leading-none select-none diff-num" aria-hidden>
                  {d.num}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-center gap-3 mb-0">
                    <h3
                      className="font-display font-bold"
                      style={{ color: "#F5F7FA", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
                    >
                      {d.title}
                    </h3>
                    <div
                      className="flex-shrink-0 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}
                    />
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed mt-1"
                    style={{ color: "#8A94A6" }}
                  >
                    {d.desc}
                  </p>
                </div>

                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 mt-1"
                  style={{ border: `1px solid ${d.color}40`, color: d.color }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {i < diffs.length - 1 && (
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${d.color}30 20%, rgba(255,255,255,0.06) 50%, transparent 100%)`,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
