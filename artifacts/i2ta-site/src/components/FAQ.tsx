import { useState } from "react";

const faqs = [
  {
    question: "O que é o i2TA e qual é sua missão principal?",
    answer:
      "O i2TA — Instituto de Inteligência e Tecnologia Aplicada da Amazônia — é uma instituição de pesquisa, desenvolvimento e inovação (PD&I) que conecta conhecimento científico à indústria. Nossa missão é transformar desafios reais em soluções tecnológicas de alto impacto, promovendo o desenvolvimento sustentável da região amazônica e do Brasil.",
  },
  {
    question: "Como funciona a captação de recursos via incentivos fiscais?",
    answer:
      "Apoiamos empresas na estruturação e submissão de projetos para mecanismos como a Lei do Bem, Lei de Informática, FNDCT, FINEP e outras fontes de fomento federal e estadual. Nossa equipe especializada cuida de toda a burocracia e gestão técnico-financeira, maximizando o retorno fiscal e a viabilidade dos projetos.",
  },
  {
    question: "Quais são as áreas de atuação do instituto em automação industrial?",
    answer:
      "Atuamos em automação de processos industriais, robótica aplicada, sistemas embarcados, visão computacional e integração de tecnologias IoT para manufatura inteligente (Indústria 4.0). Desenvolvemos soluções customizadas que aumentam a produtividade, reduzem custos operacionais e elevam os padrões de qualidade das indústrias parceiras.",
  },
  {
    question: "Como posso firmar uma parceria técnico-científica com o i2TA?",
    answer:
      "O processo começa com uma conversa para entender os desafios e objetivos da sua organização. A partir daí, estruturamos um projeto de cooperação técnica, que pode incluir PD&I contratada, consultorias, capacitações ou co-desenvolvimento de produtos. Entre em contato pelo formulário abaixo e nossa equipe retornará em até 48 horas.",
  },
  {
    question: "Quem compõe a equipe de pesquisadores do i2TA?",
    answer:
      "Contamos com uma rede de pesquisadores doutores e mestres de universidades federais e estaduais da Amazônia, especialistas sêniores da indústria e profissionais com experiência internacional. Essa combinação de academia e mercado garante soluções tecnicamente rigorosas e com aplicabilidade real no ambiente de negócios.",
  },
  {
    question: "Quais os passos para contratar os serviços do i2TA?",
    answer:
      "É simples: (1) entre em contato pelo formulário ou WhatsApp; (2) nossa equipe realiza um diagnóstico inicial sem custo; (3) elaboramos uma proposta técnica e comercial personalizada; (4) após aprovação, iniciamos o projeto com cronograma, metas e relatórios de progresso. Acompanhamos cada etapa para garantir os resultados esperados.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#0A0F1C" }}>
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="section-tag">FAQ</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Perguntas{" "}
            <span className="text-gradient">Frequentes</span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#8A94A6" }}>
            Tire suas dúvidas sobre o instituto, nossas áreas de atuação e como podemos colaborar com sua organização.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className="faq-item reveal"
                style={{
                  position: "relative",
                  background: isActive
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(255,255,255,0.02)",
                  borderRadius: "12px",
                  transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  overflow: "hidden",
                  isolation: "isolate",
                  boxShadow: isActive
                    ? "0 20px 60px -10px rgba(0,0,0,0.6)"
                    : "none",
                  transform: isActive ? "scale(1.02)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255,255,255,0.02)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }
                }}
              >
                <div className={`faq-border-beam${isActive ? " faq-border-beam--active" : ""}`} />
                <div className="faq-mask" />

                <button
                  className="faq-question"
                  onClick={() => toggle(index)}
                  aria-expanded={isActive}
                >
                  <span
                    className="question-text font-display"
                    style={{
                      color: isActive ? "#00E0FF" : "#F5F7FA",
                    }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="faq-icon"
                    style={{
                      color: isActive ? "#00E0FF" : "#8A94A6",
                      transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                      display: "inline-flex",
                      alignItems: "center",
                      flexShrink: 0,
                      marginLeft: "16px",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  className="faq-answer"
                  style={{
                    maxHeight: isActive ? "500px" : "0px",
                  }}
                >
                  <div className="answer-inner">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
