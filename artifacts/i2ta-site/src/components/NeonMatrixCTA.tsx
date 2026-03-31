import { useEffect, useRef } from "react";

interface NeonMatrixCTAProps {
  href?: string;
  children?: React.ReactNode;
}

export default function NeonMatrixCTA({ href = "#contato", children = "Sim, eu quero fazer parte" }: NeonMatrixCTAProps) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const borderRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const angleRef = useRef(0);

  useEffect(() => {
    let running = true;

    const animate = () => {
      if (!running || !borderRef.current) return;
      angleRef.current = (angleRef.current + 1.2) % 360;
      borderRef.current.style.background = `conic-gradient(from ${angleRef.current}deg, #7B3FE4 0%, #00E0FF 25%, #7B3FE4 50%, #00E0FF 75%, #7B3FE4 100%)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <a
      ref={btnRef}
      href={href}
      className="nmc-btn"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <span ref={borderRef} className="nmc-border" />
      <span className="nmc-blur" />
      <span className="nmc-inner">
        <span className="nmc-glitch-wrap">
          <span className="nmc-text">{children}</span>
          <span className="nmc-glitch nmc-glitch-1" aria-hidden="true">{children}</span>
          <span className="nmc-glitch nmc-glitch-2" aria-hidden="true">{children}</span>
        </span>
        <svg
          className="nmc-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </a>
  );
}
