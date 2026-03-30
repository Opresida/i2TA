export default function MissionVisionValues() {
  const values = [
    { label: "Inovação com propósito", desc: "Desenvolvimento de soluções voltadas a problemas reais." },
    { label: "Aplicabilidade", desc: "Foco na execução e entrega de resultados concretos." },
    { label: "Ética e responsabilidade", desc: "Compromisso com uso responsável da tecnologia." },
    { label: "Integração", desc: "Conexão entre indústria, tecnologia e sociedade." },
    { label: "Excelência técnica", desc: "Busca contínua por qualidade e desempenho." },
    { label: "Impacto regional", desc: "Atuação voltada ao desenvolvimento sustentável da Amazônia." },
  ];

  return (
    <section
      id="cultura"
      className="py-20 md:py-28 relative border-y"
      style={{
        background: "linear-gradient(180deg, rgba(13,42,82,0.15) 0%, rgba(10,15,28,0) 100%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="bg-grid" style={{ opacity: 0.15 }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Cultura Organizacional</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#F5F7FA" }}
          >
            Missão, Visão &{" "}
            <span className="text-gradient">Valores</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          <div className="glass-card p-8 md:p-10 reveal reveal-delay-1 border-t-2" style={{ borderTopColor: "#7B3FE4" }}>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border"
              style={{ background: "rgba(123,63,228,0.1)", borderColor: "rgba(123,63,228,0.2)" }}
            >
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: "#F5F7FA" }}>
              Nossa Missão
            </h3>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8A94A6" }}>
              Transformar inteligência em soluções tecnológicas aplicadas, promovendo
              inovação, eficiência industrial e impacto social na Amazônia.
            </p>
          </div>

          <div className="glass-card p-8 md:p-10 reveal reveal-delay-2 border-t-2" style={{ borderTopColor: "#00E0FF" }}>
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border"
              style={{ background: "rgba(0,224,255,0.08)", borderColor: "rgba(0,224,255,0.2)" }}
            >
              <span className="text-2xl">🔭</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: "#F5F7FA" }}>
              Nossa Visão
            </h3>
            <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8A94A6" }}>
              Ser referência na região amazônica como instituto de excelência em
              tecnologia aplicada, reconhecido pela capacidade de desenvolver soluções
              inovadoras, escaláveis e alinhadas às demandas da indústria e da
              sociedade.
            </p>
          </div>

          <div
            className="glass-card p-8 md:p-10 reveal reveal-delay-3 md:col-span-2 lg:col-span-1 border-t-2"
            style={{ borderTopColor: "rgba(138,148,166,0.4)" }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 border"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}
            >
              <span className="text-2xl">⬡</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold mb-4" style={{ color: "#F5F7FA" }}>
              Core Values
            </h3>
            <ul className="space-y-3">
              {values.map((v, i) => (
                <li key={i} className="flex items-start gap-3 text-xs md:text-sm" style={{ color: "#8A94A6" }}>
                  <span style={{ color: "#00E0FF", marginTop: "2px", flexShrink: 0 }}>▸</span>
                  <span>
                    <strong style={{ color: "#F5F7FA", fontFamily: "Space Grotesk, sans-serif" }}>
                      {v.label}:
                    </strong>{" "}
                    {v.desc}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="glass-card p-8 reveal"
          style={{
            background: "linear-gradient(135deg, rgba(123,63,228,0.08) 0%, rgba(0,224,255,0.04) 100%)",
            borderColor: "rgba(123,63,228,0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center border"
              style={{ background: "rgba(123,63,228,0.15)", borderColor: "rgba(123,63,228,0.3)" }}
            >
              <span className="text-3xl">🌱</span>
            </div>
            <div>
              <h4 className="font-display text-lg font-bold mb-2" style={{ color: "#F5F7FA" }}>
                Alinhamento aos ODS — ONU
              </h4>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8A94A6" }}>
                O i2TA atua alinhado aos Objetivos de Desenvolvimento Sustentável da ONU.
                Destacam-se o{" "}
                <span style={{ color: "#00E0FF" }}>ODS 9 (Indústria, Inovação e Infraestrutura)</span>,{" "}
                <span style={{ color: "#00E0FF" }}>ODS 4 (Educação de Qualidade)</span>,{" "}
                <span style={{ color: "#00E0FF" }}>ODS 8 (Trabalho Decente)</span>,{" "}
                <span style={{ color: "#00E0FF" }}>ODS 10 (Redução das Desigualdades)</span> e{" "}
                <span style={{ color: "#00E0FF" }}>ODS 3 (Saúde e Bem-estar)</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
