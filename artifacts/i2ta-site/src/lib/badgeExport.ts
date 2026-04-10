import jsPDF from "jspdf";
import { toPng } from "html-to-image";

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
 * Renderizador de captura: html-to-image (substituiu html2canvas em 2026-04-10).
 *
 * Por que trocou: html2canvas tem bug crônico de "createPattern: canvas with
 * 0 dimensions" ao processar elementos com background-image gradient (CSS
 * `linear-gradient`). O crachá usa muitos gradients (foto borda, divider,
 * footer, glow blobs). html-to-image usa SVG foreignObject ao invés de
 * canvas direto, e não tem esse bug — suporta CSS modernos com fidelidade.
 */

/**
 * Garante que as fontes Google (Inter + Space Grotesk) estejam carregadas
 * antes de capturar o DOM.
 */
async function waitForFonts() {
  if (typeof document !== "undefined" && (document as any).fonts?.ready) {
    try {
      await (document as any).fonts.ready;
    } catch {
      /* ignore */
    }
  }
  // Aguarda 2 frames pra garantir que tudo foi pintado
  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

/**
 * Aguarda TODAS as imagens descendentes do elemento terminarem de carregar.
 */
async function waitForImages(element: HTMLElement): Promise<void> {
  const imgs = Array.from(element.querySelectorAll("img"));
  if (imgs.length === 0) return;

  await Promise.all(
    imgs.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
            resolve();
            return;
          }
          let resolved = false;
          const done = () => {
            if (resolved) return;
            resolved = true;
            resolve();
          };
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
          setTimeout(done, 8000);
        }),
    ),
  );

  await new Promise<void>((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
  );
}

/**
 * Captura um elemento DOM como dataURL PNG em alta resolução para impressão.
 *
 * scale=2 → ~1322×2080 (qualidade boa pra PNG individual)
 * scale=3 → ~1980×3120 (qualidade alta pra PDF impressão)
 */
async function captureBadgeAsPng(
  element: HTMLElement,
  pixelRatio: number,
): Promise<string> {
  await waitForFonts();
  await waitForImages(element);

  return toPng(element, {
    width: BADGE_PX_W,
    height: BADGE_PX_H,
    pixelRatio,
    cacheBust: true,
    backgroundColor: "#0A0F1C",
    // canvasWidth/Height força dimensões internas exatas
    canvasWidth: BADGE_PX_W,
    canvasHeight: BADGE_PX_H,
    // Skip de assets externos problemáticos (não temos, mas safety)
    fetchRequestInit: {
      cache: "no-cache",
    },
    // Filtro: pula elementos potencialmente problemáticos
    filter: (node) => {
      // Pula <script> e <style> (não precisamos deles na captura)
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = (node as Element).tagName?.toLowerCase();
        if (tag === "script" || tag === "style") return false;
      }
      return true;
    },
  });
}

/**
 * Helper: dataURL → HTMLImageElement (pra usar no jsPDF)
 */
function dataUrlToImage(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

/**
 * Exporta um único lado do crachá como PNG (alta resolução pra impressão).
 */
export async function exportBadgeAsPNG(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  const dataUrl = await captureBadgeAsPng(element, 2);
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
  // Captura ambos em paralelo, com pixelRatio 3 pra qualidade de impressão
  const [frontDataUrl, backDataUrl] = await Promise.all([
    captureBadgeAsPng(frontElement, 3),
    captureBadgeAsPng(backElement, 3),
  ]);

  const pdf = new jsPDF({
    unit: "mm",
    format: [BADGE_MM_W, BADGE_MM_H],
    orientation: "portrait",
    compress: true,
  });

  pdf.addImage(
    frontDataUrl,
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
    backDataUrl,
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
