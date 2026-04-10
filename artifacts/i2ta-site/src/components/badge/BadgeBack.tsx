import { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BADGE_PX_W, BADGE_PX_H } from "@/lib/badgeExport";

interface BadgeBackProps {
  siteUrl?: string;
  showQRCode?: boolean;
  /** Largura do logo em px (default 220) */
  logoSize?: number;
  /** Tamanho da fonte da tagline em px (default 26) */
  taglineSize?: number;
  /** Tamanho da fonte da missão em px (default 12) */
  missionSize?: number;
  /** Tamanho da fonte da URL em px (default 16) */
  urlSize?: number;
  /** Tamanho do QR code em px (default 70) */
  qrSize?: number;
  /** Offset vertical do conteúdo central em px (positivo = desce, negativo = sobe; default 0) */
  contentOffsetY?: number;
}

/**
 * Verso do crachá institucional i2TA.
 *
 * Tamanho FIXO 661×1040px (com sangria, pronto pra impressão).
 *
 * Estética: identidade institucional — logo grande, tagline,
 * missão resumida, link do site, QR code, fundo dark gradient.
 */
const BadgeBack = forwardRef<HTMLDivElement, BadgeBackProps>(
  (
    {
      siteUrl = "www.i2ta.org.br",
      showQRCode = true,
      logoSize = 220,
      taglineSize = 26,
      missionSize = 12,
      urlSize = 16,
      qrSize = 70,
      contentOffsetY = 0,
    },
    ref,
  ) => {
    // SVG da tagline: viewBox e posições escalam proporcionalmente ao taglineSize
    const taglineHeight = Math.round(taglineSize * 4.6);
    const taglineY1 = Math.round(taglineSize * 1.6);
    const taglineY2 = Math.round(taglineSize * 3.3);

    return (
      <div
        ref={ref}
        style={{
          width: BADGE_PX_W,
          height: BADGE_PX_H,
          fontFamily: "Inter, sans-serif",
        }}
        className="relative overflow-hidden"
      >
        {/* Background gradient diagonal */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, #0A0F1C 0%, #0D2A52 50%, #0A0F1C 100%)",
          }}
        />

        {/* Glow blob roxo no topo */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "300px",
            background: "#7B3FE4",
            opacity: 0.2,
            filter: "blur(120px)",
          }}
        />

        {/* Glow blob ciano no rodapé */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            bottom: "-80px",
            right: "-60px",
            width: "300px",
            height: "300px",
            background: "#00E0FF",
            opacity: 0.18,
            filter: "blur(110px)",
          }}
        />

        {/* Grid tech */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Selo lateral direito (fita do crachá) */}
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            width: 22,
            background:
              "linear-gradient(180deg, #00E0FF 0%, #7B3FE4 100%)",
            opacity: 0.85,
          }}
        />

        {/* Borda decorativa interna */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: 22,
            left: 22,
            right: 44,
            bottom: 22,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
          }}
        />

        {/* Conteúdo central */}
        <div
          className="relative z-10 flex flex-col items-center text-center"
          style={{
            paddingTop: 70 + contentOffsetY,
            paddingLeft: 40,
            paddingRight: 60,
          }}
        >
          {/* Logo grande */}
          <img
            src="/brandbook/logo.svg"
            alt="i2TA"
            style={{ width: logoSize, height: "auto" }}
            crossOrigin="anonymous"
          />

          {/*
            Tagline em SVG inline (não em CSS background-clip).
            Motivo: html2canvas NÃO suporta `background-clip: text` —
            ele renderiza o gradient como retângulo opaco e o texto fica
            transparente atrás (vira uma "barra colorida"). SVG com
            <linearGradient> + <text fill="url(#grad)"> é universal.
          */}
          <svg
            width="540"
            height={taglineHeight}
            viewBox={`0 0 540 ${taglineHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginTop: 28, display: "block" }}
          >
            <defs>
              <linearGradient
                id="i2ta-tagline-grad-1"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#7B3FE4" />
                <stop offset="100%" stopColor="#00E0FF" />
              </linearGradient>
              <linearGradient
                id="i2ta-tagline-grad-2"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#00E0FF" />
                <stop offset="100%" stopColor="#7B3FE4" />
              </linearGradient>
            </defs>

            {/* Linha 1: "Transformamos Inteligência" */}
            <text
              x="50%"
              y={taglineY1}
              fontFamily="'Space Grotesk', sans-serif"
              fontSize={taglineSize}
              fontWeight="600"
              fill="#F5F7FA"
              textAnchor="middle"
            >
              Transformamos{" "}
              <tspan
                fill="url(#i2ta-tagline-grad-1)"
                fontWeight="700"
              >
                Inteligência
              </tspan>
            </text>

            {/* Linha 2: "em Impacto Real." */}
            <text
              x="50%"
              y={taglineY2}
              fontFamily="'Space Grotesk', sans-serif"
              fontSize={taglineSize}
              fontWeight="600"
              fill="#F5F7FA"
              textAnchor="middle"
            >
              em{" "}
              <tspan
                fill="url(#i2ta-tagline-grad-2)"
                fontWeight="700"
              >
                Impacto Real
              </tspan>
              .
            </text>
          </svg>

          {/* Divider neon */}
          <div
            style={{
              marginTop: 24,
              width: "70%",
              height: 1,
              background:
                "linear-gradient(90deg, transparent 0%, #00E0FF 50%, transparent 100%)",
              boxShadow: "0 0 8px rgba(0, 224, 255, 0.6)",
            }}
          />

          {/* Missão resumida */}
          <p
            style={{
              marginTop: 24,
              fontSize: missionSize,
              fontStyle: "italic",
              color: "#B5BFCC",
              lineHeight: 1.55,
              maxWidth: "92%",
            }}
          >
            Transformar inteligência de dados em soluções tecnológicas
            aplicadas, impulsionando a competitividade e escalabilidade
            da indústria.
          </p>

          {/* Bloco "Conecte-se" com glassmorphism simulado */}
          <div
            style={{
              marginTop: 36,
              width: "85%",
              padding: "16px 18px",
              borderRadius: 14,
              background:
                "linear-gradient(145deg, rgba(0,224,255,0.06) 0%, rgba(123,63,228,0.06) 100%)",
              border: "1px solid rgba(0, 224, 255, 0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: showQRCode ? "space-between" : "center",
              gap: 14,
            }}
          >
            <div
              style={{
                textAlign: "left",
                flex: showQRCode ? "1" : "initial",
              }}
            >
              <div
                style={{
                  fontSize: 9,
                  color: "#00E0FF",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Conecte-se
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: urlSize,
                  color: "#F5F7FA",
                  letterSpacing: "0.02em",
                }}
              >
                {siteUrl}
              </div>
            </div>

            {showQRCode && (
              <div
                style={{
                  background: "#FFFFFF",
                  padding: 6,
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <QRCodeSVG
                  value={`https://${siteUrl.replace(/^https?:\/\//, "")}`}
                  size={qrSize}
                  bgColor="#FFFFFF"
                  fgColor="#0A0F1C"
                  level="M"
                  marginSize={0}
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer institucional */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center"
          style={{
            paddingBottom: 24,
            paddingLeft: 40,
            paddingRight: 60,
          }}
        >
          <div
            style={{
              fontSize: 8,
              color: "#8A94A6",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 500,
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Instituição Científica, Tecnológica
            <br />e de Inovação · ICT
          </div>
        </div>
      </div>
    );
  },
);

BadgeBack.displayName = "BadgeBack";

export default BadgeBack;
