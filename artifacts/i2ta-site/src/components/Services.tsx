import { useState, useEffect, useRef } from "react";

const services = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M18 2V8M18 28V34M2 18H8M28 18H34" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7.5 7.5L11.6 11.6M24.4 24.4L28.5 28.5M7.5 28.5L11.6 24.4M24.4 11.6L28.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Pesquisa e Desenvolvimento Tecnológico",
    abbr: "PD&I",
    color: "#7B3FE4",
    items: [
      "Pesquisa aplicada em IA, visão computacional e ciência de dados",
      "Desenvolvimento de software avançado para aplicações industriais",
      "Criação de sistemas inteligentes para automação de processos",
      "Soluções de saúde digital e integração IoT",
    ],
    desc: "Conduzimos pesquisa de ponta aplicada diretamente à realidade industrial, transformando descobertas científicas em sistemas inteligentes e escaláveis.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="4" y="8" width="28" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 14H32" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="11" r="1" fill="currentColor" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
        <path d="M12 20L16 24L24 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Software & Sistemas Industriais",
    abbr: "Indústria 4.0",
    color: "#00E0FF",
    items: [
      "Sistemas inteligentes para linha de produção",
      "Plataformas de monitoramento e otimização produtiva",
      "Inspeção automatizada por visão computacional",
      "Integração com ERP, MES e sistemas industriais",
    ],
    desc: "Desenvolvemos plataformas digitais e sistemas embarcados que elevam a eficiência operacional, conectando chão de fábrica à inteligência de dados.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M8 26C8 26 10 20 18 20C26 20 28 26 28 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="13" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 10L12 6M22 10L24 6M12 6C12 6 8 4 6 7M24 6C24 6 28 4 30 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Inteligência Artificial Aplicada",
    abbr: "IA & ML",
    color: "#7B3FE4",
    items: [
      "Algoritmos de IA para análise preditiva",
      "Aplicações de IA em saúde, indústria e setor público",
      "Sistemas autônomos e agentes inteligentes",
      "Modelos de análise de dados em larga escala",
    ],
    desc: "Projetamos e implantamos modelos de machine learning e sistemas de IA que aprendem, se adaptam e geram valor mensurável em ambientes reais.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M18 6L30 12V24L18 30L6 24V12L18 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M18 6V30M6 12L30 24M30 12L6 24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
    title: "Saúde Digital & Impacto Social",
    abbr: "Saúde Tech",
    color: "#00FF9C",
    items: [
      "Soluções para diagnóstico remoto e telemedicina",
      "Sistemas digitais de apoio em regiões remotas",
      "IA aplicada para identificação de doenças",
      "Tecnologias de inclusão social e acesso à saúde",
    ],
    desc: "Aplicamos tecnologia para ampliar o acesso a serviços de saúde na Amazônia, usando IA e plataformas digitais para alcançar populações remotas.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path d="M6 28L14 20L20 26L28 14L32 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 8H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 13H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Transferência de Tecnologia",
    abbr: "Inovação",
    color: "#FFC857",
    items: [
      "Transformação de protótipos em produtos tecnológicos",
      "Licenciamento de softwares e soluções digitais",
      "Apoio à implementação de inovação na indústria",
      "Publicação científica e patentes",
    ],
    desc: "Fazemos a ponte entre o laboratório e o mercado — transformando protótipos em produtos comercializáveis e conectando pesquisa à indústria.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect x="6" y="6" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 30H24M18 24V30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 13H25M11 17H20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Capacitação & Formação",
    abbr: "RH Tech",
    color: "#FF4D6D",
    items: [
      "Formação técnica em IA e desenvolvimento de software",
      "Programas focados à Indústria 4.0",
      "Gestão da inovação e transformação digital",
      "Workshops, seminários e eventos",
    ],
    desc: "Formamos profissionais alinhados às demandas do mercado tecnológico, com programas práticos e imersivos em IA, automação e inovação aplicada.",
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const [panelKey, setPanelKey] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const activeRef = useRef(0);
  const s = services[active >= 0 ? active : 0];

  const resetInterval = (fromIndex: number) => {
    activeRef.current = fromIndex;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      activeRef.current = (activeRef.current + 1) % services.length;
      setActive(activeRef.current);
      setPanelKey((k) => k + 1);
    }, 4000);
  };

  useEffect(() => {
    resetInterval(0);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    if (i >= 0) {
      setPanelKey((k) => k + 1);
      resetInterval(i);
    }
  };

  return (
    <section
      id="servicos"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      <div className="noise-bg" />
      <div
        className="glow-blob"
        style={{ width: "500px", height: "500px", background: "#7B3FE4", top: "20%", right: "-10%", opacity: 0.07 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="section-tag">Linhas de Atuação</span>
          <h2
            className="font-display font-bold tracking-tight"
            style={{ color: "#F5F7FA", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Áreas de <span className="text-gradient">Atuação</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            Atuamos de forma integrada em seis frentes estratégicas, cobrindo todo o ciclo de inovação tecnológica aplicada.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-5 gap-0 reveal" style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", overflow: "hidden", minHeight: "480px" }}>
          <div className="md:col-span-2" style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}>
            {services.map((sv, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className="service-item w-full text-left p-5 flex items-center gap-4 relative"
                style={{
                  background: active === i ? `${sv.color}08` : "transparent",
                  borderBottom: i < services.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span
                  className="flex-shrink-0 transition-all duration-300"
                  style={{ color: active === i ? sv.color : "#8A94A6" }}
                >
                  {sv.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div
                    className="font-display font-bold text-xs tracking-widest uppercase mb-0.5"
                    style={{ color: active === i ? sv.color : "#8A94A6", transition: "color 0.3s ease" }}
                  >
                    {sv.abbr}
                  </div>
                  <div
                    className="font-display font-semibold text-sm leading-tight"
                    style={{ color: active === i ? "#F5F7FA" : "#8A94A6", transition: "color 0.3s ease" }}
                  >
                    {sv.title}
                  </div>
                </div>
                {active === i && (
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                    style={{ background: sv.color, boxShadow: `0 0 8px ${sv.color}` }}
                  />
                )}
                <div
                  className="service-underline"
                  style={{ background: `linear-gradient(90deg, ${sv.color}, transparent)` }}
                />
              </button>
            ))}
          </div>

          <div key={panelKey} className="md:col-span-3 p-8 md:p-10 panel-enter flex flex-col justify-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border"
              style={{
                background: `${s.color}12`,
                borderColor: `${s.color}25`,
                color: s.color,
              }}
            >
              {s.icon}
            </div>

            <div
              className="inline-flex font-display text-xs font-bold tracking-widest uppercase mb-2 px-3 py-1 rounded-full"
              style={{ background: `${s.color}15`, color: s.color, width: "fit-content" }}
            >
              {s.abbr}
            </div>

            <h3
              className="font-display font-bold mb-3"
              style={{ color: "#F5F7FA", fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)" }}
            >
              {s.title}
            </h3>

            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: "#8A94A6" }}>
              {s.desc}
            </p>

            <div className="space-y-2.5">
              {s.items.map((item, j) => (
                <div key={j} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                    style={{ background: s.color, boxShadow: `0 0 6px ${s.color}80` }}
                  />
                  <span className="text-sm" style={{ color: "#C0C8D8" }}>{item}</span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 h-px"
              style={{ background: `linear-gradient(90deg, ${s.color}50, transparent)` }}
            />
          </div>
        </div>

        <div className="md:hidden space-y-3 reveal">
          {services.map((sv, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                onClick={() => handleSelect(active === i ? -1 : i)}
                className="w-full flex items-center gap-4 p-5 text-left"
                style={{ background: active === i ? `${sv.color}08` : "rgba(255,255,255,0.01)" }}
              >
                <span style={{ color: active === i ? sv.color : "#8A94A6", flexShrink: 0 }}>{sv.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-display text-xs font-bold tracking-widest uppercase"
                    style={{ color: active === i ? sv.color : "#8A94A6" }}
                  >
                    {sv.abbr}
                  </div>
                  <div className="font-display text-sm font-semibold" style={{ color: active === i ? "#F5F7FA" : "#8A94A6" }}>
                    {sv.title}
                  </div>
                </div>
                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  style={{ color: sv.color, transform: active === i ? "rotate(180deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0 }}
                >
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {active === i && (
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "#8A94A6" }}>{sv.desc}</p>
                  <ul className="space-y-2">
                    {sv.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm" style={{ color: "#C0C8D8" }}>
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: sv.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
