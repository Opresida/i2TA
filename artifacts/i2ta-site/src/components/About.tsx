export default function About() {
  return (
    <section
      id="sobre"
      className="py-20 md:py-28 relative"
      style={{ background: "#0A0F1C" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="reveal">
            <span className="section-tag">O Instituto</span>
            <h2
              className="font-display text-3xl md:text-5xl font-bold leading-tight tracking-tight mb-6"
              style={{ color: "#F5F7FA" }}
            >
              Algoritmos gerando{" "}
              <span className="text-gradient">Impacto Industrial.</span>
            </h2>
            <p className="text-base md:text-lg mb-5 leading-relaxed" style={{ color: "#8A94A6" }}>
              O <strong style={{ color: "#F5F7FA" }}>i2TA</strong> — Instituto de
              Inteligência e Tecnologia Aplicada da Amazônia — é uma Instituição
              Científica, Tecnológica e de Inovação (ICT), de direito privado e sem fins
              lucrativos, com atuação voltada ao desenvolvimento de soluções
              tecnológicas inovadoras.
            </p>
            <p className="text-base md:text-lg mb-8 leading-relaxed" style={{ color: "#8A94A6" }}>
              Estruturado para atuar de forma integrada nas três dimensões
              fundamentais — <strong style={{ color: "#F5F7FA" }}>Pesquisa</strong>,{" "}
              <strong style={{ color: "#F5F7FA" }}>Desenvolvimento</strong> e{" "}
              <strong style={{ color: "#F5F7FA" }}>Inovação</strong> — o Instituto
              promove a conexão entre indústria, tecnologia e desenvolvimento regional
              sustentável, com ênfase na Amazônia.
            </p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "⚙️", title: "Indústria 4.0", sub: "Automação de Ponta" },
                { icon: "🧠", title: "IA & Dados", sub: "Machine Learning" },
                { icon: "🔗", title: "Infraestrutura", sub: "Cloud & IoT" },
              ].map((item, i) => (
                <div key={i} className="glass-card p-4 text-center reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h4
                    className="font-display font-semibold text-xs md:text-sm"
                    style={{ color: "#F5F7FA" }}
                  >
                    {item.title}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: "#8A94A6" }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal relative h-[400px] md:h-[480px] w-full rounded-2xl overflow-hidden border flex items-center justify-center"
            style={{
              background: "#080C18",
              borderColor: "rgba(255,255,255,0.06)",
              boxShadow: "inset 0 0 100px rgba(0,0,0,0.7)",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(135deg, rgba(59,30,122,0.3) 0%, transparent 70%)",
              }}
            />
            <div className="bg-grid" style={{ opacity: 0.25 }} />

            <div className="relative w-full h-full">
              <div
                className="absolute anim-core"
                style={{
                  top: "50%",
                  left: "50%",
                  width: "140px",
                  height: "140px",
                  borderRadius: "18px",
                  border: "1px solid rgba(123,63,228,0.45)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(10,15,28,0.92)",
                  backdropFilter: "blur(10px)",
                  zIndex: 10,
                }}
              >
                <img
                  src="https://i.imgur.com/S85l92Y.png"
                  className="object-contain"
                  style={{
                    height: "60px",
                    transform: "rotate(-45deg)",
                    filter: "drop-shadow(0 0 12px rgba(123,63,228,0.8))",
                  }}
                  alt="i2TA"
                />
              </div>

              {[
                { top: "22%", left: "18%", label: "PD&I", cls: "anim-node-1", borderColor: "rgba(0,224,255,0.4)", color: "#00E0FF", size: 72 },
                { top: "60%", left: "68%", label: "IoT", cls: "anim-node-2", borderColor: "rgba(0,224,255,0.3)", color: "#00E0FF", size: 80 },
                { top: "30%", left: "72%", label: "AI", cls: "anim-node-3", borderColor: "rgba(255,255,255,0.1)", color: "#8A94A6", size: 60 },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`absolute ${node.cls}`}
                  style={{
                    top: node.top,
                    left: node.left,
                    width: node.size,
                    height: node.size,
                    borderRadius: "12px",
                    border: `1px solid ${node.borderColor}`,
                    background: "rgba(10,15,28,0.9)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: "rotate(45deg)",
                  }}
                >
                  <span
                    className="font-display font-bold"
                    style={{
                      fontSize: "0.65rem",
                      color: node.color,
                      transform: "rotate(-45deg)",
                    }}
                  >
                    {node.label}
                  </span>
                </div>
              ))}

              <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5, zIndex: 0 }} viewBox="0 0 400 480" preserveAspectRatio="none">
                <path d="M 80 120 L 200 120 L 200 240" stroke="#00E0FF" strokeWidth="1.5" fill="none" className="anim-flow-fast" />
                <path d="M 300 312 L 200 312 L 200 240" stroke="#7B3FE4" strokeWidth="1.5" fill="none" className="anim-flow-slow" />
                <path d="M 304 158 L 304 240 L 200 240" stroke="#00E0FF" strokeWidth="1" fill="none" className="anim-flow-fast" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
