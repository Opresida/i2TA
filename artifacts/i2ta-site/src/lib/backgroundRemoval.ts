/**
 * Wrapper de remoção de fundo de imagem usando @imgly/background-removal.
 *
 * Características:
 * - Lazy loading do módulo via dynamic import (não infla bundle inicial)
 * - Singleton: o módulo só é importado UMA vez, mesmo em múltiplas chamadas
 * - Modelo `isnet_fp16` (~40MB) — melhor balance entre tamanho e qualidade
 * - Cache automático do modelo via Cache Storage API do browser
 *   (gerenciado internamente pela lib — primeira vez baixa, próximas usa cache)
 * - Fallback: try/catch encapsula tudo, retorna erro estruturado em vez de quebrar
 * - WebGPU é tentado primeiro pela própria lib, cai pra WebAssembly se não disponível
 *
 * Uso:
 *   const result = await removeImageBackground(blob, (msg, pct) => updateUI(msg, pct));
 *   if (result.ok) { use(result.blob) } else { showError(result.error) }
 */

export interface BgRemovalResult {
  ok: boolean;
  blob?: Blob;
  error?: string;
}

export type ProgressCallback = (
  message: string,
  percent: number | null,
) => void;

// Singleton da função importada — só dispara o dynamic import na primeira chamada
let removeBackgroundFn:
  | ((
      input: Blob | string,
      config?: any,
    ) => Promise<Blob>)
  | null = null;

let importPromise: Promise<void> | null = null;

async function ensureLibLoaded(onProgress?: ProgressCallback): Promise<void> {
  if (removeBackgroundFn) return; // já carregado
  if (importPromise) return importPromise; // já carregando

  onProgress?.("Carregando módulo de remoção de fundo...", null);

  // Nome do módulo em variável para evitar que Vite import-analysis
  // tente resolver o pacote em build time (o módulo é carregado sob demanda
  // em runtime apenas quando o usuário aciona a feature de remoção de fundo).
  const moduleName = "@imgly/background-removal";
  importPromise = import(/* @vite-ignore */ moduleName)
    .then((mod: any) => {
      removeBackgroundFn = mod.removeBackground;
    })
    .catch((err) => {
      importPromise = null; // permite retry
      throw err;
    });

  return importPromise;
}

/**
 * Remove o fundo de uma imagem.
 *
 * @param input Blob ou URL da imagem
 * @param onProgress Callback chamado com mensagens de status e % opcional
 * @returns Resultado estruturado: ok=true com blob PNG transparente, ou ok=false com error
 */
export async function removeImageBackground(
  input: Blob | string,
  onProgress?: ProgressCallback,
): Promise<BgRemovalResult> {
  try {
    await ensureLibLoaded(onProgress);
    if (!removeBackgroundFn) {
      return { ok: false, error: "Biblioteca não pôde ser carregada." };
    }

    onProgress?.("Preparando modelo de IA...", null);

    // Configuração: modelo isnet_fp16 (~40MB) é o melhor balance
    // entre tamanho do download e qualidade do resultado.
    const config = {
      // 'isnet_fp16' = 40MB, balance / 'isnet_quint8' = 7MB, qualidade menor / 'isnet' = 80MB, qualidade alta
      model: "isnet_fp16" as const,
      output: {
        format: "image/png" as const,
        quality: 1.0,
      },
      // Callback de progresso interno da lib
      progress: (key: string, current: number, total: number) => {
        const percent = total > 0 ? Math.round((current / total) * 100) : null;
        // Mensagens amigáveis baseadas na key
        let msg = "Processando...";
        if (key.includes("fetch")) {
          msg = "Baixando modelo de IA (1ª vez, ~40MB)...";
        } else if (key.includes("compute")) {
          msg = "Removendo fundo da imagem...";
        } else if (key.includes("decode") || key.includes("encode")) {
          msg = "Finalizando imagem...";
        }
        onProgress?.(msg, percent);
      },
      // O publicPath padrão (CDN do imgly) tem cache de borda + browser cacheia.
      // Não precisa de service worker custom — o browser cuida.
    };

    onProgress?.("Removendo fundo...", null);
    const resultBlob = await removeBackgroundFn(input, config);

    onProgress?.("Concluído!", 100);
    return { ok: true, blob: resultBlob };
  } catch (error: any) {
    console.error("[backgroundRemoval] Erro:", error);
    const message =
      error?.message || "Falha ao processar imagem. Tente outra foto.";
    return { ok: false, error: message };
  }
}

/**
 * Verifica se o módulo já foi pré-carregado.
 * Útil pra mostrar UI diferente (ex: "modelo já em cache, será rápido").
 */
export function isLibLoaded(): boolean {
  return removeBackgroundFn !== null;
}
