import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Calendar,
  Tag,
  Search,
  X,
  ExternalLink,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import NoticiasHero from "@/components/NoticiasHero";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { noticias, CATEGORIAS } from "@/data/noticias";
import type { Noticia } from "@/data/noticias";

/* ── Cores por categoria ──────────────────────────── */
const CATEGORIA_COLORS: Record<string, string> = {
  Parcerias: "#7B3FE4",
  Eventos: "#00E0FF",
  Credenciamento: "#F5A623",
  "Impacto Social": "#00C896",
};

function catColor(cat: string) {
  return CATEGORIA_COLORS[cat] ?? "#8A94A6";
}

/* ── Card de notícia ──────────────────────────────── */
function NoticiaCard({
  noticia,
  index,
  onClick,
}: {
  noticia: Noticia;
  index: number;
  onClick: () => void;
}) {
  const color = catColor(noticia.categoria);
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.3) }}
      className="group relative rounded-2xl overflow-hidden border flex flex-col cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden h-[180px] sm:h-[200px] lg:h-[220px]">
        {noticia.semFoto ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${color}15 0%, rgba(10,15,28,0.95) 100%)`,
            }}
          >
            <span
              className="font-display text-6xl font-black select-none"
              style={{ color: `${color}22` }}
              aria-hidden="true"
            >
              i2TA
            </span>
          </div>
        ) : (
          <img
            src={noticia.imagemUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,10,20,0.92) 0%, rgba(6,10,20,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${color}22`,
              color,
              border: `1px solid ${color}44`,
            }}
          >
            <Tag size={10} />
            {noticia.categoria}
          </span>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col gap-2 sm:gap-3">
        <div
          className="flex items-center gap-4 text-xs"
          style={{ color: "#8A94A6" }}
        >
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {noticia.data}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {noticia.tempoLeitura} min
          </span>
        </div>

        <h2
          className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-cyan-400 transition-colors"
          style={{ color: "#F5F7FA" }}
        >
          {noticia.titulo}
        </h2>

        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: "#8A94A6" }}
        >
          {noticia.resumo}
        </p>

        <div className="mt-auto pt-3 flex items-center gap-1">
          <span
            className="text-sm font-display font-semibold transition-colors group-hover:gap-2 inline-flex items-center gap-1"
            style={{ color }}
          >
            Ler artigo completo
            <ChevronRight
              size={14}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </motion.article>
  );
}

