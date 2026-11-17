import type { NomadOllamaModel, OllamaRuTierId } from '../types/ollama.js'

/**
 * Recommended Ollama models for Russian, grouped by the hardware they actually
 * fit on.
 *
 * NOMAD targets laptops, where the difference between a 4 GB and an 8 GB GPU is
 * the difference between a 4B model that answers in Russian and an 8B model
 * that swaps. The old recommendation list was three globally popular models
 * picked by pull count, which routinely offered a model too large for the
 * machine it was shown on.
 *
 * Every tag and size below was read from the Ollama library on 2026-11-17:
 *   https://ollama.com/library/qwen3
 *   https://ollama.com/library/qwen2.5
 *   https://ollama.com/library/gemma3
 *   https://ollama.com/library/phi4-mini
 * Sizes are the quantized file sizes Ollama lists for each tag (q4_K_M for
 * these tags unless the tag says otherwise).
 *
 * Language support is the reason a model is here, not parameter count:
 *   - Qwen3: 100+ languages and dialects (Ollama model card).
 *   - Qwen2.5: 29 languages, Russian named explicitly (Ollama model card).
 *   - Gemma 3: 140+ languages (Ollama model card).
 *   - Phi-4 Mini: multilingual instruction-tuned model (Ollama model card).
 * Llama 3.2 was checked and left out: its card lists eight officially supported
 * languages and Russian is not one of them, so it is not a good Russian
 * recommendation even though it is small.
 */

export type OllamaRuTierModel = {
  /** Exact Ollama tag, including the parameter suffix. */
  tag: string
  /** Download size exactly as Ollama prints it. */
  size: string
  /** Human-readable Russian name shown alongside the tag. */
  title: string
  /** Why this model suits Russian, in Russian. */
  description: string
  context: string
  input: 'Text' | 'Text, Image'
  thinking?: boolean
  /** Where the tag and size were read from. */
  sourceUrl: string
}

export type OllamaRuTier = {
  id: OllamaRuTierId
  /** Short Russian description of the hardware this tier targets. */
  label: string
  summary: string
  models: readonly OllamaRuTierModel[]
}

const QWEN3 = 'https://ollama.com/library/qwen3'
const QWEN25 = 'https://ollama.com/library/qwen2.5'
const GEMMA3 = 'https://ollama.com/library/gemma3'
const PHI4_MINI = 'https://ollama.com/library/phi4-mini'

