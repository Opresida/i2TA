export default function NotFound() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "#0A0F1C" }}
    >
      <div className="text-center px-6">
        <div
          className="text-8xl font-display font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>
        <h1
          className="font-display text-2xl font-bold mb-3"
          style={{ color: "#F5F7FA" }}
        >
          Página não encontrada
        </h1>
        <p className="mb-8" style={{ color: "#8A94A6" }}>
          A página que você procura não existe.
        </p>
        <a
          href="/"
          className="btn-primary py-3 px-8 rounded-lg font-display text-sm"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          Voltar ao início
        </a>
      </div>
    </div>
  );
}
