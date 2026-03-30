import { TimelineContent } from "@/components/ui/timeline-animation";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "A parceria com o i2TA nos permitiu implementar soluções de IA que reduziram nossos custos operacionais em mais de 30%. A equipe tem um domínio técnico impressionante aliado a um profundo conhecimento da realidade amazônica.",
    name: "Carlos Mendonça",
    role: "Diretor de Inovação",
    org: "Polo Industrial de Manaus",
    accent: "cyan",
  },
  {
    quote:
      "O programa de capacitação desenvolvido pelo i2TA formou profissionais que hoje lideram projetos de transformação digital em nossa empresa. Investir nessa parceria foi uma das melhores decisões estratégicas que tomamos.",
    name: "Fernanda Castilho",
    role: "CEO",
    org: "TecnoAmazon S.A.",
    accent: "purple",
  },
  {
    quote:
      "A plataforma de análise de dados regionais entregue pelo i2TA nos deu uma visão sem precedentes sobre padrões socioeconômicos da região. Agora tomamos decisões baseadas em evidências, não em suposições.",
    name: "Dr. Rodrigo Lima",
    role: "Secretário de Ciência e Tecnologia",
    org: "Governo do Amazonas",
    accent: "cyan",
  },
  {
    quote:
      "O projeto de PD&I em parceria com o i2TA resultou em uma solução de monitoramento ambiental que já protege mais de 2 milhões de hectares na Amazônia. Ciência aplicada com impacto real.",
    name: "Ana Paula Ferreira",
    role: "Diretora Executiva",
    org: "Instituto Amazônia Verde",
    accent: "purple",
  },
  {
    quote:
      "A consultoria do i2TA foi determinante para estruturarmos nossa estratégia de transformação digital. Eles entendem tanto de tecnologia de ponta quanto das particularidades logísticas e culturais da Amazônia.",
    name: "Marcos Vieira",
    role: "Superintendente de TI",
    org: "Grupo Bemol",
    accent: "cyan",
  },
  {
    quote:
      "Em apenas seis meses de parceria, o i2TA nos ajudou a desenvolver um sistema de telemedicina que alcança comunidades ribeirinhas inacessíveis. Tecnologia a serviço de quem mais precisa.",
    name: "Dra. Lúcia Nascimento",
    role: "Coordenadora de Saúde Digital",
    org: "Secretaria Municipal de Saúde",
    accent: "purple",
  },
  {
    quote:
      "O rigor técnico e a capacidade de transferência de tecnologia do i2TA são excepcionais. Nossa startup saiu do zero para um produto escalável em tempo recorde, graças ao suporte contínuo da equipe.",
    name: "João Guilherme Santos",
    role: "Co-fundador & CTO",
    org: "DataRio Startups",
    accent: "cyan",
  },
] as const;

type AccentColor = "cyan" | "purple";

function getAccentStyles(accent: AccentColor) {
  const isCyan = accent === "cyan";
  return {
    color: isCyan ? "var(--i2ta-cyan)" : "var(--i2ta-purple)",
    bgLight: isCyan ? "rgba(0,224,255,0.07)" : "rgba(123,63,228,0.1)",
    borderLight: isCyan ? "rgba(0,224,255,0.18)" : "rgba(123,63,228,0.25)",
    iconBg: isCyan ? "rgba(0,224,255,0.12)" : "rgba(123,63,228,0.15)",
    iconBorder: isCyan ? "rgba(0,224,255,0.25)" : "rgba(123,63,228,0.3)",
    avatarBgStart: isCyan ? "rgba(0,224,255,0.2)" : "rgba(123,63,228,0.2)",
    avatarBgEnd: isCyan ? "rgba(0,224,255,0.08)" : "rgba(123,63,228,0.08)",
    avatarBorder: isCyan ? "rgba(0,224,255,0.3)" : "rgba(123,63,228,0.3)",
  };
}

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="py-20 md:py-28 relative"
      style={{ background: "var(--i2ta-dark)" }}
    >
      <div
        className="glow-blob"
        style={{
          width: "600px",
          height: "600px",
          background: "var(--i2ta-cyan)",
          top: "20%",
          left: "-10%",
          opacity: 0.05,
        }}
      />
      <div
        className="glow-blob"
        style={{
          width: "500px",
          height: "500px",
          background: "var(--i2ta-purple)",
          bottom: "10%",
          right: "-5%",
          opacity: 0.07,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <TimelineContent animationNum={0} className="text-center mb-14">
          <span className="section-tag">O que dizem sobre nós</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "var(--i2ta-white)" }}
          >
            Depoimentos de <span className="text-gradient">Parceiros</span>
          </h2>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "var(--i2ta-gray)" }}
          >
            Empresas, governos e pesquisadores que transformaram seus desafios
            em resultados concretos com o i2TA.
          </p>
        </TimelineContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const s = getAccentStyles(t.accent);

            return (
              <TimelineContent
                key={i}
                animationNum={i % 3}
                className="glass-card p-7 flex flex-col gap-5"
                style={{
                  background: `linear-gradient(145deg, ${s.bgLight} 0%, rgba(255,255,255,0.008) 100%)`,
                  borderColor: s.borderLight,
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: s.iconBg,
                    border: `1px solid ${s.iconBorder}`,
                    color: s.color,
                  }}
                >
                  <Quote size={16} />
                </div>

                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "#C8D0DC" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div
                  className="flex items-center gap-3 pt-3 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${s.avatarBgStart}, ${s.avatarBgEnd})`,
                      border: `1px solid ${s.avatarBorder}`,
                      color: s.color,
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p
                      className="font-display font-semibold text-sm"
                      style={{ color: "var(--i2ta-white)" }}
                    >
                      {t.name}
                    </p>
                    <p className="text-xs" style={{ color: "var(--i2ta-gray)" }}>
                      {t.role} · {t.org}
                    </p>
                  </div>
                </div>
              </TimelineContent>
            );
          })}
        </div>
      </div>
    </section>
  );
}