export const OLLAMA_RU_TIERS: Record<OllamaRuTierId, OllamaRuTier> = {
  cpu: {
    id: 'cpu',
    label: 'ноутбук без видеокарты (8–16 ГБ ОЗУ)',
    summary: 'Процессорное исполнение: модели до ~3B и файлы до ~2,5 ГБ.',
    models: [
      {
        tag: 'qwen3:1.7b',
        size: '1.4GB',
        title: 'Qwen3 1.7B — лёгкий собеседник',
        description:
          'Qwen3 поддерживает более 100 языков, включая русский. 1,7 млрд параметров хватает для диалога и коротких ответов, а 1,4 ГБ не вытесняют из памяти остальные службы.',
        context: '40k',
        input: 'Text',
        thinking: true,
        sourceUrl: `${QWEN3}:1.7b`,
      },
      {
        tag: 'gemma3:1b',
        size: '806MB',
        title: 'Gemma 3 1B — самый компактный',
        description:
          'Gemma 3 обучена на 140+ языках, включая русский. Версия на 1 млрд параметров занимает всего 806 МБ и оставляет больше памяти системе и базе знаний.',
        context: '32k',
        input: 'Text',
        sourceUrl: `${GEMMA3}:1b`,
      },
      {
        tag: 'qwen2.5:1.5b',
        size: '986MB',
        title: 'Qwen2.5 1.5B — русский в приоритете',
        description:
          'Qwen2.5 официально поддерживает русский среди 29 языков. 1,5 млрд параметров и 986 МБ — хороший баланс скорости и связности ответов для слабого ноутбука.',
        context: '32k',
        input: 'Text',
        sourceUrl: `${QWEN25}:1.5b`,
      },
    ],
  },

  gpu_6gb: {
    id: 'gpu_6gb',
    label: 'ноутбук с видеокартой на 4–6 ГБ видеопамяти',
    summary: 'Модели до ~4B и файлы до ~4 ГБ, чтобы q4-веса помещались в VRAM.',
    models: [
      {
        tag: 'qwen3:4b',
        size: '2.5GB',
        title: 'Qwen3 4B — умный и компактный',
        description:
          'Qwen3 4B по качеству спорит с моделями крупнее, поддерживает 100+ языков и занимает 2,5 ГБ — комфортно для 4–6 ГБ видеопамяти.',
        context: '256k',
        input: 'Text',
        thinking: true,
        sourceUrl: `${QWEN3}:4b`,
      },
      {
        tag: 'phi4-mini:3.8b',
        size: '2.5GB',
        title: 'Phi-4 Mini 3.8B — рассуждения на русском',
        description:
          'Phi-4 Mini обучена на многоязычных данных, включая русский, и сильна в логике и математике. Занимает 2,5 ГБ, контекст — 128K.',
        context: '128k',
        input: 'Text',
        sourceUrl: `${PHI4_MINI}:3.8b`,
      },
      {
        tag: 'qwen2.5:3b',
        size: '1.9GB',
        title: 'Qwen2.5 3B — надёжный минимум',
        description:
          'Qwen2.5 3B официально поддерживает русский, занимает 1,9 ГБ и оставляет видеопамять под контекст и остальные нужды системы.',
        context: '32k',
        input: 'Text',
        sourceUrl: `${QWEN25}:3b`,
      },
    ],
  },

  gpu_8gb: {
    id: 'gpu_8gb',
    label: 'ноутбук с видеокартой на 8 ГБ видеопамяти',
    summary: 'Модели до ~8B q4 и файлы до ~6 ГБ.',
    models: [
      {
        tag: 'qwen3:8b',
        size: '5.2GB',
        title: 'Qwen3 8B — лучший баланс',
        description:
          'Qwen3 8B — заметный шаг в качестве диалога и следования инструкциям; 5,2 ГБ q4 и поддержка 100+ языков, включая русский.',
        context: '40k',
        input: 'Text',
        thinking: true,
        sourceUrl: `${QWEN3}:8b`,
      },
      {
        tag: 'qwen2.5:7b',
        size: '4.7GB',
        title: 'Qwen2.5 7B — проверенная классика',
        description:
          'Qwen2.5 7B официально поддерживает русский, занимает 4,7 ГБ и даёт более устойчивые ответы, чем модели на 3–4 млрд параметров.',
        context: '32k',
        input: 'Text',
        sourceUrl: `${QWEN25}:7b`,
      },
      {
        tag: 'gemma3:4b',
        size: '3.4GB',
        title: 'Gemma 3 4B — текст и изображения',
        description:
          'Gemma 3 4B понимает 140+ языков, включая русский, и умеет работать с изображениями. 3,4 ГБ оставляют запас для 8 ГБ видеопамяти.',
        context: '128k',
        input: 'Text, Image',
        sourceUrl: `${GEMMA3}:4b`,
      },
    ],
  },

  gpu_16gb: {
    id: 'gpu_16gb',
    label: 'мощный ПК с видеокартой на 12–16+ ГБ видеопамяти',
    summary: 'Модели до ~14B q4 и файлы до ~10 ГБ.',
    models: [
      {
        tag: 'qwen3:14b',
        size: '9.3GB',
        title: 'Qwen3 14B — максимум качества',
        description:
          'Qwen3 14B — старшая модель ступени: глубокие ответы, 100+ языков и 9,3 ГБ q4, которые помещаются в 12–16 ГБ видеопамяти.',
        context: '40k',
        input: 'Text',
        thinking: true,
        sourceUrl: `${QWEN3}:14b`,
      },
      {
        tag: 'qwen2.5:14b',
        size: '9.0GB',
        title: 'Qwen2.5 14B — русский и контекст',
        description:
          'Qwen2.5 14B официально поддерживает русский, занимает 9,0 ГБ и уверенно работает с длинными инструкциями и большим контекстом.',
        context: '32k',
        input: 'Text',
        sourceUrl: `${QWEN25}:14b`,
      },
      {
        tag: 'gemma3:12b',
        size: '8.2GB',
        title: 'Gemma 3 12B — язык и зрение',
        description:
          'Gemma 3 12B обучена на 140+ языках, включая русский, и поддерживает изображения. 8,2 ГБ q4 — хороший выбор для мощного ПК.',
        context: '128k',
        input: 'Text, Image',
        sourceUrl: `${GEMMA3}:12b`,
      },
    ],
  },
}

