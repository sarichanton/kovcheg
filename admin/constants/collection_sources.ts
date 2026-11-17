/**
 * Источники каталогов коллекций «Ковчега».
 *
 * Здесь в одном месте собираются URL каталогов, которые раньше были жёстко
 * зашиты на апстрим Project NOMAD. Базовый адрес каталогов задаётся через
 * COLLECTIONS_BASE_URL, а имена файлов добавляются здесь, чтобы сервисы не
 * дублировали сборку URL.
 *
 * MAPS_SPEC_URL по-прежнему имеет приоритет для maps.json: если он задан,
 * каталог карт берётся оттуда, даже когда задан COLLECTIONS_BASE_URL. Если
 * MAPS_SPEC_URL не задан, maps.json строится от COLLECTIONS_BASE_URL.
 *
 * Репозиторий с готовыми PMTiles и базовыми ассетами настраивается отдельно
 * через MAPS_ASSETS_REPO и по умолчанию остаётся апстримовым: своего
 * репозитория карт у форка пока нет.
 */

import type { ManifestType } from '../types/collections.js'

export const DEFAULT_COLLECTIONS_BASE_URL =
  'https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/'

/** Имена файлов каталогов внутри COLLECTIONS_BASE_URL. */
export const COLLECTION_SPEC_FILENAMES: Record<ManifestType, string> = {
  zim_categories: 'kiwix-categories.json',
  wikipedia: 'wikipedia.json',
  creator_packs: 'creator-packs.json',
  maps: 'maps.json',
}

export const DEFAULT_MAPS_SPEC_URL = `${DEFAULT_COLLECTIONS_BASE_URL}maps.json`

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

/** Базовый URL каталогов: COLLECTIONS_BASE_URL или каталог форка по умолчанию. */
export function resolveCollectionsBaseUrl(value?: string | null): string {
  const raw = normalized(value)
  if (!raw) return DEFAULT_COLLECTIONS_BASE_URL
  return `${raw.replace(/\/+$/, '')}/`
}

/**
 * URL манифеста для типа контента.
 *
 * Для maps.json приоритет у MAPS_SPEC_URL; для остальных каталогов URL всегда
 * строится от COLLECTIONS_BASE_URL (явно заданного или дефолтного).
 */
export function resolveCollectionSpecUrl(
  type: ManifestType,
  options: {
    collectionsBaseUrl?: string | null
    mapsSpecUrl?: string | null
  } = {}
): string {
  if (type === 'maps') {
    const mapsSpecUrl = normalized(options.mapsSpecUrl)
    if (mapsSpecUrl) return mapsSpecUrl
  }

  return `${resolveCollectionsBaseUrl(options.collectionsBaseUrl)}${COLLECTION_SPEC_FILENAMES[type]}`
}

/** URL каталога курируемых карт: MAPS_SPEC_URL, иначе maps.json базового каталога. */
export function resolveMapsSpecUrl(
  mapsSpecUrl?: string | null,
  collectionsBaseUrl?: string | null
): string {
  return resolveCollectionSpecUrl('maps', { mapsSpecUrl, collectionsBaseUrl })
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
