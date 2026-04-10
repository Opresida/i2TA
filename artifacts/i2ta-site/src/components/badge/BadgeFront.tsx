import { forwardRef } from "react";
import { BADGE_PX_W, BADGE_PX_H } from "@/lib/badgeExport";

interface BadgeFrontProps {
  name: string;
  role: string;
  photoUrl: string | null;
}

/**
 * Frente do crachá institucional i2TA.
 *
 * Tamanho FIXO 661×1040px (com sangria, pronto pra impressão).
 * NÃO é responsivo — para preview na tela use transform: scale().
 *
 * Estética: identidade pessoal — foto, nome, cargo, logo i2TA, fundo dark
 * com glow blobs roxo/ciano e grid tech sutil.
 */
const BadgeFront = forwardRef<HTMLDivElement, BadgeFrontProps>(
  ({ name, role, photoUrl }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: BADGE_PX_W,
          height: BADGE_PX_H,
          fontFamily: "Inter, sans-serif",
        }}
        className="relative bg-[#0A0F1C] overflow-hidden"
      >
        {/* Glow blobs (simulação visual sem backdrop-filter pra ser capturável por html2canvas) */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "-120px",
            right: "-100px",
            width: "340px",
            height: "340px",
            background: "#7B3FE4",
            opacity: 0.22,
            filter: "blur(110px)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "180px",
            left: "-120px",
            width: "320px",
            height: "320px",
            background: "#00E0FF",
            opacity: 0.16,
            filter: "blur(110px)",
          }}
        />

        {/* Grid tech sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Borda decorativa interna sutil */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 22,
            left: 22,
            right: 22,
            bottom: 22,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
          }}
        />

        {/* Conteúdo central */}
        <div className="relative z-10 flex flex-col items-center pt-[64px] px-[40px] text-center">
          {/* Logo i2TA */}
          <img
            src="/brandbook/logo.svg"
            alt="i2TA"
            style={{ width: 150, height: "auto" }}
            crossOrigin="anonymous"
          />

          {/* Subtítulo institucional */}
          <p
            style={{
              marginTop: 12,
              fontSize: 10,
              letterSpacing: "0.22em",
              color: "#00E0FF",
              textTransform: "uppercase",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          >
            Instituto de Inteligência
            <br />e Tecnologia Aplicada
          </p>

          {/* Foto com borda gradient */}
          <div
            style={{
              marginTop: 56,
              width: 268,
              height: 268,
              borderRadius: "50%",
              padding: 4,
              background: "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
              boxShadow:
                "0 0 60px rgba(123, 63, 228, 0.35), 0 0 120px rgba(0, 224, 255, 0.18)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "#0A0F1C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  crossOrigin="anonymous"
                />
              ) : (
                <div
                  style={{
                    color: "#8A94A6",
                    fontSize: 14,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Sem foto
                </div>
              )}
            </div>
          </div>

          {/* Nome */}
          <h1
            style={{
              marginTop: 44,
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 42,
              color: "#F5F7FA",
              lineHeight: 1.1,
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            {name || "Nome Completo"}
          </h1>

          {/* Cargo */}
          <p
            style={{
              marginTop: 12,
              fontSize: 18,
              color: "#00E0FF",
              fontWeight: 500,
              lineHeight: 1.3,
              maxWidth: "92%",
            }}
          >
            {role || "Cargo / Função"}
          </p>

          {/* Divider gradient */}
          <div
            style={{
              marginTop: 28,
              width: 70,
              height: 2,
              background:
                "linear-gradient(90deg, #7B3FE4 0%, #00E0FF 100%)",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Footer faixa com gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center"
          style={{
            height: 92,
            background:
              "linear-gradient(135deg, #7B3FE4 0%, #0D2A52 50%, #00E0FF 100%)",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 19,
              color: "#FFFFFF",
              letterSpacing: "0.05em",
              textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            }}
          >
            i2ta.org.br
          </span>
        </div>
      </div>
    );
  },
);

BadgeFront.displayName = "BadgeFront";

export default BadgeFront;