/* ── Modal de artigo ──────────────────────────────── */
function NoticiaModal({
  noticia,
  onClose,
}: {
  noticia: Noticia;
  onClose: () => void;
}) {
  const color = catColor(noticia.categoria);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const paragraphs = (noticia.corpo || noticia.resumo)
    .split("\n\n")
    .filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
      style={{ background: "rgba(6,10,20,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="relative w-full max-w-4xl mx-3 sm:mx-4 my-6 sm:my-12 lg:my-20 rounded-2xl sm:rounded-3xl overflow-hidden"
        style={{
          background: "#0E1424",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          style={{
            background: "rgba(255,255,255,0.08)",
            color: "#F5F7FA",
          }}
          aria-label="Fechar artigo"
        >
          <X size={18} />
        </button>

        {/* Imagem hero */}
        <div className="relative w-full h-[200px] sm:h-[260px] lg:h-[320px]">
          {noticia.semFoto ? (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${color}18 0%, #0E1424 100%)`,
              }}
            >
              <span
                className="font-display text-8xl font-black select-none"
                style={{ color: `${color}18` }}
                aria-hidden="true"
              >
                i2TA
              </span>
            </div>
          ) : (
            <img
              src={noticia.imagemUrl}
              alt={noticia.titulo}
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #0E1424 0%, rgba(14,20,36,0.6) 50%, transparent 100%)",
            }}
          />
        </div>

        {/* Conteúdo */}
        <div className="relative px-5 sm:px-8 lg:px-12 pb-8 sm:pb-12 -mt-16 sm:-mt-20">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3 py-1.5 rounded-full"
              style={{
                background: `${color}22`,
                color,
                border: `1px solid ${color}44`,
              }}
            >
              <Tag size={10} />
              {noticia.categoria}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "#8A94A6" }}
            >
              <Calendar size={12} />
              {noticia.data}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "#8A94A6" }}
            >
              <Clock size={12} />
              {noticia.tempoLeitura} min de leitura
            </span>
          </div>

          {/* Título */}
          <h1
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-5 sm:mb-8"
            style={{ color: "#F5F7FA" }}
          >
            {noticia.titulo}
          </h1>

          {/* Lead */}
          <p
            className="text-base sm:text-lg lg:text-xl leading-relaxed mb-5 sm:mb-8 font-medium"
            style={{ color: "#B0B8C8" }}
          >
            {noticia.resumo}
          </p>

          {/* Divider */}
          <div
            className="w-16 h-0.5 mb-8"
            style={{
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />

          {/* Corpo */}
          <div className="space-y-5">
            {paragraphs.map((p, i) => {
              // Detecta citação (entre aspas)
              if (p.startsWith('"') || p.startsWith('"')) {
                return (
                  <blockquote
                    key={i}
                    className="relative pl-6 py-2 text-lg italic leading-relaxed"
                    style={{
                      color: "#D0D8E8",
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    {p}
                  </blockquote>
                );
              }
              return (
                <p
                  key={i}
                  className="text-base leading-[1.85]"
                  style={{ color: "#9AA2B4" }}
                >
                  {p}
                </p>
              );
            })}
          </div>

          {/* Fotos extras */}
          {noticia.fotosExtras && noticia.fotosExtras.length > 0 && (
            <div className="mt-10 space-y-5">
              {noticia.fotosExtras.map((foto, i) => (
                <figure key={i} className="rounded-xl overflow-hidden">
                  <img
                    src={foto.src}
                    alt={foto.legenda || `${noticia.titulo} — foto ${i + 2}`}
                    className="w-full h-auto object-cover rounded-xl"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  />
                  {foto.legenda && (
                    <figcaption
                      className="mt-3 text-xs text-center italic"
                      style={{ color: "#8A94A6" }}
                    >
                      {foto.legenda}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {/* Footer do modal */}
          <div
            className="mt-12 pt-8 flex flex-wrap gap-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-display font-semibold transition-colors"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#F5F7FA",
              }}
            >
              <ArrowLeft size={14} />
              Voltar para notícias
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Página ────────────────────────────────────────── */
export default function Noticias() {
  const [busca, setBusca] = useState("");
  const [catAtiva, setCatAtiva] = useState("Todos");
  const [selected, setSelected] = useState<Noticia | null>(null);

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return noticias.filter((n) => {
      if (catAtiva !== "Todos" && n.categoria !== catAtiva) return false;
      if (!termo) return true;
      return (
        n.titulo.toLowerCase().includes(termo) ||
        n.resumo.toLowerCase().includes(termo) ||
        n.categoria.toLowerCase().includes(termo)
      );
    });
  }, [busca, catAtiva]);

  return (
    <div className="min-h-screen" style={{ background: "#0A0F1C" }}>
      <Navbar />
      <NoticiasHero />

      {/* Filtros */}
      <section className="relative py-8" style={{ background: "#0D1220" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Busca */}
            <div
              className="flex items-center gap-3 flex-1 max-w-md px-4 py-3 rounded-xl border transition-colors"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <Search size={16} style={{ color: "#8A94A6" }} />
              <input
                type="search"
                placeholder="Buscar notícia..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-[#8A94A6]"
                style={{
                  color: "#F5F7FA",
                  fontFamily: "'Inter', sans-serif",
                }}
              />
            </div>

            {/* Categorias */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-thin">
              {CATEGORIAS.map((cat) => {
                const isActive = catAtiva === cat;
                const color =
                  cat === "Todos" ? "#00E0FF" : catColor(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setCatAtiva(cat)}
                    className="px-4 py-2 rounded-full text-xs font-display font-semibold transition-all whitespace-nowrap shrink-0"
                    style={{
                      background: isActive
                        ? `${color}22`
                        : "rgba(255,255,255,0.03)",
                      color: isActive ? color : "#8A94A6",
                      border: isActive
                        ? `1px solid ${color}55`
                        : "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Contador */}
            <span
              className="text-xs font-display font-semibold tracking-wider uppercase whitespace-nowrap"
              style={{ color: "#8A94A6" }}
            >
              {filtradas.length}{" "}
              {filtradas.length === 1 ? "notícia" : "notícias"}
            </span>
          </div>
        </div>
      </section>

      {/* Grid de notícias */}
      <section className="relative py-12 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtradas.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="text-lg font-display"
                style={{ color: "#8A94A6" }}
              >
                Nenhuma notícia encontrada.
              </p>
              <p className="text-sm mt-2" style={{ color: "#8A94A6" }}>
                Tente ajustar a busca ou selecionar outra categoria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtradas.map((n, i) => (
                <NoticiaCard
                  key={n.id}
                  noticia={n}
                  index={i}
                  onClick={() => setSelected(n)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <NoticiaModal
            noticia={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
