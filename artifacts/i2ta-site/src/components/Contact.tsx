import { useState } from "react";
import { Send, MapPin, Mail, Phone, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.email.trim()) e.email = "E-mail obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido";
    if (!form.message.trim()) e.message = "Mensagem obrigatória";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputStyle = (fieldName: string) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${errors[fieldName] ? "#FF4D6D" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "10px",
    color: "#F5F7FA",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    fontSize: "0.95rem",
    transition: "border-color 0.2s",
  });

  return (
    <section
      id="contato"
      className="py-20 md:py-28 relative border-t"
      style={{
        background: "linear-gradient(180deg, rgba(13,42,82,0.12) 0%, rgba(10,15,28,0) 100%)",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      <div className="bg-grid" style={{ opacity: 0.12 }} />
      <div
        className="glow-blob"
        style={{ width: "500px", height: "500px", background: "#7B3FE4", top: "0%", right: "-5%", opacity: 0.08 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 reveal">
          <span className="section-tag">Entre em Contato</span>
          <h2
            className="font-display text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "#F5F7FA" }}
          >
            Vamos <span className="text-gradient">Conversar</span>
          </h2>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: "#8A94A6" }}>
            Estamos prontos para transformar seu desafio tecnológico em solução.
            Fale com nossa equipe.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6 reveal">
            <div
              className="glass-card p-6"
              style={{ borderColor: "rgba(123,63,228,0.2)" }}
            >
              <h3
                className="font-display font-bold text-lg mb-5"
                style={{ color: "#F5F7FA" }}
              >
                Informações de Contato
              </h3>
              <div className="space-y-5">
                {[
                  {
                    icon: <MapPin size={18} />,
                    label: "Endereço",
                    value: "Manaus, Amazonas — Brasil",
                    color: "#7B3FE4",
                  },
                  {
                    icon: <Mail size={18} />,
                    label: "E-mail",
                    value: "contato@i2ta.org.br",
                    color: "#00E0FF",
                  },
                  {
                    icon: <Phone size={18} />,
                    label: "Atendimento",
                    value: "+55 (92) 9000-0000",
                    color: "#7B3FE4",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border"
                      style={{
                        background: `${item.color}12`,
                        borderColor: `${item.color}25`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-display font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#8A94A6" }}>
                        {item.label}
                      </p>
                      <p className="text-sm" style={{ color: "#F5F7FA" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="glass-card p-6"
              style={{
                background: "linear-gradient(135deg, rgba(123,63,228,0.1) 0%, rgba(0,224,255,0.05) 100%)",
                borderColor: "rgba(123,63,228,0.2)",
              }}
            >
              <h4 className="font-display font-bold mb-2" style={{ color: "#F5F7FA" }}>
                Instituto i2TA
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "#8A94A6" }}>
                Instituição Científica, Tecnológica e de Inovação (ICT) —
                de direito privado e sem fins lucrativos, dedicada ao
                desenvolvimento tecnológico da Amazônia.
              </p>
            </div>
          </div>

          <div className="lg:col-span-3 reveal reveal-delay-2">
            {sent ? (
              <div
                className="glass-card p-10 flex flex-col items-center justify-center text-center h-full"
                style={{ minHeight: "420px", borderColor: "rgba(0,255,156,0.2)" }}
              >
                <CheckCircle size={56} style={{ color: "#00FF9C", marginBottom: "1.5rem" }} />
                <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "#F5F7FA" }}>
                  Mensagem Enviada!
                </h3>
                <p className="mb-6" style={{ color: "#8A94A6" }}>
                  Obrigado pelo contato. Nossa equipe retornará em breve.
                </p>
                <button
                  className="btn-secondary py-2.5 px-6 rounded-lg text-sm font-display"
                  onClick={() => setSent(false)}
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card p-7 md:p-10 space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label
                      className="block text-xs font-display font-semibold uppercase tracking-wider mb-2"
                      style={{ color: errors.name ? "#FF4D6D" : "#8A94A6" }}
                    >
                      Nome *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Seu nome completo"
                      style={inputStyle("name")}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          errors.name ? "#FF4D6D" : "rgba(123,63,228,0.5)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          errors.name ? "#FF4D6D" : "rgba(255,255,255,0.08)")
                      }
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs" style={{ color: "#FF4D6D" }}>
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      className="block text-xs font-display font-semibold uppercase tracking-wider mb-2"
                      style={{ color: errors.email ? "#FF4D6D" : "#8A94A6" }}
                    >
                      E-mail *
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      style={inputStyle("email")}
                      onFocus={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          errors.email ? "#FF4D6D" : "rgba(123,63,228,0.5)")
                      }
                      onBlur={(e) =>
                        ((e.target as HTMLElement).style.borderColor =
                          errors.email ? "#FF4D6D" : "rgba(255,255,255,0.08)")
                      }
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs" style={{ color: "#FF4D6D" }}>
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="block text-xs font-display font-semibold uppercase tracking-wider mb-2"
                    style={{ color: "#8A94A6" }}
                  >
                    Assunto
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    style={{ ...inputStyle("subject"), cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#0A0F1C" }}>
                      Selecione um assunto
                    </option>
                    <option value="pd&i" style={{ background: "#0A0F1C" }}>Projeto de PD&I</option>
                    <option value="parceria" style={{ background: "#0A0F1C" }}>Parceria Estratégica</option>
                    <option value="capacitacao" style={{ background: "#0A0F1C" }}>Capacitação</option>
                    <option value="consultoria" style={{ background: "#0A0F1C" }}>Consultoria Tecnológica</option>
                    <option value="outro" style={{ background: "#0A0F1C" }}>Outro</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs font-display font-semibold uppercase tracking-wider mb-2"
                    style={{ color: errors.message ? "#FF4D6D" : "#8A94A6" }}
                  >
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Descreva seu projeto ou dúvida..."
                    style={{ ...inputStyle("message"), resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        errors.message ? "#FF4D6D" : "rgba(123,63,228,0.5)")
                    }
                    onBlur={(e) =>
                      ((e.target as HTMLElement).style.borderColor =
                        errors.message ? "#FF4D6D" : "rgba(255,255,255,0.08)")
                    }
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs" style={{ color: "#FF4D6D" }}>
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-primary w-full py-3.5 rounded-lg text-sm font-display gap-2"
                  style={{ opacity: sending ? 0.75 : 1 }}
                >
                  {sending ? (
                    <>
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
