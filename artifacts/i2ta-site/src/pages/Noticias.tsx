import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import NoticiasHero from "@/components/NoticiasHero";
import NoticiasGrid from "@/components/NoticiasGrid";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { noticias as todasNoticias, CATEGORIAS } from "@/data/noticias";

export default function Noticias() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [busca, setBusca] = useState("");

  const noticiasFiltradas = useMemo(() => {
    return todasNoticias.filter((n) => {
      const matchCategoria =
        categoriaSelecionada === "Todos" || n.categoria === categoriaSelecionada;
      const termoBusca = busca.toLowerCase();
      const matchBusca =
        busca.trim() === "" ||
        n.titulo.toLowerCase().includes(termoBusca) ||
        n.resumo.toLowerCase().includes(termoBusca);
      return matchCategoria && matchBusca;
    });
  }, [categoriaSelecionada, busca]);

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      <Navbar />
      <NoticiasHero />

      <section className="relative py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10"
          >
            <div className="flex flex-wrap gap-2">
              {CATEGORIAS.map((cat) => {
                const ativa = cat === categoriaSelecionada;
                return (
                  <button
                    key={cat}
                    onClick={() => setCategoriaSelecionada(cat)}
                    className="text-xs font-display font-semibold px-4 py-2 rounded-full border transition-all duration-200"
                    style={
                      ativa
                        ? {
                            background: "linear-gradient(135deg, #7B3FE4, #00E0FF)",
                            borderColor: "transparent",
                            color: "#fff",
                            boxShadow: "0 0 14px rgba(123,63,228,0.35)",
                          }
                        : {
                            background: "rgba(255,255,255,0.03)",
                            borderColor: "rgba(255,255,255,0.1)",
                            color: "#8A94A6",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!ativa) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(123,63,228,0.4)";
                        (e.currentTarget as HTMLElement).style.color = "#F5F7FA";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!ativa) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                        (e.currentTarget as HTMLElement).style.color = "#8A94A6";
                      }
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="relative flex-shrink-0 w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "#8A94A6" }}
              />
              <input
                type="text"
                placeholder="Buscar notícias..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border text-sm outline-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.1)",
                  color: "#F5F7FA",
                }}
                onFocus={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "rgba(123,63,228,0.5)";
                  (e.target as HTMLInputElement).style.boxShadow = "0 0 0 3px rgba(123,63,228,0.12)";
                }}
                onBlur={(e) => {
                  (e.target as HTMLInputElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.target as HTMLInputElement).style.boxShadow = "none";
                }}
              />
              {busca && (
                <button
                  onClick={() => setBusca("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#8A94A6" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#F5F7FA")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#8A94A6")
                  }
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </motion.div>

          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm" style={{ color: "#8A94A6" }}>
              {noticiasFiltradas.length}{" "}
              {noticiasFiltradas.length === 1 ? "notícia encontrada" : "notícias encontradas"}
            </span>
            {(categoriaSelecionada !== "Todos" || busca) && (
              <button
                onClick={() => {
                  setCategoriaSelecionada("Todos");
                  setBusca("");
                }}
                className="text-xs px-2 py-0.5 rounded-full border transition-colors"
                style={{ color: "#00E0FF", borderColor: "rgba(0,224,255,0.25)" }}
              >
                Limpar filtros
              </button>
            )}
          </div>

          <NoticiasGrid noticias={noticiasFiltradas} />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
