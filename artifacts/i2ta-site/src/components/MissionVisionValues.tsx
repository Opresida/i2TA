import { useState } from "react";

const tabs = [
  {
    id: "missao",
    label: "Missão",
    color: "#7B3FE4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="14" y1="3" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
        <line x1="14" y1="21" x2="14" y2="25" stroke="currentColor" strokeWidth="1.5" />
        <line x1="3" y1="14" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
        <line x1="21" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    heading: "Nossa Missão",
    text: "Transformar inteligência em soluções tecnológicas aplicadas, promovendo inovação, eficiência industrial e impacto social na Amazônia.",
    detail: "Atuamos na interseção entre pesquisa de ponta e demanda industrial real, convertendo conhecimento científico em produtos e sistemas que resolvem desafios concretos — com foco em agilidade, qualidade e resultados mensuráveis.",
  },
  {
    id: "visao",
    label: "Visão",
    color: "#00E0FF",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14C4 14 8 6 14 6C20 6 24 14 24 14C24 14 20 22 14 22C8 22 4 14 4 14Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="3" fill="currentColor" />
        <circle cx="14" cy="14" r="6" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
    heading: "Nossa Visão",
    text: "Ser referência na região amazônica como instituto de excelência em tecnologia aplicada, reconhecido pela capacidade de desenvolver soluções inovadoras, escaláveis e alinhadas às demandas da indústria e da sociedade.",
    detail: "Buscamos construir uma presença sólida e duradoura no ecossistema de inovação, tornando-nos o principal ponto de conexão entre ciência, indústria e sociedade na Amazônia.",
  },
  {
    id: "valores",
    label: "Valores",
    color: "#00FF9C",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L17.5 10.5L25 11.5L19.5 17L21 24.5L14 21L7 24.5L8.5 17L3 11.5L10.5 10.5L14 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    heading: "Nossos Valores",
    text: "Inovação com propósito, aplicabilidade, ética e responsabilidade, integração, excelência técnica e impacto regional.",
    detail: "",
    values: [
      { label: "Inovação com propósito", desc: "Soluções voltadas a problemas reais." },
      { label: "Aplicabilidade", desc: "Foco em execução e resultados concretos." },
      { label: "Ética e responsabilidade", desc: "Uso responsável da tecnologia." },
      { label: "Integração", desc: "Conexão entre indústria, tecnologia e sociedade." },
      { label: "Excelência técnica", desc: "Busca contínua por qualidade." },
      { label: "Impacto regional", desc: "Desenvolvimento sustentável da Amazônia." },
    ],
  },
];

const odsBadges = [
  { num: "ODS 9", label: "Indústria & Inovação" },
  { num: "ODS 4", label: "Educação de Qualidade" },
  { num: "ODS 8", label: "Trabalho Decente" },
  { num: "ODS 10", label: "Redução das Desigualdades" },
  { num: "ODS 3", label: "Saúde e Bem-estar" },
];

export default function MissionVisionValues() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section
      id="cultura"
      className="py-24 md:py-32 relative overflow-hidden border-y"
      style={{
        background: "linear-gradient(180deg, rgba(13,42,82,0.12) 0%, #0A0F1C 60%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="noise-bg" />
      <div className="bg-grid" style={{ opacity: 0.12 }} />
      <div
        className="glow-blob"
        style={{ width: "500px", height: "500px", background: "#7B3FE4", top: "20%", right: "-15%", opacity: 0.06 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="section-tag">Cultura Organizacional</span>
          <h2
            className="font-display font-bold tracking-tight"
            style={{ color: "#F5F7FA", fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
          >
            Missão, Visão &{" "}
            <span className="text-gradient">Valores</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-0 reveal" style={{ border: "1px solid rgba(255,255,255,0.05)", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ background: "rgba(255,255,255,0.01)", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
            {tabs.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setActive(i)}
                className={`mvv-tab w-full text-left p-6 flex items-center gap-4 transition-all ${active === i ? "active" : ""}`}
                style={{
                  "--tab-color": t.color,
                  background: active === i ? `${t.color}08` : "transparent",
                  borderBottom: i < tabs.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                } as React.CSSProperties}
              >
                <span
                  style={{
                    color: active === i ? t.color : "#8A94A6",
                    transition: "color 0.3s ease",
                    flexShrink: 0,
                  }}
                >
                  {t.icon}
                </span>
                <div>
                  <div
                    className="font-display font-bold text-sm mb-0.5"
                    style={{ color: active === i ? "#F5F7FA" : "#8A94A6", transition: "color 0.3s ease" }}
                  >
                    {t.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: active === i ? t.color : "rgba(138,148,166,0.5)", transition: "color 0.3s ease" }}
                  >
                    {active === i ? "Selecionado" : "Ver mais"}
                  </div>
                </div>
                {active === i && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: t.color, boxShadow: `0 0 8px ${t.color}` }}
                  />
                )}
              </button>
            ))}
          </div>

          <div key={tab.id} className="lg:col-span-2 p-8 md:p-12 mvv-content-panel">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border"
              style={{
                background: `${tab.color}12`,
                borderColor: `${tab.color}25`,
                color: tab.color,
                borderLeft: `3px solid ${tab.color}`,
              }}
            >
              {tab.icon}
            </div>

            <h3
              className="font-display font-bold mb-4"
              style={{ color: "#F5F7FA", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {tab.heading}
            </h3>

            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "#C0C8D8" }}
            >
              {tab.text}
            </p>

            {tab.detail && (
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#8A94A6" }}>
                {tab.detail}
              </p>
            )}

            {tab.values && (
              <div className="grid sm:grid-cols-2 gap-3 mt-2">
                {tab.values.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-3 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${tab.color}15`, color: tab.color, fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "#F5F7FA", fontFamily: "Space Grotesk, sans-serif" }}>
                        {v.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "#8A94A6" }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div
              className="mt-6 h-0.5 rounded-full"
              style={{ background: `linear-gradient(90deg, ${tab.color}60, transparent)` }}
            />
          </div>
        </div>

        <div
          className="mt-8 rounded-2xl p-8 reveal"
          style={{
            background: "linear-gradient(135deg, rgba(123,63,228,0.06) 0%, rgba(0,224,255,0.03) 50%, rgba(0,255,156,0.03) 100%)",
            border: "1px solid rgba(0,224,255,0.12)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(90deg, rgba(123,63,228,0.03) 0%, rgba(0,224,255,0.03) 50%, rgba(123,63,228,0.03) 100%)",
              backgroundSize: "200% 100%",
              animation: "gradient-shift 6s linear infinite",
            }}
          />
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-shrink-0">
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="4" y="4" width="40" height="40" rx="10" stroke="#00E0FF" strokeWidth="1.5" strokeOpacity="0.4" />
                  <path d="M14 34L20 20L24 28L28 22L34 34" stroke="#00E0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="14" cy="14" r="3" fill="#00E0FF" fillOpacity="0.5" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base font-bold mb-3" style={{ color: "#F5F7FA" }}>
                  Alinhamento aos ODS — ONU
                </h4>
                <div className="flex flex-wrap gap-2">
                  {odsBadges.map((ods, i) => (
                    <span key={i} className="ods-badge">
                      <span
                        className="font-bold"
                        style={{ color: "#7B3FE4" }}
                      >
                        {ods.num}
                      </span>
                      <span style={{ color: "#8A94A6" }}>{ods.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
