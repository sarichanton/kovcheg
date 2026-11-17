import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  DEFAULT_MAPS_ASSETS_REPO,
  DEFAULT_MAPS_SPEC_URL,
  resolveMapsAssetsBaseUrl,
  resolveMapsAssetsRepo,
  resolveMapsSpecUrl,
  resolveMapsUpdateCatalogUrl,
} from '../../constants/map_sources.js'

test('каталог карт по умолчанию берётся из ветки ru-main форка «Ковчег»', () => {
  assert.equal(
    DEFAULT_MAPS_SPEC_URL,
    'https://raw.githubusercontent.com/sarichanton/kovcheg/ru-main/collections/maps.json'
  )
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
