import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  COLLECTION_SPEC_FILENAMES,
  DEFAULT_COLLECTIONS_BASE_URL,
  DEFAULT_MAPS_ASSETS_REPO,
  DEFAULT_MAPS_SPEC_URL,
  resolveCollectionSpecUrl,
  resolveCollectionsBaseUrl,
  resolveMapsAssetsBaseUrl,
  resolveMapsAssetsRepo,
  resolveMapsSpecUrl,
  resolveMapsUpdateCatalogUrl,
} from '../../constants/collection_sources.js'

test('каталоги коллекций по умолчанию берутся из ветки ru-main форка «Ковчег»', () => {
  assert.equal(
    DEFAULT_COLLECTIONS_BASE_URL,
    'https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/'
  )
  assert.equal(
    DEFAULT_MAPS_SPEC_URL,
    'https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/maps.json'
  )
  assert.deepEqual(COLLECTION_SPEC_FILENAMES, {
    zim_categories: 'kiwix-categories.json',
    wikipedia: 'wikipedia.json',
    creator_packs: 'creator-packs.json',
    maps: 'maps.json',
  })

  assert.equal(resolveCollectionsBaseUrl(), DEFAULT_COLLECTIONS_BASE_URL)
  assert.equal(resolveCollectionsBaseUrl(undefined), DEFAULT_COLLECTIONS_BASE_URL)
  assert.equal(resolveCollectionsBaseUrl(''), DEFAULT_COLLECTIONS_BASE_URL)
  assert.equal(resolveCollectionsBaseUrl('   '), DEFAULT_COLLECTIONS_BASE_URL)

  for (const type of ['zim_categories', 'wikipedia', 'creator_packs', 'maps'] as const) {
    assert.equal(
      resolveCollectionSpecUrl(type),
      `${DEFAULT_COLLECTIONS_BASE_URL}${COLLECTION_SPEC_FILENAMES[type]}`
    )
  }
})

test('COLLECTIONS_BASE_URL без слэша на конце собирает URL всех каталогов', () => {
  const base = 'https://example.com/kovcheg/collections'

  assert.equal(resolveCollectionsBaseUrl(base), `${base}/`)
  assert.equal(
    resolveCollectionSpecUrl('zim_categories', { collectionsBaseUrl: base }),
    `${base}/kiwix-categories.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('wikipedia', { collectionsBaseUrl: base }),
    `${base}/wikipedia.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('creator_packs', { collectionsBaseUrl: base }),
    `${base}/creator-packs.json`
  )
  assert.equal(resolveCollectionSpecUrl('maps', { collectionsBaseUrl: base }), `${base}/maps.json`)
})

test('COLLECTIONS_BASE_URL со слэшем на конце не даёт двойной слэш', () => {
  const base = 'https://example.com/kovcheg/collections/'

  assert.equal(resolveCollectionsBaseUrl(base), base)
  assert.equal(
    resolveCollectionSpecUrl('zim_categories', { collectionsBaseUrl: base }),
    `${base}kiwix-categories.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('wikipedia', { collectionsBaseUrl: base }),
    `${base}wikipedia.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('creator_packs', { collectionsBaseUrl: base }),
    `${base}creator-packs.json`
  )
  assert.equal(resolveCollectionSpecUrl('maps', { collectionsBaseUrl: base }), `${base}maps.json`)
})

test('COLLECTIONS_BASE_URL обрезает пробелы и лишние слэши', () => {
  assert.equal(
    resolveCollectionsBaseUrl('  https://example.com/kovcheg/collections///  '),
    'https://example.com/kovcheg/collections/'
  )
})

test('MAPS_SPEC_URL имеет приоритет для maps.json, остальные каталоги — из базового URL', () => {
  const options = {
    collectionsBaseUrl: 'https://example.com/collections',
    mapsSpecUrl: 'https://example.com/spec/maps.json',
  }

  assert.equal(resolveCollectionSpecUrl('maps', options), 'https://example.com/spec/maps.json')
  assert.equal(
    resolveCollectionSpecUrl('zim_categories', options),
    'https://example.com/collections/kiwix-categories.json'
  )
  assert.equal(
    resolveMapsSpecUrl(options.mapsSpecUrl, options.collectionsBaseUrl),
    'https://example.com/spec/maps.json'
  )
})

test('пустой MAPS_SPEC_URL отдаёт приоритет COLLECTIONS_BASE_URL', () => {
  const base = 'https://example.com/collections'

  assert.equal(
    resolveCollectionSpecUrl('maps', { collectionsBaseUrl: base, mapsSpecUrl: '' }),
    `${base}/maps.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('maps', { collectionsBaseUrl: base, mapsSpecUrl: '   ' }),
    `${base}/maps.json`
  )
  assert.equal(
    resolveCollectionSpecUrl('maps', { collectionsBaseUrl: base, mapsSpecUrl: undefined }),
    `${base}/maps.json`
  )
})

test('каталог карт по умолчанию берётся из ветки ru-main форка «Ковчег»', () => {
  assert.equal(resolveMapsSpecUrl(), DEFAULT_MAPS_SPEC_URL)
  assert.equal(resolveMapsSpecUrl(undefined), DEFAULT_MAPS_SPEC_URL)
  assert.equal(resolveMapsSpecUrl(''), DEFAULT_MAPS_SPEC_URL)
  assert.equal(resolveMapsSpecUrl('   '), DEFAULT_MAPS_SPEC_URL)
})

test('MAPS_SPEC_URL переопределяет каталог карт', () => {
  assert.equal(
    resolveMapsSpecUrl('https://example.com/kovcheg/maps.json'),
    'https://example.com/kovcheg/maps.json'
  )
  assert.equal(
    resolveMapsSpecUrl('  https://example.com/kovcheg/maps.json  '),
    'https://example.com/kovcheg/maps.json'
  )
})

test('репозиторий ассетов по умолчанию остаётся апстримовым', () => {
  assert.equal(DEFAULT_MAPS_ASSETS_REPO, 'Crosstalk-Solutions/project-nomad-maps')
  assert.equal(
    resolveMapsUpdateCatalogUrl(),
    'https://api.github.com/repos/Crosstalk-Solutions/project-nomad-maps/contents/pmtiles'
  )
  assert.equal(
    resolveMapsAssetsBaseUrl(),
    'https://github.com/Crosstalk-Solutions/project-nomad-maps/raw/refs/heads/master/'
  )
})

test('MAPS_ASSETS_REPO переопределяет каталог обновлений и базовые ассеты', () => {
  assert.equal(
    resolveMapsUpdateCatalogUrl('sarichanton/kovcheg-maps'),
    'https://api.github.com/repos/sarichanton/kovcheg-maps/contents/pmtiles'
  )
  assert.equal(
    resolveMapsAssetsBaseUrl('sarichanton/kovcheg-maps'),
    'https://github.com/sarichanton/kovcheg-maps/raw/refs/heads/master/'
  )
})

test('MAPS_ASSETS_REPO принимает полный GitHub URL и лишние слэши', () => {
  assert.equal(
    resolveMapsAssetsRepo('https://github.com/sarichanton/kovcheg-maps.git'),
    'sarichanton/kovcheg-maps'
  )
  assert.equal(
    resolveMapsUpdateCatalogUrl('  sarichanton/kovcheg-maps/  '),
    'https://api.github.com/repos/sarichanton/kovcheg-maps/contents/pmtiles'
  )
  assert.equal(resolveMapsAssetsRepo('   '), DEFAULT_MAPS_ASSETS_REPO)
})
