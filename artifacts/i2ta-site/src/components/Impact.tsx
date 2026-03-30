const impacts = [
  {
    title: "Fortalecimento Industrial",
    icon: "🏗️",
    color: "#7B3FE4",
    items: [
      "Otimização de processos por IA e automação",
      "Redução de custos operacionais",
      "Implementação de soluções no Polo Industrial de Manaus",
    ],
  },
  {
    title: "Desenvolvimento Tecnológico Regional",
    icon: "🌐",
    color: "#00E0FF",
    items: [
      "Soluções aplicadas à realidade amazônica",
      "Estímulo à inovação e pesquisa aplicada",
      "Consolidação de um ecossistema tecnológico integrado",
    ],
  },
  {
    title: "Formação de Capital Humano",
    icon: "🎓",
    color: "#00FF9C",
    items: [
      "Qualificação em IA e desenvolvimento de software",
      "Mão de obra alinhada à demanda da indústria",
      "Disseminação de conhecimento tecnológico",
    ],
  },
  {
    title: "Impacto Social",
    icon: "🤝",
    color: "#FFC857",
    items: [
      "Soluções digitais para saúde e inclusão",
      "Ampliação do acesso à tecnologia em regiões remotas",
      "Redução de desigualdades via inclusão digital",
    ],
  },
  {
    title: "Inteligência Estratégica Regional",
    icon: "🧩",
    color: "#7B3FE4",
    highlight: true,
    items: [
      "Plataforma de processamento e análise de dados regionais",
      "Banco de dados inteligente — padrões sociais, econômicos e tecnológicos",
      "Apoio à tomada de decisão baseada em dados",
      "Antecipação de necessidades e oportunidades de desenvolvimento",
    ],
  },
  {
    title: "Transferência de Tecnologia",
    icon: "🔁",
    color: "#FF4D6D",
    items: [
      "Transformação de pesquisa em soluções aplicáveis",
      "Transferência de tecnologia para empresas",
      "Criação de produtos tecnológicos escaláveis",
    ],
  },
];

export default function Impact() {
  return (
    <section
      id="impacto"
      className="py-20 md:py-28 relative"
      style={{ background: "#0A0F1C" }}
    >
      <div
        className="glow-blob"
        style={{ width: "500px", height: "500px", background: "#7B3FE4", top: "10%", left: "50%", opacity: 0.07 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Resultados Esperados</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#F5F7FA" }}
          >
            Impactos <span className="text-gradient">Transformadores</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            O i2TA tem como objetivo gerar impactos relevantes e mensuráveis no âmbito
            tecnológico, industrial, social e econômico da Amazônia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {impacts.map((impact, i) => (
            <div
              key={i}
              className="glass-card p-7 reveal group"
              style={{
                transitionDelay: `${(i % 3) * 0.1}s`,
                ...(impact.highlight
                  ? {
                      background: "linear-gradient(135deg, rgba(123,63,228,0.1) 0%, rgba(0,224,255,0.05) 100%)",
                      borderColor: "rgba(123,63,228,0.25)",
                    }
                  : {}),
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl">{impact.icon}</span>
                <h3
                  className="font-display text-base font-bold leading-tight"
                  style={{ color: "#F5F7FA" }}
                >
                  {impact.title}
                </h3>
              </div>
              <ul className="space-y-2.5">
                {impact.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-xs md:text-sm"
                    style={{ color: "#8A94A6" }}
                  >
                    <span
                      className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: impact.color, boxShadow: `0 0 5px ${impact.color}80` }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