/** Lowest VRAM at which each GPU tier is a safe fit. */
export const OLLAMA_RU_MIN_VRAM_MIB = {
  gpu_6gb: 4 * 1024,
  // More than 6 GiB, so a 6 GB card stays on the 6 GB tier rather than being
  // handed a model that only leaves the framebuffer on paper.
  gpu_8gb: 6 * 1024 + 1,
  gpu_16gb: 12 * 1024,
} as const

/**
 * Below this much system RAM the rest of NOMAD (MySQL, Redis, Qdrant, Kiwix,
 * the admin app) competes with the model for memory, so no GPU tier is a safe
 * recommendation. Unknown RAM is not treated as low: only a reported value
 * below the floor downgrades the tier.
 */
export const OLLAMA_RU_MIN_GPU_SYSTEM_RAM_MIB = 8 * 1024

function isPositiveFinite(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
}

/**
 * Pick the hardware tier from the VRAM Ollama reported, falling back to the CPU
 * tier whenever VRAM is absent, zero or unparseable.
 *
 * VRAM boundaries are upper-inclusive per tier: 4–6 GiB is `gpu_6gb`, anything
 * above 6 GiB up to 12 GiB is `gpu_8gb`, and 12 GiB or more is `gpu_16gb`.
 * `ramMiB` only guards against recommending a GPU tier on a host too small for
 * the rest of the stack; it never promotes a machine with no detectable VRAM.
 */
export function pickTierByVram(
  vramMiB: number | null | undefined,
  ramMiB?: number | null
): OllamaRuTierId {
  if (!isPositiveFinite(vramMiB) || vramMiB < OLLAMA_RU_MIN_VRAM_MIB.gpu_6gb) {
    return 'cpu'
  }
  if (isPositiveFinite(ramMiB) && ramMiB < OLLAMA_RU_MIN_GPU_SYSTEM_RAM_MIB) {
    return 'cpu'
  }
  if (vramMiB >= OLLAMA_RU_MIN_VRAM_MIB.gpu_16gb) return 'gpu_16gb'
  if (vramMiB >= OLLAMA_RU_MIN_VRAM_MIB.gpu_8gb) return 'gpu_8gb'
  return 'gpu_6gb'
}

/**
 * Build the API shape NOMAD's model picker already consumes. The model `name` is
 * the full tag, not the family name: the picker downloads `name` verbatim, so
 * `qwen3` would pull the 8B latest tag instead of the recommended 1.7B one.
 */
export function recommendedModelsForTier(tierId: OllamaRuTierId): NomadOllamaModel[] {
  const tier = OLLAMA_RU_TIERS[tierId]
  return tier.models.map((model) => {
    const id = `ollama-ru-${tierId}-${model.tag.replace(/[^a-z0-9]+/gi, '-')}`
    return {
      id,
      name: model.tag,
      description: `${model.title}. ${model.description}`,
      estimated_pulls: '0',
      model_last_updated: '2026-11-17',
      first_seen: '2026-11-17',
      tags: [
        {
          name: model.tag,
          size: model.size,
          context: model.context,
          input: model.input,
          cloud: false,
          thinking: model.thinking ?? false,
        },
      ],
    }
  })
}
