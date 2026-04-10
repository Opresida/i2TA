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
  Sliders,
  RotateCcw,
  Wand2,
  Loader2,
} from "lucide-react";
import BadgeFront from "@/components/badge/BadgeFront";
import BadgeBack from "@/components/badge/BadgeBack";
import PhotoCropEditor from "@/components/badge/PhotoCropEditor";
import {
  exportBadgeAsPNG,
  exportBadgePDF,
  BADGE_PX_W,
  BADGE_PX_H,
} from "@/lib/badgeExport";
import {
  removeImageBackground,
  isLibLoaded,
} from "@/lib/backgroundRemoval";

const SITE_URL = "www.i2ta.org.br";
const PREVIEW_SCALE = 0.5;

/**
 * Converte um Blob em dataURL base64.
 *
 * Usado pra evitar bug de Object URL (`blob:`) com html-to-image:
 * quando o lib clona o DOM, ele cria novos <img> com o src do blob, e
 * em alguns timings esses novos elementos disparam error event mesmo
 * com a original válida. DataURL é inline, síncrono, zero risco.
 */
function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Falha ao ler imagem"));
    reader.readAsDataURL(blob);
  });
}

// ============================================================
// Defaults + Limites — FRENTE
// Valores aprovados pelo cliente em 2026-04-10
// (anteriores: logo 150, name 42, role 18, photo 268, offset 0)
// ============================================================
const DEFAULTS_FRONT = {
  logoSize: 260,
  nameSize: 51,
  roleSize: 31,
  photoSize: 272,
  photoOffsetY: 2,
};

const LIMITS_FRONT = {
  logoSize: { min: 120, max: 260, step: 5 },
  nameSize: { min: 32, max: 56, step: 1 },
  roleSize: { min: 14, max: 32, step: 1 },
  photoSize: { min: 220, max: 320, step: 4 },
  photoOffsetY: { min: -40, max: 40, step: 2 },
};

// ============================================================
// Defaults + Limites — VERSO
// Valores aprovados pelo cliente em 2026-04-10
// (anteriores: logo 220, tagline 26, mission 12, url 16, qr 70, offset 0)
// ============================================================
const DEFAULTS_BACK = {
  logoSize: 300,
  taglineSize: 34,
  missionSize: 17,
  urlSize: 22,
  qrSize: 98,
  contentOffsetY: 22,
  showQRCode: true,
};

const LIMITS_BACK = {
  logoSize: { min: 180, max: 300, step: 5 },
  taglineSize: { min: 20, max: 36, step: 1 },
  missionSize: { min: 10, max: 18, step: 1 },
  urlSize: { min: 12, max: 24, step: 1 },
  qrSize: { min: 50, max: 110, step: 2 },
  contentOffsetY: { min: -60, max: 60, step: 2 },
};

