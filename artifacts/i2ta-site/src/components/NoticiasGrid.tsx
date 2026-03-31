import { motion } from "framer-motion";
import { Clock, Calendar, Tag } from "lucide-react";
import type { Noticia } from "@/data/noticias";

const CATEGORIA_COLORS: Record<string, string> = {
  "PD&I": "#7B3FE4",
  "IA Aplicada": "#00E0FF",
  "Saúde Digital": "#00C896",
  "Formação": "#F5A623",
  "Transferência de Tecnologia": "#FF4D6D",
  "Geral": "#8A94A6",
};

function getCategoriaColor(cat: string) {
  return CATEGORIA_COLORS[cat] ?? "#8A94A6";
}

function CardDestaque({ noticia, index }: { noticia: Noticia; index: number }) {
  const color = getCategoriaColor(noticia.categoria);
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group rounded-2xl overflow-hidden border flex flex-col cursor-pointer"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="relative overflow-hidden" style={{ height: "240px" }}>
        <img
          src={noticia.imagemUrl}
          alt={noticia.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(6,10,20,0.9) 0%, rgba(6,10,20,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="absolute top-4 left-4">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-display font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${color}22`,
              color: color,
              border: `1px solid ${color}44`,
            }}
          >
            <Tag size={10} />
            {noticia.categoria}
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-3">
        <div className="flex items-center gap-4 text-xs" style={{ color: "#8A94A6" }}>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {noticia.data}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {noticia.tempoLeitura} min de leitura
          </span>
        </div>

        <h2
          className="font-display font-bold text-lg leading-snug group-hover:text-cyan-400 transition-colors"
          style={{ color: "#F5F7FA" }}
        >
          {noticia.titulo}
        </h2>

        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: "#8A94A6" }}>
          {noticia.resumo}
        </p>

        <div className="mt-auto pt-3">
          <span
            className="text-sm font-display font-semibold transition-colors"
            style={{ color: color }}
          >
            Ler mais →
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

function CardCompacto({ noticia, index }: { noticia: Noticia; index: number }) {
  const color = getCategoriaColor(noticia.categoria);
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group rounded-xl overflow-hidden border flex gap-4 cursor-pointer p-4 transition-colors duration-200"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
      whileHover={{
        background: "rgba(255,255,255,0.04)",
        borderColor: "rgba(123,63,228,0.25)",
        transition: { duration: 0.15 },
      }}
    >
      <div
        className="flex-shrink-0 rounded-lg overflow-hidden"
        style={{ width: "100px", height: "100px" }}
      >
        <img
          src={noticia.imagemUrl}
          alt={noticia.titulo}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-display font-semibold"
            style={{ color }}
          >
            {noticia.categoria}
          </span>
          <span className="text-xs" style={{ color: "#8A94A6" }}>·</span>
          <span className="text-xs" style={{ color: "#8A94A6" }}>
            {noticia.data}
          </span>
        </div>

        <h3
          className="font-display font-semibold text-sm leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors"
          style={{ color: "#F5F7FA" }}
        >
          {noticia.titulo}
        </h3>

        <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "#8A94A6" }}>
          {noticia.resumo}
        </p>

        <span className="text-xs flex items-center gap-1" style={{ color: "#8A94A6" }}>
          <Clock size={10} />
          {noticia.tempoLeitura} min
        </span>
      </div>
    </motion.article>
  );
}

interface NoticiasGridProps {
  noticias: Noticia[];
}

export default function NoticiasGrid({ noticias }: NoticiasGridProps) {
  if (noticias.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg font-display" style={{ color: "#8A94A6" }}>
          Nenhuma notícia encontrada para os filtros selecionados.
        </p>
        <p className="text-sm mt-2" style={{ color: "#8A94A6" }}>
          Tente ajustar a busca ou selecionar outra categoria.
        </p>
      </div>
    );
  }

  const destaques = noticias.slice(0, 2);
  const demais = noticias.slice(2);

  return (
    <div className="flex flex-col gap-10">
      {destaques.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destaques.map((n, i) => (
            <CardDestaque key={n.id} noticia={n} index={i} />
          ))}
        </div>
      )}

      {demais.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {demais.map((n, i) => (
            <CardCompacto key={n.id} noticia={n} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
