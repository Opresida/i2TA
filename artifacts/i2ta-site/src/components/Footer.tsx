export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: "O Instituto",
      links: [
        { label: "Sobre o i2TA", href: "#sobre" },
        { label: "Missão e Visão", href: "#cultura" },
        { label: "Valores", href: "#cultura" },
      ],
    },
    {
      title: "Atuação",
      links: [
        { label: "PD&I", href: "#servicos" },
        { label: "IA Aplicada", href: "#servicos" },
        { label: "Saúde Digital", href: "#servicos" },
        { label: "Capacitação", href: "#servicos" },
      ],
    },
    {
      title: "Diferenciais",
      links: [
        { label: "Diferenciais", href: "#diferenciais" },
        { label: "Impactos", href: "#impacto" },
        { label: "Contato", href: "#contato" },
      ],
    },
  ];

  return (
    <footer
      className="relative border-t pt-16 pb-8"
      style={{
        background: "#060A14",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="bg-grid" style={{ opacity: 0.08 }} />
      <div
        className="glow-blob"
        style={{ width: "400px", height: "400px", background: "#7B3FE4", bottom: 0, left: "10%", opacity: 0.05 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <img
              src="https://raw.githubusercontent.com/Opresida/2ita-manualdemarca/refs/heads/main/logo.svg"
              alt="i2TA - Instituto de Inteligência e Tecnologia Aplicada da Amazônia"
              className="h-14 object-contain mb-5"
            />
            <p className="text-xs md:text-sm leading-relaxed mb-5" style={{ color: "#8A94A6" }}>
              Instituto de Inteligência e Tecnologia Aplicada da Amazônia — ICT de
              direito privado e sem fins lucrativos.
            </p>
            <div className="flex gap-3">
              {["🔗", "📧", "💼"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg flex items-center justify-center border transition-all duration-200 hover:scale-110 text-base"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(123,63,228,0.4)";
                    el.style.background = "rgba(123,63,228,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.background = "rgba(255,255,255,0.03)";
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {sections.map((sec, i) => (
            <div key={i}>
              <h4
                className="font-display font-semibold text-sm uppercase tracking-widest mb-5"
                style={{ color: "#F5F7FA" }}
              >
                {sec.title}
              </h4>
              <ul className="space-y-3">
                {sec.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 hover:text-cyan-400"
                      style={{ color: "#8A94A6" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#00E0FF")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "#8A94A6")
                      }
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs text-center md:text-left" style={{ color: "#8A94A6" }}>
            © {year}{" "}
            <span style={{ color: "#00E0FF" }}>i2TA</span> — Instituto de Inteligência e Tecnologia Aplicada da Amazônia.
            Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-display"
              style={{ color: "#8A94A6" }}
            >
              Feito com
            </span>
            <span style={{ color: "#FF4D6D" }}>♥</span>
            <span className="text-xs font-display" style={{ color: "#8A94A6" }}>
              na Amazônia
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
