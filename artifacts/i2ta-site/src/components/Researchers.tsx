import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Researcher {
  name: string;
  title: string;
  area: string;
  lattesId: string;
  avatarColor: string;
  avatarBg: string;
  initials: string;
}

const researchers: Researcher[] = [
  {
    name: "Dra. Ana Beatriz Figueiredo",
    title: "Pesquisadora Sênior em Inteligência Artificial",
    area: "Aprendizado de Máquina & Visão Computacional",
    lattesId: "1234567890123456",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "AB",
  },
  {
    name: "Dr. Marcos Antônio Leal",
    title: "Professor Associado e Pesquisador",
    area: "Processamento de Linguagem Natural",
    lattesId: "2345678901234567",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "MA",
  },
  {
    name: "Dra. Juliana Mendes Costa",
    title: "Pesquisadora em Ciência de Dados",
    area: "Análise de Dados Regionais & Bioinformática",
    lattesId: "3456789012345678",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "JM",
  },
  {
    name: "Dr. Rafael Souza Nogueira",
    title: "Especialista em Sistemas Embarcados",
    area: "IoT & Computação de Borda para Amazônia",
    lattesId: "4567890123456789",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "RS",
  },
  {
    name: "Profa. Dra. Lúcia Pereira Ramos",
    title: "Coordenadora de Pesquisa em IA Sustentável",
    area: "Tecnologia Verde & Eficiência Energética",
    lattesId: "5678901234567890",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "LP",
  },
  {
    name: "Dr. Eduardo Tavares Filho",
    title: "Pesquisador em Segurança Digital",
    area: "Cibersegurança & Privacidade de Dados",
    lattesId: "6789012345678901",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "ET",
  },
  {
    name: "Dra. Camila Braga Viana",
    title: "Pesquisadora em Saúde Digital",
    area: "IA Aplicada à Saúde da População Amazônica",
    lattesId: "7890123456789012",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "CB",
  },
  {
    name: "Dr. Henrique Oliveira Matos",
    title: "Pesquisador em Computação Quântica",
    area: "Algoritmos Quânticos & Otimização Combinatória",
    lattesId: "8901234567890123",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "HO",
  },
];

function ResearcherCard({ researcher }: { researcher: Researcher }) {
  const [hovered, setHovered] = useState(false);

  const isGlowCyan = researcher.avatarBg === "#00E0FF";
  const glowColor = isGlowCyan
    ? "rgba(0,224,255,0.3)"
    : "rgba(123,63,228,0.3)";
  const borderColor = isGlowCyan
    ? "rgba(0,224,255,0.35)"
    : "rgba(123,63,228,0.35)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "260px",
        flexShrink: 0,
        background: hovered
          ? "linear-gradient(145deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.018) 100%)"
          : "linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.008) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? borderColor : "rgba(255,255,255,0.06)"}`,
        borderRadius: "20px",
        padding: "1.75rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.85rem",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 24px 55px rgba(0,0,0,0.6), 0 0 40px ${glowColor}`
          : "0 8px 32px rgba(0,0,0,0.35)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "default",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: researcher.avatarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid ${hovered ? researcher.avatarBg : "rgba(255,255,255,0.15)"}`,
          boxShadow: hovered
            ? `0 0 0 4px rgba(255,255,255,0.06), 0 0 24px ${glowColor}`
            : `0 0 0 4px rgba(255,255,255,0.04)`,
          transition: "all 0.4s ease",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.4rem",
            color: researcher.avatarColor,
            letterSpacing: "0.04em",
          }}
        >
          {researcher.initials}
        </span>
      </div>

      <div style={{ textAlign: "center", flex: 1 }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "#F5F7FA",
            lineHeight: 1.3,
            marginBottom: "0.35rem",
          }}
        >
          {researcher.name}
        </h3>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            color: isGlowCyan ? "#00E0FF" : "#a78bfa",
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: "0.5rem",
          }}
        >
          {researcher.title}
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.72rem",
            color: "#8A94A6",
            lineHeight: 1.45,
            marginBottom: "0.85rem",
          }}
        >
          {researcher.area}
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "6px",
            padding: "0.25rem 0.6rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.65rem",
              color: "#8A94A6",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            ID Lattes:
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              color: "#F5F7FA",
              letterSpacing: "0.03em",
              fontWeight: 500,
            }}
          >
            {researcher.lattesId}
          </span>
        </div>
      </div>

      <a
        href={`http://lattes.cnpq.br/${researcher.lattesId}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.5rem 1.1rem",
          borderRadius: "8px",
          background: "linear-gradient(135deg, #7B3FE4, #00E0FF)",
          color: "#fff",
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: "0.75rem",
          textDecoration: "none",
          boxShadow: "0 0 16px rgba(123,63,228,0.3)",
          transition: "all 0.3s ease",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 28px rgba(0,224,255,0.4)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 0 16px rgba(123,63,228,0.3)";
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        }}
      >
        <ExternalLink size={13} />
        Acessar Curriculum
      </a>
    </div>
  );
}

export default function Researchers() {
  const [paused, setPaused] = useState(false);

  const allCards = [...researchers, ...researchers];

  return (
    <section
      id="pesquisadores"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--i2ta-dark)" }}
    >
      <div
        className="glow-blob"
        style={{
          width: "650px",
          height: "650px",
          background: "var(--i2ta-purple)",
          top: "5%",
          right: "-12%",
          opacity: 0.06,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--i2ta-cyan)",
          bottom: "5%",
          left: "-8%",
          opacity: 0.05,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-14">
        <div className="text-center reveal">
          <span className="section-tag">Capital Humano & Ciência</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--i2ta-white)" }}
          >
            Nossos <span className="text-gradient">Pesquisadores</span>
          </h2>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--i2ta-gray)" }}
          >
            Conheça os pesquisadores que impulsionam a inovação tecnológica e
            científica do i2TA, transformando o conhecimento amazônico em
            soluções de impacto global.
          </p>
        </div>
      </div>

      <div
        style={{ position: "relative", width: "100%", overflow: "hidden", padding: "1.5rem 0" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "200px",
            height: "100%",
            background: "linear-gradient(to right, #0A0F1C 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "200px",
            height: "100%",
            background: "linear-gradient(to left, #0A0F1C 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            gap: "1.25rem",
            animation: "researchers-scroll 40s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
            padding: "0.5rem 1rem",
          }}
        >
          {allCards.map((researcher, i) => (
            <ResearcherCard
              key={`${researcher.lattesId}-${i}`}
              researcher={researcher}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
