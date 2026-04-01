import { useEffect, useRef } from "react";
import NeonMatrixCTA from "./NeonMatrixCTA";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const NUM_NODES = 60;
    const MAX_DIST = 130;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < NUM_NODES; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const opacity = (1 - dist / MAX_DIST) * 0.35;
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(123, 63, 228, ${opacity})`);
            grad.addColorStop(1, `rgba(0, 224, 255, ${opacity})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 224, 255, 0.5)";
        ctx.fill();
      });

      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12"
      style={{ background: "#0A0F1C" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <div className="bg-grid" style={{ zIndex: 1 }} />

      <div
        className="glow-blob"
        style={{
          width: "450px",
          height: "450px",
          background: "#7B3FE4",
          top: "20%",
          left: "15%",
          opacity: 0.18,
          zIndex: 1,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "#00E0FF",
          bottom: "5%",
          right: "10%",
          opacity: 0.12,
          zIndex: 1,
        }}
      />

      <div
        className="relative text-center max-w-5xl mx-auto px-6 flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        <img
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="i2TA - Instituto de Inteligência e Tecnologia Aplicada da Amazônia"
          className="hero-anim h-28 md:h-40 lg:h-52 mx-auto mb-10 object-contain"
          style={{ filter: "drop-shadow(0 0 30px rgba(123,63,228,0.5))" }}
        />

        <div
          className="hero-anim hero-anim-d1 inline-flex items-center gap-2 mb-6 px-5 py-2 rounded-full border font-display font-semibold tracking-widest uppercase"
          style={{
            fontSize: "0.7rem",
            borderColor: "rgba(123,63,228,0.4)",
            background: "rgba(123,63,228,0.1)",
            color: "#00E0FF",
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{
              background: "#00E0FF",
              animation: "pulse 1.8s ease-in-out infinite",
              boxShadow: "0 0 8px #00E0FF",
            }}
          />
          Instituição Científica, Tecnológica e de Inovação
        </div>

        <h1
          className="hero-anim hero-anim-d2 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6"
          style={{ color: "#F5F7FA" }}
        >
          Transformamos{" "}
          <span className="text-gradient">Inteligência</span>
          <br className="hidden md:block" /> em Impacto Real.
        </h1>

        <p
          className="hero-anim hero-anim-d3 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed font-light"
          style={{ color: "#8A94A6" }}
        >
          O <strong style={{ color: "#F5F7FA" }}>i2TA</strong> é uma ICT dedicada à
          execução de projetos de PD&amp;I com foco em tecnologia aplicada —
          conectando pesquisa, indústria e desenvolvimento sustentável na Amazônia.
        </p>

        <div className="hero-anim hero-anim-d4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <NeonMatrixCTA href="#contato">Sim, eu quero fazer parte</NeonMatrixCTA>
          <a href="#contato" className="btn-secondary py-3 px-8 rounded-lg text-sm font-display">
            Fale Conosco
          </a>
        </div>
      </div>

    </section>
  );
}
