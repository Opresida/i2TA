import { TimelineContent } from "@/components/ui/timeline-animation";
import TestimonialSlider, { Testimonial } from "@/components/ui/testimonial-slider";

const testimonials: Testimonial[] = [
  {
    quote:
      "A parceria com o i2TA nos permitiu implementar soluções de IA que reduziram nossos custos operacionais em mais de 30%. A equipe tem um domínio técnico impressionante aliado a um profundo conhecimento da realidade amazônica.",
    name: "Carlos Mendonça",
    role: "Diretor de Inovação",
    org: "Polo Industrial de Manaus",
    img: "https://ui-avatars.com/api/?name=Carlos+Mendon%C3%A7a&background=00E0FF&color=0A0F1C&size=96&bold=true",
    accent: "cyan",
  },
  {
    quote:
      "O programa de capacitação desenvolvido pelo i2TA formou profissionais que hoje lideram projetos de transformação digital em nossa empresa. Investir nessa parceria foi uma das melhores decisões estratégicas que tomamos.",
    name: "Fernanda Castilho",
    role: "CEO",
    org: "TecnoAmazon S.A.",
    img: "https://ui-avatars.com/api/?name=Fernanda+Castilho&background=7B3FE4&color=ffffff&size=96&bold=true",
    accent: "purple",
  },
  {
    quote:
      "A plataforma de análise de dados regionais entregue pelo i2TA nos deu uma visão sem precedentes sobre padrões socioeconômicos da região. Agora tomamos decisões baseadas em evidências, não em suposições.",
    name: "Dr. Rodrigo Lima",
    role: "Secretário de Ciência e Tecnologia",
    org: "Governo do Amazonas",
    img: "https://ui-avatars.com/api/?name=Rodrigo+Lima&background=00E0FF&color=0A0F1C&size=96&bold=true",
    accent: "cyan",
  },
  {
    quote:
      "O projeto de PD&I em parceria com o i2TA resultou em uma solução de monitoramento ambiental que já protege mais de 2 milhões de hectares na Amazônia. Ciência aplicada com impacto real.",
    name: "Ana Paula Ferreira",
    role: "Diretora Executiva",
    org: "Instituto Amazônia Verde",
    img: "https://ui-avatars.com/api/?name=Ana+Paula+Ferreira&background=7B3FE4&color=ffffff&size=96&bold=true",
    accent: "purple",
  },
  {
    quote:
      "A consultoria do i2TA foi determinante para estruturarmos nossa estratégia de transformação digital. Eles entendem tanto de tecnologia de ponta quanto das particularidades logísticas e culturais da Amazônia.",
    name: "Marcos Vieira",
    role: "Superintendente de TI",
    org: "Grupo Bemol",
    img: "https://ui-avatars.com/api/?name=Marcos+Vieira&background=00E0FF&color=0A0F1C&size=96&bold=true",
    accent: "cyan",
  },
  {
    quote:
      "Em apenas seis meses de parceria, o i2TA nos ajudou a desenvolver um sistema de telemedicina que alcança comunidades ribeirinhas inacessíveis. Tecnologia a serviço de quem mais precisa.",
    name: "Dra. Lúcia Nascimento",
    role: "Coordenadora de Saúde Digital",
    org: "Secretaria Municipal de Saúde",
    img: "https://ui-avatars.com/api/?name=L%C3%BAcia+Nascimento&background=7B3FE4&color=ffffff&size=96&bold=true",
    accent: "purple",
  },
  {
    quote:
      "O rigor técnico e a capacidade de transferência de tecnologia do i2TA são excepcionais. Nossa startup saiu do zero para um produto escalável em tempo recorde, graças ao suporte contínuo da equipe.",
    name: "João Guilherme Santos",
    role: "Co-fundador & CTO",
    org: "DataRio Startups",
    img: "https://ui-avatars.com/api/?name=Jo%C3%A3o+Guilherme+Santos&background=00E0FF&color=0A0F1C&size=96&bold=true",
    accent: "cyan",
  },
];

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

        <TimelineContent animationNum={1}>
          <TestimonialSlider testimonials={testimonials} autoRotateInterval={7000} />
        </TimelineContent>
      </div>
    </section>
  );
}
