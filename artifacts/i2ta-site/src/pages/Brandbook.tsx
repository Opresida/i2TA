import { useEffect } from "react";

export default function Brandbook() {
  useEffect(() => {
    window.location.href = "/brandbook/index.html";
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0A0F1C", color: "#8A94A6" }}
    >
      <p className="text-sm">Carregando Brandbook...</p>
    </div>
  );
}
