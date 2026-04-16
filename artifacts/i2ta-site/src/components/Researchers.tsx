import { useState } from "react";
import { ExternalLink } from "lucide-react";

interface Researcher {
  name: string;
  title: string;
  lattesUrl: string;
  lattesId: string;
  photo?: string;
  photoPosition?: string; // CSS object-position (ex: "center 20%")
  avatarColor: string;
  avatarBg: string;
  initials: string;
}

const researchers: Researcher[] = [
  {
    name: "Mansur Seffair Neto",
    title: "Presidente",
    lattesUrl: "http://lattes.cnpq.br/2353004755592011",
    lattesId: "2353004755592011",
    photo: "https://i.imgur.com/IPFUbT0.png",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "MS",
  },
  {
    name: "Leonardo Câmara",
    title: "Diretor Executivo",
    lattesUrl: "https://lattes.cnpq.br/1723768307022248",
    lattesId: "1723768307022248",
    photo: "https://i.imgur.com/KQfux2U.png",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "LC",
  },
  {
    name: "Bruna Ramos",
    title: "Analista Técnica Jurídica",
    lattesUrl: "http://lattes.cnpq.br/0849330836132226",
    lattesId: "0849330836132226",
    photo: "https://i.imgur.com/8apM09y.png",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "BR",
  },
  {
    name: "Romulo Teixeira Rodrigues",
    title: "Pesquisador Sênior",
    lattesUrl: "http://lattes.cnpq.br/8415278872311645",
    lattesId: "8415278872311645",
    photo: "https://i.imgur.com/xDHw6wv.png",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "RR",
  },
  {
    name: "Washington Henrique Alves Júnior",
    title: "Pesquisador Pleno",
    lattesUrl: "http://lattes.cnpq.br/3560615150646848",
    lattesId: "3560615150646848",
    photo: "https://i.imgur.com/cpMALjy.png",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "WA",
  },
  {
    name: "Tarcila Jessica Silva de Souza",
    title: "Desenvolvedora Júnior",
    lattesUrl: "http://lattes.cnpq.br/7158785339385237",
    lattesId: "7158785339385237",
    photo: "https://i.imgur.com/E0i69CU.png",
    avatarColor: "#ffffff",
    avatarBg: "#7B3FE4",
    initials: "TS",
  },
  {
    name: "Hélio Endrio Cardoso Rodrigues",
    title: "Desenvolvedor Júnior",
    lattesUrl: "http://lattes.cnpq.br/6010950520332268",
    lattesId: "6010950520332268",
    photo: "https://i.imgur.com/oVovnDz.png",
    avatarColor: "#0A0F1C",
    avatarBg: "#00E0FF",
    initials: "HR",
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
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: researcher.photo ? "#1a1f2e" : researcher.avatarBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: `3px solid ${hovered ? researcher.avatarBg : "rgba(255,255,255,0.15)"}`,
          boxShadow: hovered
            ? `0 0 0 4px rgba(255,255,255,0.06), 0 0 24px ${glowColor}`
            : `0 0 0 4px rgba(255,255,255,0.04)`,
          transition: "all 0.4s ease",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {researcher.photo ? (
          <img
            src={researcher.photo}
            alt={researcher.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        ) : (
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
        )}
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
        href={researcher.lattesUrl}
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
