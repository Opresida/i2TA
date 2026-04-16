import { Link } from "wouter";
import { noticias } from "@/data/noticias";

const CATEGORY_COLORS: Record<string, string> = {
  "PD&I": "#7B3FE4",
  "IA Aplicada": "#00E0FF",
  "Saúde Digital": "#00FF9C",
  "Formação": "#FFC857",
  "Transferência de Tecnologia": "#FF4D6D",
  "Geral": "#8A94A6",
};

function NewsCard({ noticia }: { noticia: (typeof noticias)[0] }) {
  const color = CATEGORY_COLORS[noticia.categoria] ?? "#8A94A6";

  return (
    <Link
      href="/noticias"
      className="news-card group flex-shrink-0 rounded-2xl overflow-hidden"
      style={{
        width: "300px",
        background: "rgba(255,255,255,0.025)",
        border: `1px solid rgba(255,255,255,0.07)`,
        textDecoration: "none",
        ["--card-hover-border" as string]: `${color}40`,
      }}
    >
      <div className="news-card-image-wrapper relative overflow-hidden" style={{ height: "160px" }}>
        {noticia.semFoto ? (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${color}15, rgba(10,15,28,0.95))` }}
          >
            <span className="font-display text-4xl font-black select-none" style={{ color: `${color}18` }} aria-hidden="true">i2TA</span>
          </div>
        ) : (
          <img
            src={noticia.imagemUrl}
            alt={noticia.titulo}
            className="news-card-image w-full h-full object-cover"
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,15,28,0.7) 0%, transparent 60%)" }}
        />
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: `${color}18`,
              color,
              border: `1px solid ${color}30`,
            }}
          >
            {noticia.categoria}
          </span>
          <span className="text-xs" style={{ color: "#8A94A6" }}>
            {noticia.data}
          </span>
        </div>

        <h3
          className="font-display font-semibold leading-snug"
          style={{
            color: "#F5F7FA",
            fontSize: "0.875rem",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {noticia.titulo}
        </h3>

        <p
          className="text-xs leading-relaxed"
          style={{
            color: "#8A94A6",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {noticia.resumo}
        </p>
      </div>
    </Link>
  );
}

export default function NewsCarousel() {
  const duplicated = [...noticias, ...noticias];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: "#0A0F1C" }}
    >
      <div className="noise-bg" />
      <div
        className="glow-blob"
        style={{ width: "500px", height: "500px", background: "#00E0FF", top: "20%", left: "30%", opacity: 0.04 }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 reveal">
          <div>
            <span className="section-tag">Fique por dentro</span>
            <h2
              className="font-display font-bold tracking-tight"
              style={{ color: "#F5F7FA", fontSize: "clamp(1.75rem, 3.5vw, 2.8rem)" }}
            >
              Últimas <span className="text-gradient">Notícias</span>
            </h2>
            <p className="mt-2 text-base max-w-xl" style={{ color: "#8A94A6" }}>
              Acompanhe os projetos, pesquisas e iniciativas mais recentes do i2TA.
            </p>
          </div>
          <Link
            href="/noticias"
            className="news-all-link inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl"
            style={{
              background: "rgba(123,63,228,0.15)",
              border: "1px solid rgba(123,63,228,0.35)",
              color: "#A67BFF",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            Ver todas as notícias
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7H11M7 3L11 7L7 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div
          className="news-carousel-track flex gap-5 py-2"
          style={{ width: "max-content" }}
        >
          {duplicated.map((noticia, index) => (
            <NewsCard key={`${noticia.id}-${index}`} noticia={noticia} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes news-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .news-carousel-track {
          animation: news-marquee 45s linear infinite;
        }

        .news-carousel-track:hover {
          animation-play-state: paused;
        }

        .news-card {
          transition: border-color 0.3s ease, transform 0.3s ease;
        }

        .news-card:hover {
          border-color: var(--card-hover-border) !important;
          transform: translateY(-4px);
        }

        .news-card-image {
          transition: transform 0.5s ease;
        }

        .news-card:hover .news-card-image {
          transform: scale(1.05);
        }

        .news-all-link {
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .news-all-link:hover {
          background: rgba(123,63,228,0.25) !important;
          border-color: rgba(123,63,228,0.6) !important;
        }
      `}</style>
    </section>
  );
}
