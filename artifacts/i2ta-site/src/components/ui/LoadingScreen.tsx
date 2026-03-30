import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STATUS_MESSAGES = [
  "Inicializando Módulos...",
  "Carregando Datasets...",
  "Calibrando IA...",
  "Sincronizando Redes Neurais...",
  "Compilando Algoritmos...",
  "Otimizando Modelos...",
  "Conectando Servidores...",
  "Verificando Integridade...",
];

const TOTAL_DURATION = 5000;

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);
  const startTimeRef = useRef(Date.now());
  const rafRef = useRef<number | null>(null);
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setFlashing(true);
    setTimeout(() => onComplete(), 650);
  }, [onComplete]);

  useEffect(() => {
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed < TOTAL_DURATION) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        triggerExit();
      }
    };
    rafRef.current = requestAnimationFrame(animate);

    statusIntervalRef.current = setInterval(() => {
      setStatusIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, 800);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (statusIntervalRef.current) clearInterval(statusIntervalRef.current);
    };
  }, [triggerExit]);

  const displayPercent = Math.round(progress);

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      animate={flashing ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#0A0F1C",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <AnimatedGrid />
      <Scanlines />
      <GlowBlobs />
      <DataParticles />

      {flashing && (
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle, rgba(0,224,255,0.85) 0%, rgba(123,63,228,0.6) 40%, transparent 75%)",
          zIndex: 10,
          animation: "loader-flash 0.35s ease-out forwards",
          pointerEvents: "none",
        }} />
      )}

      <div style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2rem",
        width: "100%",
        maxWidth: 520,
        padding: "0 1.5rem",
      }}>
        <OrbitalRings />
        <GlitchTitle />
        <ProgressSection progress={progress} displayPercent={displayPercent} />
        <AnimatePresence mode="wait">
          <StatusMessage key={statusIndex} message={STATUS_MESSAGES[statusIndex]} />
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function AnimatedGrid() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(to right, rgba(0,224,255,0.04) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0,224,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "48px 48px",
      animation: "loader-grid-move 8s linear infinite",
    }} />
  );
}

function Scanlines() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
      zIndex: 2,
    }} />
  );
}

function GlowBlobs() {
  return (
    <>
      <div style={{
        position: "absolute",
        top: "15%",
        left: "10%",
        width: 340,
        height: 340,
        borderRadius: "50%",
        background: "rgba(123,63,228,0.18)",
        filter: "blur(100px)",
        animation: "loader-blob-pulse 4s ease-in-out infinite",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "8%",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "rgba(0,224,255,0.13)",
        filter: "blur(90px)",
        animation: "loader-blob-pulse 5s ease-in-out infinite 1.5s",
        pointerEvents: "none",
      }} />
    </>
  );
}

const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x: Math.round(5 + (i * 4.1) % 90),
  y: Math.round(10 + (i * 7.3) % 80),
  delay: parseFloat(((i * 0.37) % 3).toFixed(2)),
  duration: parseFloat((2.5 + (i * 0.19) % 2).toFixed(2)),
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 4,
  color: i % 2 === 0 ? "#00E0FF" : "#7B3FE4",
}));

function DataParticles() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `loader-particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            opacity: 0.7,
          }}
        />
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`line-${i}`}
          style={{
            position: "absolute",
            left: `${10 + i * 12}%`,
            top: `${15 + (i * 13) % 70}%`,
            width: `${20 + (i * 8) % 40}px`,
            height: 1,
            background: i % 2 === 0
              ? "linear-gradient(90deg, transparent, #00E0FF, transparent)"
              : "linear-gradient(90deg, transparent, #7B3FE4, transparent)",
            animation: `loader-data-line ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
            opacity: 0.5,
          }}
        />
      ))}
    </div>
  );
}

