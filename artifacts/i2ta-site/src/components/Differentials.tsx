const diffs = [
  {
    icon: "⚡",
    title: "Tecnologia Aplicada",
    desc: "Forte atuação em tecnologia aplicada — não apenas pesquisa teórica, mas soluções que geram resultados reais e mensuráveis para a indústria.",
    color: "#7B3FE4",
  },
  {
    icon: "🏭",
    title: "Integração com a Indústria",
    desc: "Integração direta com as demandas reais da indústria, especialmente do Polo Industrial de Manaus, garantindo relevância e aplicabilidade imediata.",
    color: "#00E0FF",
  },
  {
    icon: "📈",
    title: "Soluções Escaláveis",
    desc: "Foco em soluções escaláveis e comercializáveis, criando produtos tecnológicos que podem crescer com as demandas do mercado local, regional e nacional.",
    color: "#7B3FE4",
  },
  {
    icon: "🌿",
    title: "Realidade Amazônica",
    desc: "Atuação voltada à realidade única da Amazônia, com soluções desenvolvidas para os desafios específicos da região — infraestrutura, distâncias e inclusão.",
    color: "#00FF9C",
  },
  {
    icon: "🔄",
    title: "Inovação em Resultado",
    desc: "Capacidade de transformar inovação em resultado prático — do conceito ao produto final, conduzindo todo o ciclo de PD&I com excelência técnica.",
    color: "#FFC857",
  },
  {
    icon: "📊",
    title: "Inteligência Estratégica",
    desc: "Desenvolvimento de plataforma de análise de dados regionais capaz de identificar padrões, mapear tendências e apoiar decisões baseadas em evidências.",
    color: "#00E0FF",
  },
];

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="py-20 md:py-28 relative border-y"
      style={{
        background: "linear-gradient(180deg, rgba(13,42,82,0.1) 0%, rgba(10,15,28,0) 100%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="bg-grid" style={{ opacity: 0.12 }} />
      <div
        className="glow-blob"
        style={{ width: "600px", height: "600px", background: "#00E0FF", bottom: "-20%", left: "-10%", opacity: 0.06 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Por que o i2TA</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#F5F7FA" }}
          >
            Nosso{" "}
            <span className="text-gradient">Diferencial Estratégico</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            O que nos torna únicos no ecossistema de inovação da Amazônia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {diffs.map((d, i) => (
            <div
              key={i}
              className="glass-card p-7 reveal group"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 border transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${d.color}12`,
                  borderColor: `${d.color}28`,
                }}
              >
                <span className="text-3xl">{d.icon}</span>
              </div>
              <h3
                className="font-display text-lg font-bold mb-3"
                style={{ color: "#F5F7FA" }}
              >
                {d.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8A94A6" }}>
                {d.desc}
              </p>
              <div
                className="mt-5 w-10 h-0.5 rounded-full transition-all duration-300 group-hover:w-20"
                style={{ background: `linear-gradient(90deg, ${d.color}, transparent)` }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
