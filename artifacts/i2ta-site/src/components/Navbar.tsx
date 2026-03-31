import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  const isNoticias = location === "/noticias";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const anchorLinks = [
    { href: "#sobre", label: "O Instituto" },
    { href: "#cultura", label: "Cultura" },
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#depoimentos", label: "Depoimentos" },
    { href: "#pesquisadores", label: "Pesquisadores" },
    { href: "#faq", label: "FAQ" },
    { href: "#contato", label: "Contato" },
  ];

  const closeMenu = () => setMenuOpen(false);

  const linkStyle = { color: "#8A94A6" };
  const linkHoverColor = "#F5F7FA";

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(10, 15, 28, 0.92)"
          : "rgba(10, 15, 28, 0.0)",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img
              src="https://i.imgur.com/bw6rmMQ.png"
              alt="i2TA - Instituto de Inteligência e Tecnologia Aplicada da Amazônia"
              className="h-10 md:h-12 object-contain transition-all duration-500"
            />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={isNoticias ? `/${link.href}` : link.href}
                className="text-sm font-display tracking-wide transition-colors duration-200"
                style={linkStyle}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = linkHoverColor)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#8A94A6")
                }
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/noticias"
              className="text-sm font-display tracking-wide transition-colors duration-200"
              style={{
                color: isNoticias ? "#00E0FF" : "#8A94A6",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#00E0FF")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = isNoticias ? "#00E0FF" : "#8A94A6")
              }
            >
              Notícias
            </Link>
          </div>

          <div className="hidden lg:block">
            <a
              href={isNoticias ? "/#contato" : "#contato"}
              className="btn-primary text-sm py-2.5 px-6 rounded-lg"
            >
              Fale Conosco
            </a>
          </div>

          <button
            className="lg:hidden p-2 rounded-md transition-colors"
            style={{ color: "#8A94A6" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden absolute top-20 left-0 w-full border-b shadow-2xl"
          style={{
            background: "rgba(10, 15, 28, 0.97)",
            backdropFilter: "blur(24px)",
            borderColor: "rgba(255,255,255,0.05)",
          }}
        >
          <div className="px-6 py-8 flex flex-col gap-4 text-center">
            {anchorLinks.map((link) => (
              <a
                key={link.href}
                href={isNoticias ? `/${link.href}` : link.href}
                onClick={closeMenu}
                className="font-display text-lg tracking-wide border-b pb-3 transition-colors"
                style={{
                  color: "#8A94A6",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = linkHoverColor)
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#8A94A6")
                }
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/noticias"
              onClick={closeMenu}
              className="font-display text-lg tracking-wide border-b pb-3 transition-colors"
              style={{
                color: isNoticias ? "#00E0FF" : "#8A94A6",
                borderColor: "rgba(255,255,255,0.05)",
              }}
            >
              Notícias
            </Link>
            <a
              href={isNoticias ? "/#contato" : "#contato"}
              onClick={closeMenu}
              className="btn-primary w-full mt-4 py-3 rounded-lg"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