function OrbitalRings() {
  return (
    <div style={{ position: "relative", width: 180, height: 180, flexShrink: 0 }}>
      <svg
        viewBox="0 0 180 180"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "loader-ring-cw 3s linear infinite",
        }}
      >
        <circle cx="90" cy="90" r="80" fill="none" stroke="#00E0FF" strokeWidth="2" strokeDasharray="80 420" strokeLinecap="round" opacity="0.9" />
        <circle cx="90" cy="90" r="80" fill="none" stroke="#00E0FF" strokeWidth="1" strokeDasharray="20 480" strokeLinecap="round" opacity="0.4" />
      </svg>
      <svg
        viewBox="0 0 180 180"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "loader-ring-ccw 4s linear infinite",
        }}
      >
        <circle cx="90" cy="90" r="60" fill="none" stroke="#7B3FE4" strokeWidth="2.5" strokeDasharray="60 320" strokeLinecap="round" opacity="0.9" />
        <circle cx="90" cy="90" r="60" fill="none" stroke="#7B3FE4" strokeWidth="1" strokeDasharray="15 365" strokeLinecap="round" opacity="0.4" />
      </svg>
      <svg
        viewBox="0 0 180 180"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          animation: "loader-ring-cw 6s linear infinite",
        }}
      >
        <circle cx="90" cy="90" r="40" fill="none" stroke="#00E0FF" strokeWidth="1.5" strokeDasharray="30 220" strokeLinecap="round" opacity="0.5" />
      </svg>
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "radial-gradient(circle, #00E0FF 0%, #7B3FE4 70%, transparent 100%)",
        boxShadow: "0 0 24px #00E0FF, 0 0 48px rgba(123,63,228,0.5)",
        animation: "loader-core-pulse 2s ease-in-out infinite",
      }} />
    </div>
  );
}

function GlitchTitle() {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div style={{
        fontSize: "clamp(3rem, 10vw, 5rem)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        background: "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        position: "relative",
        animation: "loader-glitch 3s ease-in-out infinite",
        filter: "drop-shadow(0 0 18px rgba(0,224,255,0.45))",
      }}>
        i2TA
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        fontSize: "clamp(3rem, 10vw, 5rem)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#00E0FF",
        opacity: 0,
        animation: "loader-glitch-layer1 3s ease-in-out infinite 0.05s",
        clipPath: "polygon(0 30%, 100% 30%, 100% 50%, 0 50%)",
        transform: "translateX(-3px)",
        mixBlendMode: "screen",
      }}>
        i2TA
      </div>
      <div style={{
        position: "absolute",
        inset: 0,
        fontSize: "clamp(3rem, 10vw, 5rem)",
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#7B3FE4",
        opacity: 0,
        animation: "loader-glitch-layer2 3s ease-in-out infinite 0.1s",
        clipPath: "polygon(0 60%, 100% 60%, 100% 75%, 0 75%)",
        transform: "translateX(3px)",
        mixBlendMode: "screen",
      }}>
        i2TA
      </div>
      <div style={{
        fontSize: "0.7rem",
        letterSpacing: "0.35em",
        color: "rgba(0,224,255,0.6)",
        textTransform: "uppercase",
        marginTop: "0.25rem",
      }}>
        Instituto de Inteligência e Tecnologia Aplicada
      </div>
    </div>
  );
}

function ProgressSection({ progress, displayPercent }: { progress: number; displayPercent: number }) {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(0,224,255,0.5)", textTransform: "uppercase" }}>
          Progresso do Sistema
        </span>
        <span style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          fontFamily: "'Space Grotesk', sans-serif",
          background: "linear-gradient(135deg, #7B3FE4, #00E0FF)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          lineHeight: 1,
          minWidth: "3.5rem",
          textAlign: "right",
        }}>
          {displayPercent}%
        </span>
      </div>
      <div style={{
        width: "100%",
        height: 6,
        borderRadius: 4,
        background: "rgba(255,255,255,0.06)",
        overflow: "hidden",
        border: "1px solid rgba(0,224,255,0.1)",
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          borderRadius: 4,
          background: "linear-gradient(90deg, #7B3FE4, #00E0FF)",
          boxShadow: "0 0 12px rgba(0,224,255,0.6)",
          transition: "width 0.1s linear",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            animation: "shimmer 1.5s ease-in-out infinite",
          }} />
        </div>
      </div>
    </div>
  );
}

function StatusMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.25 }}
      style={{
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        color: "rgba(0,224,255,0.55)",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <span style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#00E0FF",
        boxShadow: "0 0 8px #00E0FF",
        animation: "loader-dot-blink 1s ease-in-out infinite",
        flexShrink: 0,
      }} />
      {message}
    </motion.div>
  );
}