export default function BadgeGenerator() {
  // ============================================================
  // Estado: dados do crachá
  // ============================================================
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  // ============================================================
  // Estado: foto (3 versões) — fluxo upload → crop → bg removal
  // ============================================================
  // 1. Original (URL temporário pra abrir no editor de crop)
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState<string | null>(null);
  // 2. Cropped (blob 1:1 — source of truth, persiste mesmo se reprocessar bg)
  const [croppedPhotoBlob, setCroppedPhotoBlob] = useState<Blob | null>(null);
  // 3. Final (URL no badge — pode ser cropped puro OU cropped + bg removido)
  const [finalPhotoUrl, setFinalPhotoUrl] = useState<string | null>(null);
  // Modal de crop aberto?
  const [showCropEditor, setShowCropEditor] = useState(false);

  // ============================================================
  // Estado: remoção de fundo
  // ============================================================
  const [removeBgEnabled, setRemoveBgEnabled] = useState(false);
  const [bgProcessing, setBgProcessing] = useState(false);
  const [bgMessage, setBgMessage] = useState<string | null>(null);
  const [bgPercent, setBgPercent] = useState<number | null>(null);
  const [bgError, setBgError] = useState<string | null>(null);

  // ============================================================
  // Estado: sliders FRENTE
  // ============================================================
  const [logoSize, setLogoSize] = useState(DEFAULTS_FRONT.logoSize);
  const [nameSize, setNameSize] = useState(DEFAULTS_FRONT.nameSize);
  const [roleSize, setRoleSize] = useState(DEFAULTS_FRONT.roleSize);
  const [photoSize, setPhotoSize] = useState(DEFAULTS_FRONT.photoSize);
  const [photoOffsetY, setPhotoOffsetY] = useState(DEFAULTS_FRONT.photoOffsetY);

  // ============================================================
  // Estado: sliders VERSO
  // ============================================================
  const [backLogoSize, setBackLogoSize] = useState(DEFAULTS_BACK.logoSize);
  const [taglineSize, setTaglineSize] = useState(DEFAULTS_BACK.taglineSize);
  const [missionSize, setMissionSize] = useState(DEFAULTS_BACK.missionSize);
  const [urlSize, setUrlSize] = useState(DEFAULTS_BACK.urlSize);
  const [qrSize, setQrSize] = useState(DEFAULTS_BACK.qrSize);
  const [backContentOffsetY, setBackContentOffsetY] = useState(
    DEFAULTS_BACK.contentOffsetY,
  );
  const [showQRCode, setShowQRCode] = useState(DEFAULTS_BACK.showQRCode);

  // ============================================================
  // Estado: export
  // ============================================================
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Refs pros componentes off-screen (capturados pelo html2canvas)
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // Cleanup de Object URLs ao desmontar
  // ============================================================
  useEffect(() => {
    return () => {
      if (originalPhotoUrl?.startsWith("blob:"))
        URL.revokeObjectURL(originalPhotoUrl);
      if (finalPhotoUrl?.startsWith("blob:"))
        URL.revokeObjectURL(finalPhotoUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ============================================================
  // Handler: upload de foto
  // ============================================================
  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setExportError("Selecione um arquivo de imagem válido (PNG, JPG).");
        return;
      }
      // Revoke anterior
      if (originalPhotoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(originalPhotoUrl);
      }
      const url = URL.createObjectURL(file);
      setOriginalPhotoUrl(url);
      setShowCropEditor(true);
      setExportError(null);
      // Reset do input pra permitir reupload do mesmo arquivo
      e.target.value = "";
    },
    [originalPhotoUrl],
  );

  // ============================================================
  // Handler: confirmar crop
  // ============================================================
  const handleCropConfirm = useCallback(
    async (croppedBlob: Blob) => {
      setShowCropEditor(false);
      setCroppedPhotoBlob(croppedBlob);

      // Atualiza o finalPhotoUrl baseado no estado do checkbox de bg removal
      await applyPhotoTransformations(croppedBlob, removeBgEnabled);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [removeBgEnabled],
  );

  // ============================================================
  // Aplicar transformações na foto (bg removal opcional)
  // ============================================================
  const applyPhotoTransformations = useCallback(
    async (blob: Blob, shouldRemoveBg: boolean) => {
      // Revoke URL anterior se for Object URL legado (não é mais o caso, mas safety)
      if (finalPhotoUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(finalPhotoUrl);
      }

      if (!shouldRemoveBg) {
        // Sem bg removal: usa o blob cropped direto convertido pra dataURL
        try {
          const dataUrl = await blobToDataUrl(blob);
          setFinalPhotoUrl(dataUrl);
          setBgError(null);
        } catch (err) {
          setBgError("Falha ao processar imagem.");
        }
        return;
      }

      // Com bg removal: processa
      setBgProcessing(true);
      setBgError(null);
      setBgMessage("Iniciando...");
      setBgPercent(null);

      const result = await removeImageBackground(blob, (msg, pct) => {
        setBgMessage(msg);
        setBgPercent(pct);
      });

      setBgProcessing(false);

      if (result.ok && result.blob) {
        try {
          const dataUrl = await blobToDataUrl(result.blob);
          setFinalPhotoUrl(dataUrl);
          setBgMessage(null);
          setBgPercent(null);
        } catch (err) {
          setBgError("Falha ao processar imagem após remoção de fundo.");
        }
      } else {
        // Fallback: usa a foto sem remover fundo (também como dataURL)
        try {
          const dataUrl = await blobToDataUrl(blob);
          setFinalPhotoUrl(dataUrl);
        } catch (err) {
          setBgError("Falha ao processar imagem.");
        }
        setBgError(
          result.error ||
            "Não conseguimos remover o fundo. Usando a foto original.",
        );
        setBgMessage(null);
        setBgPercent(null);
      }
    },
    [finalPhotoUrl],
  );

  // ============================================================
  // Reagir a mudanças no checkbox de bg removal
  // ============================================================
  const handleToggleBgRemoval = useCallback(
    async (checked: boolean) => {
      setRemoveBgEnabled(checked);
      // Se já tem foto cropped, reaplica
      if (croppedPhotoBlob) {
        await applyPhotoTransformations(croppedPhotoBlob, checked);
      }
    },
    [croppedPhotoBlob, applyPhotoTransformations],
  );

  // ============================================================
  // Reset sliders — FRENTE
  // ============================================================
  const handleResetFront = useCallback(() => {
    setLogoSize(DEFAULTS_FRONT.logoSize);
    setNameSize(DEFAULTS_FRONT.nameSize);
    setRoleSize(DEFAULTS_FRONT.roleSize);
    setPhotoSize(DEFAULTS_FRONT.photoSize);
    setPhotoOffsetY(DEFAULTS_FRONT.photoOffsetY);
  }, []);

  // ============================================================
  // Reset sliders — VERSO
  // ============================================================
  const handleResetBack = useCallback(() => {
    setBackLogoSize(DEFAULTS_BACK.logoSize);
    setTaglineSize(DEFAULTS_BACK.taglineSize);
    setMissionSize(DEFAULTS_BACK.missionSize);
    setUrlSize(DEFAULTS_BACK.urlSize);
    setQrSize(DEFAULTS_BACK.qrSize);
    setBackContentOffsetY(DEFAULTS_BACK.contentOffsetY);
    setShowQRCode(DEFAULTS_BACK.showQRCode);
  }, []);

  // ============================================================
  // Reset tudo
  // ============================================================
  const handleResetAll = useCallback(() => {
    setName("");
    setRole("");
    if (originalPhotoUrl?.startsWith("blob:"))
      URL.revokeObjectURL(originalPhotoUrl);
    if (finalPhotoUrl?.startsWith("blob:"))
      URL.revokeObjectURL(finalPhotoUrl);
    setOriginalPhotoUrl(null);
    setCroppedPhotoBlob(null);
    setFinalPhotoUrl(null);
    setRemoveBgEnabled(false);
    setBgError(null);
    setExportError(null);
    handleResetFront();
    handleResetBack();
  }, [originalPhotoUrl, finalPhotoUrl, handleResetFront, handleResetBack]);

  // ============================================================
  // Slugify pra nome do arquivo
  // ============================================================
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "cracha";

  // ============================================================
  // Handlers de export
  // ============================================================
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
      console.error("Erro PDF:", err);
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
      setExportError(err?.message || "Erro ao gerar o PNG do verso.");
    } finally {
      setIsExporting(false);
    }
  }, [name]);

  // ============================================================
  // Render
  // ============================================================
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
          {/* ====================================================
              Coluna esquerda: formulário + sliders
              ==================================================== */}
          <section className="lg:col-span-2 space-y-6">
            {/* Bloco: Dados */}
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
                <span className="text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2 flex items-center gap-1">
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

              {/* Foto upload */}
              <div className="block mb-5">
                <span className="text-[11px] uppercase tracking-wider text-[#8A94A6] mb-2 flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" />
                  Foto (PNG, JPG, WebP)
                </span>
                <label
                  htmlFor="photo-input"
                  className="flex items-center justify-center gap-2 cursor-pointer w-full bg-[#0A0F1C]/60 border border-dashed border-white/15 rounded-lg px-4 py-6 text-[#8A94A6] hover:border-[#00E0FF]/40 hover:text-white transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">
                    {finalPhotoUrl ? "Trocar foto" : "Selecionar foto"}
                  </span>
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {finalPhotoUrl && !bgProcessing && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-[#8A94A6]">
                    <div
                      className="w-12 h-12 rounded-full overflow-hidden border border-[#00E0FF]/30"
                      style={{ background: "#0A0F1C" }}
                    >
                      <img
                        src={finalPhotoUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-white">Foto carregada</div>
                      <button
                        onClick={() => {
                          if (originalPhotoUrl) setShowCropEditor(true);
                        }}
                        className="text-[10px] text-[#00E0FF] hover:text-white"
                      >
                        Reajustar crop ↻
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkbox: remover fundo */}
              <label
                className="block p-3 rounded-lg border border-white/8 bg-[#0A0F1C]/40 hover:border-[#7B3FE4]/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={removeBgEnabled}
                    onChange={(e) => handleToggleBgRemoval(e.target.checked)}
                    disabled={bgProcessing}
                    className="mt-1 accent-[#7B3FE4]"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-white flex items-center gap-1.5">
                      <Wand2 className="w-3.5 h-3.5 text-[#7B3FE4]" />
                      Remover fundo automaticamente
                    </div>
                    <div className="text-[10px] text-[#8A94A6] mt-1">
                      {isLibLoaded()
                        ? "Modelo já em cache · processamento rápido"
                        : "1ª vez baixa modelo de IA (~40 MB) · próximas usam cache local"}
                    </div>
                  </div>
                </div>
              </label>

              {/* Loading state do bg removal */}
              {bgProcessing && (
                <div className="mt-3 p-3 rounded-lg border border-[#7B3FE4]/30 bg-[#7B3FE4]/5">
                  <div className="flex items-center gap-2 text-xs text-[#F5F7FA]">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#00E0FF]" />
                    <span>{bgMessage || "Processando..."}</span>
                  </div>
                  {bgPercent !== null && (
                    <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${bgPercent}%`,
                          background:
                            "linear-gradient(90deg, #7B3FE4, #00E0FF)",
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Erro do bg removal */}
              {bgError && !bgProcessing && (
                <div className="mt-3 p-2 rounded-lg border border-amber-500/30 bg-amber-500/5 text-amber-300 text-[11px]">
                  ⚠️ {bgError}
                </div>
              )}

              {/* Site (read-only) */}
              <label className="block mt-5">
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

            {/* ====================================================
                Bloco: Ajustes da FRENTE (header CIANO)
                ==================================================== */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0, 224, 255, 0.04) 0%, rgba(255,255,255,0.005) 100%)",
                borderColor: "rgba(0, 224, 255, 0.18)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#00E0FF] flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5" />
                  🔹 Ajustes da FRENTE
                </h2>
                <button
                  onClick={handleResetFront}
                  className="inline-flex items-center gap-1 text-[10px] text-[#8A94A6] hover:text-white"
                  title="Voltar pros valores padrão da frente"
                >
                  <RotateCcw className="w-3 h-3" />
                  Padrão
                </button>
              </div>

              <SliderRow
                label="Tamanho da logo"
                value={logoSize}
                unit="px"
                limits={LIMITS_FRONT.logoSize}
                onChange={setLogoSize}
                accent="cyan"
              />
              <SliderRow
                label="Tamanho do nome"
                value={nameSize}
                unit="px"
                limits={LIMITS_FRONT.nameSize}
                onChange={setNameSize}
                accent="cyan"
              />
              <SliderRow
                label="Tamanho do cargo"
                value={roleSize}
                unit="px"
                limits={LIMITS_FRONT.roleSize}
                onChange={setRoleSize}
                accent="cyan"
              />
              <SliderRow
                label="Tamanho da foto"
                value={photoSize}
                unit="px"
                limits={LIMITS_FRONT.photoSize}
                onChange={setPhotoSize}
                accent="cyan"
              />
              <SliderRow
                label="Posição vertical da foto"
                value={photoOffsetY}
                unit="px"
                limits={LIMITS_FRONT.photoOffsetY}
                onChange={setPhotoOffsetY}
                accent="cyan"
              />
            </div>

            {/* ====================================================
                Bloco: Ajustes do VERSO (header ROXO)
                ==================================================== */}
            <div
              className="rounded-2xl p-6 border"
              style={{
                background:
                  "linear-gradient(145deg, rgba(123, 63, 228, 0.05) 0%, rgba(255,255,255,0.005) 100%)",
                borderColor: "rgba(123, 63, 228, 0.22)",
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xs uppercase tracking-[0.2em] text-[#7B3FE4] flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5" />
                  🔸 Ajustes do VERSO
                </h2>
                <button
                  onClick={handleResetBack}
                  className="inline-flex items-center gap-1 text-[10px] text-[#8A94A6] hover:text-white"
                  title="Voltar pros valores padrão do verso"
                >
                  <RotateCcw className="w-3 h-3" />
                  Padrão
                </button>
              </div>

              <SliderRow
                label="Tamanho do logo"
                value={backLogoSize}
                unit="px"
                limits={LIMITS_BACK.logoSize}
                onChange={setBackLogoSize}
                accent="purple"
              />
              <SliderRow
                label="Tamanho da tagline"
                value={taglineSize}
                unit="px"
                limits={LIMITS_BACK.taglineSize}
                onChange={setTaglineSize}
                accent="purple"
              />
              <SliderRow
                label="Tamanho do texto da missão"
                value={missionSize}
                unit="px"
                limits={LIMITS_BACK.missionSize}
                onChange={setMissionSize}
                accent="purple"
              />
              <SliderRow
                label="Tamanho da URL"
                value={urlSize}
                unit="px"
                limits={LIMITS_BACK.urlSize}
                onChange={setUrlSize}
                accent="purple"
              />
              <SliderRow
                label="Tamanho do QR code"
                value={qrSize}
                unit="px"
                limits={LIMITS_BACK.qrSize}
                onChange={setQrSize}
                accent="purple"
              />
              <SliderRow
                label="Posição vertical do conteúdo"
                value={backContentOffsetY}
                unit="px"
                limits={LIMITS_BACK.contentOffsetY}
                onChange={setBackContentOffsetY}
                accent="purple"
              />

              {/* Toggle Mostrar QR */}
              <label className="flex items-center gap-2 mt-4 pt-4 border-t border-white/8 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showQRCode}
                  onChange={(e) => setShowQRCode(e.target.checked)}
                  className="accent-[#7B3FE4]"
                />
                <span className="text-[11px] text-[#8A94A6]">
                  Mostrar QR code no verso
                </span>
              </label>
            </div>

            {/* Especificações técnicas */}
            <div className="p-5 rounded-xl border border-white/5 bg-white/[0.015]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#7B3FE4] font-semibold mb-3 flex items-center gap-1.5">
                <Info className="w-3 h-3" />
                Especificações para Gráfica
              </div>
              <ul className="text-xs text-[#8A94A6] space-y-1.5">
                <li>
                  📐 Tamanho:{" "}
                  <span className="text-white">661 × 1040 px</span> (~55 × 88
                  mm)
                </li>
                <li>
                  🩸 Sangria de <span className="text-white">3mm</span> já
                  inclusa
                </li>
                <li>
                  🖨️ Resolução:{" "}
                  <span className="text-white">300 DPI</span> efetivos
                </li>
                <li>
                  📄 PDF:{" "}
                  <span className="text-white">2 páginas</span> (frente +
                  verso) em mm exatos
                </li>
              </ul>
            </div>
          </section>

          {/* ====================================================
              Coluna direita: preview + downloads
              Sticky no desktop (lg+): acompanha o scroll quando o usuário
              mexe nos sliders dos painéis de baixo. No mobile fica no flow
              normal pra não atrapalhar.
              ==================================================== */}
          <section className="lg:col-span-3">
            <div className="lg:sticky lg:top-6 space-y-6">
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

              <div className="overflow-x-auto pb-4">
                <div className="flex items-start gap-6 justify-center min-w-fit">
                  {/* FRENTE — preview visível (com scale, sem ref) */}
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
                          photoUrl={finalPhotoUrl}
                          logoSize={logoSize}
                          nameSize={nameSize}
                          roleSize={roleSize}
                          photoSize={photoSize}
                          photoOffsetY={photoOffsetY}
                        />
                      </div>
                    </div>
                    <span className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#8A94A6]">
                      Frente
                    </span>
                  </div>

                  {/* VERSO — preview visível (com scale, sem ref) */}
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
                        <BadgeBack
                          siteUrl={SITE_URL}
                          logoSize={backLogoSize}
                          taglineSize={taglineSize}
                          missionSize={missionSize}
                          urlSize={urlSize}
                          qrSize={qrSize}
                          contentOffsetY={backContentOffsetY}
                          showQRCode={showQRCode}
                        />
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
                photoUrl={finalPhotoUrl}
                logoSize={logoSize}
                nameSize={nameSize}
                roleSize={roleSize}
                photoSize={photoSize}
                photoOffsetY={photoOffsetY}
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
              <BadgeBack
                ref={backRef}
                siteUrl={SITE_URL}
                logoSize={backLogoSize}
                taglineSize={taglineSize}
                missionSize={missionSize}
                urlSize={urlSize}
                qrSize={qrSize}
                contentOffsetY={backContentOffsetY}
                showQRCode={showQRCode}
              />
            </div>

            {/* Downloads */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleExportPDF}
                disabled={isExporting || bgProcessing}
                className="group relative overflow-hidden col-span-1 sm:col-span-3 inline-flex items-center justify-center gap-2.5 py-4 px-5 rounded-xl font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
                  color: "#0A0F1C",
                }}
              >
                <FileText className="w-4 h-4" />
                {isExporting
                  ? "Gerando PDF..."
                  : "Baixar PDF (frente + verso)"}
              </button>

              <button
                onClick={handleExportFrontPNG}
                disabled={isExporting || bgProcessing}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-[#00E0FF]/40 text-xs transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                PNG (frente)
              </button>

              <button
                onClick={handleExportBackPNG}
                disabled={isExporting || bgProcessing}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-[#7B3FE4]/40 text-xs transition-all disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                PNG (verso)
              </button>

              <button
                onClick={handleResetAll}
                disabled={isExporting || bgProcessing}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 text-[#8A94A6] hover:text-white hover:border-white/30 text-xs transition-all disabled:opacity-50"
              >
                Limpar tudo
              </button>
            </div>

            {exportError && (
              <div className="mt-4 p-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-300 text-xs">
                ⚠️ {exportError}
              </div>
            )}
            </div>
          </section>
        </div>
      </main>

      {/* Modal de crop editor */}
      {showCropEditor && originalPhotoUrl && (
        <PhotoCropEditor
          imageUrl={originalPhotoUrl}
          outputSize={600}
          onConfirm={handleCropConfirm}
          onCancel={() => setShowCropEditor(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// Componente auxiliar: SliderRow
// ============================================================================
interface SliderRowProps {
  label: string;
  value: number;
  unit: string;
  limits: { min: number; max: number; step: number };
  onChange: (v: number) => void;
  /** Cor de destaque do slider — define qual painel ele pertence */
  accent?: "cyan" | "purple";
}

function SliderRow({
  label,
  value,
  unit,
  limits,
  onChange,
  accent = "cyan",
}: SliderRowProps) {
  // Cores baseadas no accent
  const valueColor = accent === "cyan" ? "#00E0FF" : "#A78BFA";
  const trackStart = accent === "cyan" ? "#00E0FF" : "#7B3FE4";
  const trackEnd = accent === "cyan" ? "#7B3FE4" : "#00E0FF";
  const percent = ((value - limits.min) / (limits.max - limits.min)) * 100;

  return (
    <div className="mb-4 last:mb-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] text-[#8A94A6]">{label}</span>
        <span
          className="text-[11px] font-mono"
          style={{ color: valueColor }}
        >
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer slider-themed"
        style={{
          background: `linear-gradient(to right,
            ${trackStart} 0%,
            ${trackEnd} ${percent}%,
            rgba(255,255,255,0.08) ${percent}%,
            rgba(255,255,255,0.08) 100%)`,
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
      />
      <style>{`
        .slider-themed::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%);
          border: 2px solid #0A0F1C;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 224, 255, 0.5);
        }
        .slider-themed::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%);
          border: 2px solid #0A0F1C;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 224, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
