import jsPDF from "jspdf";
import html2canvas from "html2canvas";

/**
 * Tamanho do crachá:
 * - Pixels com sangria: 661 × 1040 (recomendado pela gráfica)
 * - 661px @ 300 DPI = 55.96 mm
 * - 1040px @ 300 DPI = 88.05 mm
 * - Formato vertical lanyard padrão (~55×88mm)
 */
export const BADGE_PX_W = 661;
export const BADGE_PX_H = 1040;
export const BADGE_MM_W = 55.96;
export const BADGE_MM_H = 88.05;

/**
 * Garante que as fontes Google (Inter + Space Grotesk) estejam carregadas
 * antes de capturar o DOM. html2canvas não espera fontes por padrão e pode
 * renderizar com font fallback se chamado cedo demais.
 */
async function waitForFonts() {
  if (typeof document !== "undefined" && (document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {
      /* ignore */
    }
  }
  // Aguarda 1 frame de animação pra garantir que tudo foi pintado
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

/**
 * Captura um elemento DOM como canvas em alta resolução para impressão.
 *
 * Notas técnicas:
 * - O elemento deve ter tamanho REAL 661×1040 (não escalado por transform).
 *   Use o pattern de off-screen render (position: fixed; left: -10000px) e passe
 *   o ref do elemento off-screen, NÃO de um preview escalado.
 * - `backgroundColor` setado pra cor de fundo do crachá (não null) — null
 *   causa "createPattern with 0 dimensions" em alguns casos.
 */
async function captureBadge(element: HTMLElement, scale: number) {
  await waitForFonts();
  return html2canvas(element, {
    width: BADGE_PX_W,
    height: BADGE_PX_H,
    scale,
    backgroundColor: "#0A0F1C",
    useCORS: true,
    allowTaint: false,
    logging: false,
    foreignObjectRendering: false,
    windowWidth: BADGE_PX_W,
    windowHeight: BADGE_PX_H,
  });
}

/**
 * Exporta um único lado do crachá como PNG (alta resolução pra impressão).
 */
export async function exportBadgeAsPNG(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const canvas = await captureBadge(element, 2);
  const dataUrl = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

/**
 * Exporta frente + verso como um único PDF de 2 páginas no tamanho exato
 * em milímetros (sem escala — pronto pra mandar pra gráfica).
 */
export async function exportBadgePDF(
  frontElement: HTMLElement,
  backElement: HTMLElement,
  filename: string,
): Promise<void> {
  // scale 3 → ~1980×3120px capturados (qualidade de impressão @ ~900 DPI efetivos)
  const [frontCanvas, backCanvas] = await Promise.all([
    captureBadge(frontElement, 3),
    captureBadge(backElement, 3),
  ]);

  const pdf = new jsPDF({
    unit: "mm",
    format: [BADGE_MM_W, BADGE_MM_H],
    orientation: "portrait",
    compress: true,
  });

  pdf.addImage(
    frontCanvas.toDataURL("image/png"),
    "PNG",
    0,
    0,
    BADGE_MM_W,
    BADGE_MM_H,
    undefined,
    "FAST",
  );

  pdf.addPage([BADGE_MM_W, BADGE_MM_H], "portrait");

  pdf.addImage(
    backCanvas.toDataURL("image/png"),
    "PNG",
    0,
    0,
    BADGE_MM_W,
    BADGE_MM_H,
    undefined,
    "FAST",
  );

  pdf.save(filename);
}
