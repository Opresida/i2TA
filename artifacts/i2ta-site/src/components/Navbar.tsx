import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#sobre", label: "O Instituto" },
    { href: "#cultura", label: "Cultura" },
    { href: "#servicos", label: "Serviços" },
    { href: "#diferenciais", label: "Diferenciais" },
    { href: "#contato", label: "Contato" },
  ];

  const closeMenu = () => setMenuOpen(false);

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
          <a href="#" className="flex-shrink-0 flex items-center">
            <img
              src="https://i.imgur.com/bw6rmMQ.png"
              alt="i2TA - Instituto de Inteligência e Tecnologia Aplicada da Amazônia"
              className="h-10 md:h-12 object-contain transition-all duration-500"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-display tracking-wide transition-colors duration-200"
                style={{ color: "#8A94A6" }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#F5F7FA")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#8A94A6")
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <a
              href="#contato"
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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-display text-lg tracking-wide border-b pb-3 transition-colors"
                style={{
                  color: "#8A94A6",
                  borderColor: "rgba(255,255,255,0.05)",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "#F5F7FA")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "#8A94A6")
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
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
