import { useRef, useState } from "react";

const partners = [
  { name: "AmazonTech", abbr: "AT", color: "#00E0FF" },
  { name: "PIM Digital", abbr: "PD", color: "#7B3FE4" },
  { name: "GovAM Innova", abbr: "GI", color: "#00E0FF" },
  { name: "TecnoAmazon", abbr: "TA", color: "#7B3FE4" },
  { name: "BioSistemas", abbr: "BS", color: "#00E0FF" },
  { name: "DataRio Labs", abbr: "DR", color: "#7B3FE4" },
  { name: "Verde Capital", abbr: "VC", color: "#00E0FF" },
  { name: "AquaNet AM", abbr: "AN", color: "#7B3FE4" },
  { name: "SaúdeTec", abbr: "ST", color: "#00E0FF" },
  { name: "Polo Manaus", abbr: "PM", color: "#7B3FE4" },
];

interface PartnerLogoProps {
  name: string;
  abbr: string;
  color: string;
}

function PartnerLogo({ name, abbr, color }: PartnerLogoProps) {
  const [hovered, setHovered] = useState(false);

  const glowColor = color === "#00E0FF"
    ? "rgba(0,224,255,0.55)"
    : "rgba(123,63,228,0.55)";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.45rem",
        padding: "0.75rem 2rem",
        cursor: "default",
        userSelect: "none",
        transform: hovered ? "scale(1.12)" : "scale(1)",
        transition: "transform 0.35s cubic-bezier(0.175,0.885,0.32,1.275), filter 0.35s ease",
        filter: hovered
          ? `drop-shadow(0 0 8px ${glowColor}) drop-shadow(0 0 20px ${glowColor})`
          : "none",
      }}
    >
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: "1.65rem",
          letterSpacing: "0.06em",
          color: hovered ? color : "rgba(255,255,255,0.45)",
          transition: "color 0.35s ease",
          lineHeight: 1,
        }}
      >
        {abbr}
      </span>
      <span
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: "0.65rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? color : "rgba(255,255,255,0.22)",
          transition: "color 0.35s ease",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const allLogos = [...partners, ...partners];

  return (
    <section
      id="parceiros"
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "var(--i2ta-dark)" }}
    >
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--i2ta-purple)",
          top: "10%",
          left: "-8%",
          opacity: 0.05,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "400px",
          height: "400px",
          background: "var(--i2ta-cyan)",
          bottom: "10%",
          right: "-6%",
          opacity: 0.05,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Ecossistema de Inovação</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--i2ta-white)" }}
          >
            Nossos <span className="text-gradient">Parceiros</span>
          </h2>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--i2ta-gray)" }}
          >
            Empresas, instituições e entidades que compartilham nossa missão de transformar a Amazônia
            por meio da tecnologia e da inovação.
          </p>
        </div>
      </div>

      <div
        className="partners-carousel-wrapper"
        style={{ position: "relative", width: "100%", overflow: "hidden", padding: "1rem 0" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="partners-fade-left"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "160px",
            height: "100%",
            background: "linear-gradient(to right, #0A0F1C 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        <div
          className="partners-fade-right"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "160px",
            height: "100%",
            background: "linear-gradient(to left, #0A0F1C 0%, transparent 100%)",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />

        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.5rem",
            animation: "partners-scroll 30s linear infinite",
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {allLogos.map((partner, i) => (
            <PartnerLogo
              key={`${partner.abbr}-${i}`}
              name={partner.name}
              abbr={partner.abbr}
              color={partner.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
