import { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  Upload,
  Download,
  Image as ImageIcon,
  FileText,
  User,
  Briefcase,
  Sparkles,
  Info,
} from "lucide-react";
import BadgeFront from "@/components/badge/BadgeFront";
import BadgeBack from "@/components/badge/BadgeBack";
import {
  exportBadgeAsPNG,
  exportBadgePDF,
  BADGE_PX_W,
  BADGE_PX_H,
} from "@/lib/badgeExport";

const SITE_URL = "www.i2ta.org.br";
const PREVIEW_SCALE = 0.5; // 661×1040 → ~330×520 na tela

export default function BadgeGenerator() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // Limpa Object URL ao desmontar pra evitar memory leak
  useEffect(() => {
    return () => {
      if (photoUrl && photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setExportError("Selecione um arquivo de imagem válido (PNG, JPG).");
        return;
      }
      // Revoke anterior se existir
      if (photoUrl && photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      setExportError(null);
    },
    [photoUrl],
  );

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "cracha";

  const handleExportPDF = useCallback(async () => {
    if (!frontRef.current || !backRef.current) return;
    setIsExporting(true);
    setExportError(null);
    try {
      await exportBadgePDF(
        frontRef.current,
        backRef.current,
        `cracha-i2ta-${slugify(name)}.pdf`,
      );
    } catch (err: any) {
      console.error("Erro ao gerar PDF:", err);
      setExportError(err?.message || "Erro ao gerar o PDF.");
    } finally {
      setIsExporting(false);
    }
  }, [name]);

  const handleExportFrontPNG = useCallback(async () => {
    if (!frontRef.current) return;
    setIsExporting(true);
    setExportError(null);
    try {
      await exportBadgeAsPNG(
        frontRef.current,
        `cracha-i2ta-${slugify(name)}-frente.png`,
      );
    } catch (err: any) {
      console.error("Erro ao gerar PNG frente:", err);
      setExportError(err?.message || "Erro ao gerar o PNG da frente.");
    } finally {
      setIsExporting(false);
    }
  }, [name]);

  const handleExportBackPNG = useCallback(async () => {
    if (!backRef.current) return;
    setIsExporting(true);
    setExportError(null);
    try {
      await exportBadgeAsPNG(
        backRef.current,
        `cracha-i2ta-${slugify(name)}-verso.png`,
      );
    } catch (err: any) {
      console.error("Erro ao gerar PNG verso:", err);
      setExportError(err?.message || "Erro ao gerar o PNG do verso.");
    } finally {
      setIsExporting(false);
    }
  }, [name]);

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "linear-gradient(180deg, #0A0F1C 0%, #0D1729 50%, #0A0F1C 100%)",
      }}
    >
      {/* Glow blobs decorativos */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: "10%",
          left: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#7B3FE4",
          opacity: 0.06,
          filter: "blur(150px)",
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          bottom: "5%",
          right: "-200px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "#00E0FF",
          opacity: 0.06,
          filter: "blur(150px)",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a
            href="/brandbook"
            className="inline-flex items-center gap-2 text-sm text-[#8A94A6] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Brandbook
          </a>
          <Link
            href="/"
            className="font-[Space_Grotesk] font-bold text-white tracking-wider"
          >
            i2TA
          </Link>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Título */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00E0FF]/30 bg-[#00E0FF]/5 text-[#00E0FF] text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3 h-3" />
            Gerador de Peças
          </div>
          <h1 className="font-[Space_Grotesk] font-bold text-4xl md:text-5xl mb-3">
            Gerador de Crachá Institucional
          </h1>
          <p className="text-[#8A94A6] text-base md:text-lg max-w-2xl">
            Crie o seu crachá no padrão visual i2TA pronto para impressão na
            gráfica. Tamanho com sangria 661×1040 px (~55×88 mm).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Coluna esquerda: formulário */}
          <section className="lg:col-span-2">
            <div
              className="rounded-2xl p-6 border border-white/8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)",
              }}
            >
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#00E0FF] mb-5 flex items-center gap-2">
                <User className="w-3.5 h-3.5" />
                Dados do Crachá
              </h2>

              {/* Nome */}
              <label className="block mb-5">
                <span className="block text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2">
                  Nome completo *
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria Silva Santos"
                  className="w-full bg-[#0A0F1C]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00E0FF]/50 transition-colors"
                />
              </label>

              {/* Cargo */}
              <label className="block mb-5">
                <span className="block text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Cargo / Função *
                </span>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex: Pesquisadora em IA Aplicada"
                  className="w-full bg-[#0A0F1C]/60 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00E0FF]/50 transition-colors"
                />
              </label>

              {/* Foto */}
              <div className="block mb-5">
                <span className="block text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Foto (PNG ou JPG)
                </span>
                <label
                  htmlFor="photo-input"
                  className="flex items-center justify-center gap-2 cursor-pointer w-full bg-[#0A0F1C]/60 border border-dashed border-white/15 rounded-lg px-4 py-6 text-[#8A94A6] hover:border-[#00E0FF]/40 hover:text-white transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {photoUrl ? "Trocar foto" : "Selecionar foto"}
                  </span>
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                {photoUrl && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-[#8A94A6]">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden border border-[#00E0FF]/30"
                      style={{
                        background: "#0A0F1C",
                      }}
                    >
                      <img
                        src={photoUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>Foto carregada — pronta para o crachá.</span>
                  </div>
                )}
              </div>

              {/* Site (read-only) */}
              <label className="block mb-2">
                <span className="block text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2">
                  Site (sempre incluído)
                </span>
                <input
                  type="text"
                  value={SITE_URL}
                  readOnly
                  className="w-full bg-[#0A0F1C]/30 border border-white/5 rounded-lg px-4 py-3 text-[#8A94A6] text-sm cursor-not-allowed"
                />
              </label>
            </div>

            {/* Especificações técnicas */}
            <div className="mt-6 p-5 rounded-xl border border-white/5 bg-white/[0.015]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#7B3FE4] font-semibold mb-3 flex items-center gap-1.5">
                <Info className="w-3 h-3" />
                Especificações para Gráfica
              </div>
              <ul className="text-xs text-[#8A94A6] space-y-1.5">
                <li>
                  📐 Tamanho:{" "}
                  <span className="text-white">661 × 1040 px</span>{" "}
                  (~55 × 88 mm)
                </li>
                <li>
                  🩸 Sangria de <span className="text-white">3mm</span>{" "}
                  já inclusa
                </li>
                <li>
                  🖨️ Resolução:{" "}
                  <span className="text-white">300 DPI</span> efetivos
                </li>
                <li>
                  📄 PDF: <span className="text-white">2 páginas</span>{" "}
                  (frente + verso) em mm exatos
                </li>
              </ul>
            </div>
          </section>

          {/* Coluna direita: preview + downloads */}
          <section className="lg:col-span-3">
            <div
              className="rounded-2xl p-6 border border-white/8"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 100%)",
              }}
            >
              <h2 className="text-xs uppercase tracking-[0.2em] text-[#00E0FF] mb-5">
                🪪 Preview ao vivo
              </h2>

              {/* Container scrollável horizontal pra preview */}
              <div className="overflow-x-auto pb-4">
                <div className="flex items-start gap-6 justify-center min-w-fit">
                  {/* FRENTE — preview visível (sem ref, com scale) */}
                  <div className="flex flex-col items-center">
                    <div
                      style={{
                        width: BADGE_PX_W * PREVIEW_SCALE,
                        height: BADGE_PX_H * PREVIEW_SCALE,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${PREVIEW_SCALE})`,
                          transformOrigin: "top left",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          filter:
                            "drop-shadow(0 25px 60px rgba(0, 224, 255, 0.15))",
                        }}
                      >
                        <BadgeFront
                          name={name}
                          role={role}
                          photoUrl={photoUrl}
                        />
                      </div>
                    </div>
                    <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                      Frente
                    </span>
                  </div>

                  {/* VERSO — preview visível (sem ref, com scale) */}
                  <div className="flex flex-col items-center">
                    <div
                      style={{
                        width: BADGE_PX_W * PREVIEW_SCALE,
                        height: BADGE_PX_H * PREVIEW_SCALE,
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          transform: `scale(${PREVIEW_SCALE})`,
                          transformOrigin: "top left",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          filter:
                            "drop-shadow(0 25px 60px rgba(123, 63, 228, 0.15))",
                        }}
                      >
                        <BadgeBack siteUrl={SITE_URL} />
                      </div>
                    </div>
                    <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                      Verso
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/*
              Renders OFF-SCREEN em tamanho real (661×1040) para captura via html2canvas.
              Os refs apontam pra esses elementos, NÃO pros previews escalados.
              Posicionados fora da viewport via `position: fixed; left: -10000px`.
              `aria-hidden` + opacity 0 garantem que não interferem com acessibilidade ou layout.
            */}
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                top: 0,
                left: "-10000px",
                width: BADGE_PX_W,
                height: BADGE_PX_H,
                pointerEvents: "none",
              }}
            >
              <BadgeFront
                ref={frontRef}
                name={name}
                role={role}
                photoUrl={photoUrl}
              />
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "fixed",
                top: 0,
                left: "-10000px",
                width: BADGE_PX_W,
                height: BADGE_PX_H,
                pointerEvents: "none",
              }}
            >
              <BadgeBack ref={backRef} siteUrl={SITE_URL} />
            </div>

            {/* Downloads */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="group relative overflow-hidden col-span-1 sm:col-span-3 inline-flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
                  color: "#0A0F1C",
                }}
              >
                <FileText className="w-4 h-4" />
                {isExporting ? "Gerando PDF..." : "Baixar PDF (frente + verso)"}
              </button>

              <button
                onClick={handleExportFrontPNG}
                disabled={isExporting}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-[#00E0FF]/40 text-xs transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                PNG (frente)
              </button>

              <button
                onClick={handleExportBackPNG}
                disabled={isExporting}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-[#7B3FE4]/40 text-xs transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                PNG (verso)
              </button>

              <button
                onClick={() => {
                  setName("");
                  setRole("");
                  if (photoUrl?.startsWith("blob:")) {
                    URL.revokeObjectURL(photoUrl);
                  }
                  setPhotoUrl(null);
                  setExportError(null);
                }}
                disabled={isExporting}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-white/30 text-xs transition-all disabled:opacity-50"
              >
                Limpar
              </button>
            </div>

            {exportError && (
              <div className="mt-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs">
                ⚠️ {exportError}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
