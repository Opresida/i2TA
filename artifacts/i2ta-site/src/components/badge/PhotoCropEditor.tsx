import { useState, useRef, useEffect, useCallback } from "react";
import { X, Check, Move } from "lucide-react";

interface PhotoCropEditorProps {
  /** URL ou Object URL da imagem original a editar */
  imageUrl: string;
  /** Tamanho final do crop em pixels (sempre quadrado, default 600) */
  outputSize?: number;
  /** Chamado quando user confirma — recebe o blob 1:1 cropped */
  onConfirm: (blob: Blob) => void;
  /** Chamado quando user cancela */
  onCancel: () => void;
}

interface CropRect {
  x: number;
  y: number;
  size: number; // sempre quadrado, então só 1 dimensão
}

type DragMode =
  | "none"
  | "move"
  | "resize-tl"
  | "resize-tr"
  | "resize-bl"
  | "resize-br";

const MIN_CROP_SIZE = 60; // px no canvas (não no output)

/**
 * Editor visual de crop quadrado.
 *
 * Mostra a foto original num canvas + um quadrado de seleção (1:1) que o
 * usuário pode mover (drag no centro) e redimensionar (drag nos cantos).
 * Ao confirmar, gera um blob PNG quadrado no outputSize especificado.
 */
export default function PhotoCropEditor({
  imageUrl,
  outputSize = 600,
  onConfirm,
  onCancel,
}: PhotoCropEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [imgSize, setImgSize] = useState({ w: 0, h: 0 });
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });
  const [cropRect, setCropRect] = useState<CropRect | null>(null);
  const [dragMode, setDragMode] = useState<DragMode>("none");
  const [dragStart, setDragStart] = useState<{
    x: number;
    y: number;
    rect: CropRect;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Carrega a imagem e calcula o tamanho do canvas
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imgRef.current = img;
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });

      // Calcula tamanho do canvas pra caber no container (max 600x500)
      const maxW = Math.min(window.innerWidth - 80, 720);
      const maxH = Math.min(window.innerHeight - 280, 540);
      const ratio = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight, 1);
      const cw = Math.round(img.naturalWidth * ratio);
      const ch = Math.round(img.naturalHeight * ratio);
      setCanvasSize({ w: cw, h: ch });

      // Crop inicial: maior quadrado possível, centralizado
      const initialSize = Math.min(cw, ch) * 0.85;
      setCropRect({
        x: (cw - initialSize) / 2,
        y: (ch - initialSize) / 2,
        size: initialSize,
      });
    };
    img.onerror = () => {
      console.error("[PhotoCropEditor] Erro ao carregar imagem");
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Desenha a imagem + overlay no canvas
  useEffect(() => {
    if (!canvasRef.current || !imgRef.current || !cropRect) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvasSize.w;
    canvas.height = canvasSize.h;

    // Limpa
    ctx.clearRect(0, 0, canvasSize.w, canvasSize.h);

    // Imagem completa
    ctx.drawImage(imgRef.current, 0, 0, canvasSize.w, canvasSize.h);

    // Overlay escuro fora do crop
    ctx.fillStyle = "rgba(10, 15, 28, 0.75)";
    ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);

    // "Cut out" do crop — redesenha a imagem só na área do crop
    ctx.save();
    ctx.beginPath();
    ctx.rect(cropRect.x, cropRect.y, cropRect.size, cropRect.size);
    ctx.clip();
    ctx.drawImage(imgRef.current, 0, 0, canvasSize.w, canvasSize.h);
    ctx.restore();

    // Borda do crop (gradient roxo→ciano simulado com 2 strokes)
    ctx.strokeStyle = "#00E0FF";
    ctx.lineWidth = 2;
    ctx.strokeRect(cropRect.x, cropRect.y, cropRect.size, cropRect.size);

    // Linhas de grade (regra dos terços)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    const third = cropRect.size / 3;
    // Verticais
    ctx.beginPath();
    ctx.moveTo(cropRect.x + third, cropRect.y);
    ctx.lineTo(cropRect.x + third, cropRect.y + cropRect.size);
    ctx.moveTo(cropRect.x + 2 * third, cropRect.y);
    ctx.lineTo(cropRect.x + 2 * third, cropRect.y + cropRect.size);
    // Horizontais
    ctx.moveTo(cropRect.x, cropRect.y + third);
    ctx.lineTo(cropRect.x + cropRect.size, cropRect.y + third);
    ctx.moveTo(cropRect.x, cropRect.y + 2 * third);
    ctx.lineTo(cropRect.x + cropRect.size, cropRect.y + 2 * third);
    ctx.stroke();

    // Cantos (handles de resize) - quadradinhos brancos com borda ciano
    const handleSize = 10;
    const corners = [
      { x: cropRect.x, y: cropRect.y },
      { x: cropRect.x + cropRect.size, y: cropRect.y },
      { x: cropRect.x, y: cropRect.y + cropRect.size },
      { x: cropRect.x + cropRect.size, y: cropRect.y + cropRect.size },
    ];
    corners.forEach((c) => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(
        c.x - handleSize / 2,
        c.y - handleSize / 2,
        handleSize,
        handleSize,
      );
      ctx.strokeStyle = "#00E0FF";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        c.x - handleSize / 2,
        c.y - handleSize / 2,
        handleSize,
        handleSize,
      );
    });

    // Indicador "1:1" no centro do crop
    ctx.fillStyle = "rgba(0, 224, 255, 0.85)";
    ctx.font = "bold 11px 'Inter', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "1 : 1",
      cropRect.x + cropRect.size / 2,
      cropRect.y + cropRect.size / 2 + 4,
    );
  }, [cropRect, canvasSize]);

  // Helpers de mouse
  const getMousePos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) * canvas.width) / rect.width,
      y: ((clientY - rect.top) * canvas.height) / rect.height,
    };
  };

  const detectDragMode = (mx: number, my: number, rect: CropRect): DragMode => {
    const handleRadius = 16;
    const isNear = (cx: number, cy: number) =>
      Math.abs(mx - cx) < handleRadius && Math.abs(my - cy) < handleRadius;

    if (isNear(rect.x, rect.y)) return "resize-tl";
    if (isNear(rect.x + rect.size, rect.y)) return "resize-tr";
    if (isNear(rect.x, rect.y + rect.size)) return "resize-bl";
    if (isNear(rect.x + rect.size, rect.y + rect.size)) return "resize-br";

    if (
      mx >= rect.x &&
      mx <= rect.x + rect.size &&
      my >= rect.y &&
      my <= rect.y + rect.size
    ) {
      return "move";
    }

    return "none";
  };

  const handleStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!cropRect) return;
      const pos = getMousePos(e);
      const mode = detectDragMode(pos.x, pos.y, cropRect);
      if (mode === "none") return;
      setDragMode(mode);
      setDragStart({ x: pos.x, y: pos.y, rect: { ...cropRect } });
    },
    [cropRect],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!cropRect || !dragStart || dragMode === "none") return;
      const pos = getMousePos(e);
      const dx = pos.x - dragStart.x;
      const dy = pos.y - dragStart.y;
      const orig = dragStart.rect;

      let newRect: CropRect;

      if (dragMode === "move") {
        newRect = {
          x: orig.x + dx,
          y: orig.y + dy,
          size: orig.size,
        };
      } else {
        // Resize: usa o maior delta proporcional pra manter quadrado
        let newSize = orig.size;
        let newX = orig.x;
        let newY = orig.y;

        if (dragMode === "resize-br") {
          newSize = Math.max(orig.size + Math.max(dx, dy), MIN_CROP_SIZE);
        } else if (dragMode === "resize-bl") {
          newSize = Math.max(orig.size + Math.max(-dx, dy), MIN_CROP_SIZE);
          newX = orig.x + (orig.size - newSize);
        } else if (dragMode === "resize-tr") {
          newSize = Math.max(orig.size + Math.max(dx, -dy), MIN_CROP_SIZE);
          newY = orig.y + (orig.size - newSize);
        } else if (dragMode === "resize-tl") {
          newSize = Math.max(orig.size + Math.max(-dx, -dy), MIN_CROP_SIZE);
          newX = orig.x + (orig.size - newSize);
          newY = orig.y + (orig.size - newSize);
        }

        newRect = { x: newX, y: newY, size: newSize };
      }

      // Clamp dentro do canvas
      newRect.size = Math.min(
        newRect.size,
        canvasSize.w,
        canvasSize.h,
      );
      newRect.x = Math.max(0, Math.min(newRect.x, canvasSize.w - newRect.size));
      newRect.y = Math.max(0, Math.min(newRect.y, canvasSize.h - newRect.size));

      setCropRect(newRect);
    },
    [cropRect, dragStart, dragMode, canvasSize],
  );

  const handleEnd = useCallback(() => {
    setDragMode("none");
    setDragStart(null);
  }, []);

  // Cursor dinâmico baseado em onde o mouse está
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragMode !== "none") {
      handleMove(e);
      return;
    }
    if (!cropRect || !canvasRef.current) return;
    const pos = getMousePos(e);
    const mode = detectDragMode(pos.x, pos.y, cropRect);
    const cursorMap: Record<DragMode, string> = {
      none: "default",
      move: "move",
      "resize-tl": "nwse-resize",
      "resize-tr": "nesw-resize",
      "resize-bl": "nesw-resize",
      "resize-br": "nwse-resize",
    };
    canvasRef.current.style.cursor = cursorMap[mode];
  };

  // Confirma: gera blob 1:1 no outputSize
  const handleConfirm = useCallback(async () => {
    if (!cropRect || !imgRef.current || !canvasSize.w) return;
    setIsProcessing(true);

    try {
      // Calcula a região do crop em coordenadas da imagem ORIGINAL
      const scaleX = imgSize.w / canvasSize.w;
      const scaleY = imgSize.h / canvasSize.h;
      const sourceX = cropRect.x * scaleX;
      const sourceY = cropRect.y * scaleY;
      const sourceSize = cropRect.size * scaleX; // como é quadrado, scale uniforme

      // Canvas de saída em outputSize
      const outCanvas = document.createElement("canvas");
      outCanvas.width = outputSize;
      outCanvas.height = outputSize;
      const ctx = outCanvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      // Habilita smoothing alta qualidade
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        imgRef.current,
        sourceX,
        sourceY,
        sourceSize,
        sourceSize,
        0,
        0,
        outputSize,
        outputSize,
      );

      outCanvas.toBlob(
        (blob) => {
          setIsProcessing(false);
          if (blob) onConfirm(blob);
        },
        "image/png",
        1.0,
      );
    } catch (err) {
      console.error("[PhotoCropEditor] Erro ao gerar crop:", err);
      setIsProcessing(false);
    }
  }, [cropRect, imgSize, canvasSize, outputSize, onConfirm]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10, 15, 28, 0.92)", backdropFilter: "blur(8px)" }}
    >
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-white/10 p-6 max-w-fit"
        style={{
          background:
            "linear-gradient(145deg, rgba(13, 23, 41, 0.95) 0%, rgba(10, 15, 28, 0.95) 100%)",
          boxShadow: "0 25px 80px rgba(0, 224, 255, 0.15)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-[Space_Grotesk] font-bold text-white text-xl">
              Ajustar foto do crachá
            </h3>
            <p className="text-[#8A94A6] text-xs mt-1 flex items-center gap-1.5">
              <Move className="w-3 h-3" />
              Arraste o quadrado pra mover · arraste os cantos pra redimensionar
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-[#8A94A6] hover:text-white p-2"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Canvas */}
        {canvasSize.w > 0 ? (
          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
            style={{
              width: canvasSize.w,
              height: canvasSize.h,
              borderRadius: 12,
              touchAction: "none",
              userSelect: "none",
            }}
          />
        ) : (
          <div className="w-[400px] h-[300px] flex items-center justify-center text-[#8A94A6]">
            Carregando imagem...
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 text-sm text-[#8A94A6] hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing || !cropRect}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #7B3FE4 0%, #00E0FF 100%)",
              color: "#0A0F1C",
            }}
          >
            <Check className="w-4 h-4" />
            {isProcessing ? "Processando..." : "Aplicar crop"}
          </button>
        </div>
      </div>
    </div>
  );
}
