/**
 * Источники каталога карт «Ковчега».
 *
 * Здесь в одном месте собираются URL, которые раньше были жёстко зашиты на
 * апстрим Project NOMAD. Каталог курируемых карт можно переключить на форк
 * через MAPS_SPEC_URL, а репозиторий с готовыми PMTiles и базовыми ассетами —
 * через MAPS_ASSETS_REPO. По умолчанию репозиторий ассетов остаётся
 * апстримовым: своего репозитория карт у форка пока нет.
 */

export const DEFAULT_MAPS_SPEC_URL =
  'https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/maps.json'

export const DEFAULT_MAPS_ASSETS_REPO = 'Crosstalk-Solutions/project-nomad-maps'

/** Ветка, из которой апстрим раздаёт pmtiles и base-assets.tar.gz. */
const MAPS_ASSETS_REF = 'master'

/** Каталог с готовыми PMTiles внутри репозитория ассетов. */
const MAPS_ASSETS_PMTILES_DIR = 'pmtiles'

/** Пустая или состоящая из пробелов переменная окружения — это «не задана». */
function normalized(value?: string | null): string | null {
  const trimmed = value?.trim()
  return trimmed ? trimmed : null
}

/** URL каталога курируемых карт: MAPS_SPEC_URL или maps.json форка. */
export function resolveMapsSpecUrl(value?: string | null): string {
  return normalized(value) ?? DEFAULT_MAPS_SPEC_URL
}

/**
 * Репозиторий с готовыми PMTiles в формате `owner/repo`.
 * Принимает также полный GitHub URL и убирает `.git`/хвостовой слэш, чтобы
 * переменную было удобно задавать вручную и в docker-compose.
 */
export function resolveMapsAssetsRepo(value?: string | null): string {
  const raw = normalized(value)
  if (!raw) return DEFAULT_MAPS_ASSETS_REPO

  const repo = raw
    .replace(/^https?:\/\/github\.com\//i, '')
    .replace(/^git@github\.com:/i, '')
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '')

  return repo || DEFAULT_MAPS_ASSETS_REPO
}

/** GitHub API-каталог, из которого KiwixCatalogService берёт версии PMTiles. */
export function resolveMapsUpdateCatalogUrl(value?: string | null): string {
  const repo = resolveMapsAssetsRepo(value)
  return `https://api.github.com/repos/${repo}/contents/${MAPS_ASSETS_PMTILES_DIR}`
}

/** Базовый URL для скачивания файлов из репозитория ассетов (base-assets.tar.gz). */
export function resolveMapsAssetsBaseUrl(value?: string | null): string {
  const repo = resolveMapsAssetsRepo(value)
  return `https://github.com/${repo}/raw/refs/heads/${MAPS_ASSETS_REF}/`
}
