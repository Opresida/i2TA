import React from "react";

interface LogoGlitchProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function LogoGlitch({ src, alt, className, style }: LogoGlitchProps) {
  return (
    <div className={`logo-glitch-wrapper ${className ?? ""}`} style={style}>
      <img src={src} alt={alt} className="logo-glitch-base" />
      <img src={src} alt="" aria-hidden="true" className="logo-glitch-layer logo-glitch-cyan" />
      <img src={src} alt="" aria-hidden="true" className="logo-glitch-layer logo-glitch-purple" />
    </div>
  );
}
