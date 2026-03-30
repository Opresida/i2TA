const services = [
  {
    icon: "🔬",
    title: "Pesquisa e Desenvolvimento Tecnológico",
    abbr: "PD&I",
    color: "#7B3FE4",
    items: [
      "Pesquisa aplicada em IA, visão computacional e ciência de dados",
      "Desenvolvimento de software avançado para aplicações industriais",
      "Criação de sistemas inteligentes para automação de processos",
      "Soluções de saúde digital e integração IoT",
    ],
  },
  {
    icon: "💻",
    title: "Software & Sistemas Industriais",
    abbr: "Indústria 4.0",
    color: "#00E0FF",
    items: [
      "Sistemas inteligentes para linha de produção",
      "Plataformas de monitoramento e otimização produtiva",
      "Inspeção automatizada por visão computacional",
      "Integração com ERP, MES e sistemas industriais",
    ],
  },
  {
    icon: "🧠",
    title: "Inteligência Artificial Aplicada",
    abbr: "IA & ML",
    color: "#7B3FE4",
    items: [
      "Algoritmos de IA para análise preditiva",
      "Aplicações de IA em saúde, indústria e setor público",
      "Sistemas autônomos e agentes inteligentes",
      "Modelos de análise de dados em larga escala",
    ],
  },
  {
    icon: "🏥",
    title: "Saúde Digital & Impacto Social",
    abbr: "Saúde Tech",
    color: "#00FF9C",
    items: [
      "Soluções para diagnóstico remoto e telemedicina",
      "Sistemas digitais de apoio em regiões remotas",
      "IA aplicada para identificação de doenças",
      "Tecnologias de inclusão social e acesso à saúde",
    ],
  },
  {
    icon: "🚀",
    title: "Transferência de Tecnologia",
    abbr: "Inovação",
    color: "#FFC857",
    items: [
      "Transformação de protótipos em produtos tecnológicos",
      "Licenciamento de softwares e soluções digitais",
      "Apoio à implementação de inovação na indústria",
      "Publicação científica e patentes",
    ],
  },
  {
    icon: "📚",
    title: "Capacitação & Formação",
    abbr: "RH Tech",
    color: "#FF4D6D",
    items: [
      "Formação técnica em IA e desenvolvimento de software",
      "Programas focados à Indústria 4.0",
      "Gestão da inovação e transformação digital",
      "Workshops, seminários e eventos",
    ],
  },
];

export default function Services() {
  return (
    <section
      id="servicos"
      className="py-20 md:py-28 relative"
      style={{ background: "#0A0F1C" }}
    >
      <div className="glow-blob" style={{ width: "500px", height: "500px", background: "#7B3FE4", top: "20%", right: "-10%", opacity: 0.08 }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Linhas de Atuação</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "#F5F7FA" }}>
            Áreas de <span className="text-gradient">Atuação</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            Atuamos de forma integrada em seis frentes estratégicas, cobrindo todo o
            ciclo de inovação tecnológica aplicada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="glass-card p-7 reveal group cursor-default"
              style={{ transitionDelay: `${(i % 3) * 0.1}s` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${s.color}15`,
                    borderColor: `${s.color}30`,
                  }}
                >
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <div>
                  <span
                    className="font-display text-xs font-bold tracking-widest uppercase"
                    style={{ color: s.color }}
                  >
                    {s.abbr}
                  </span>
                  <h3
                    className="font-display text-sm md:text-base font-bold leading-tight"
                    style={{ color: "#F5F7FA" }}
                  >
                    {s.title}
                  </h3>
                </div>
              </div>
              <ul className="space-y-2.5">
                {s.items.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-xs md:text-sm"
                    style={{ color: "#8A94A6" }}
                  >
                    <span
                      className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: s.color, boxShadow: `0 0 5px ${s.color}` }}
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
