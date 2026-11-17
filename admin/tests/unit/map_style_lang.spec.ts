import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  DEFAULT_MAP_LABEL_LANG,
  localizeMapStyle,
  type MapLabelLang,
} from '../../app/utils/map_style_lang.js'
import type { BaseStylesFile, MapLayer } from '../../types/maps.js'

const RU_PRIORITY = ['coalesce', ['get', 'name:ru'], ['get', 'name'], ['get', 'name:en']]

function makeStyle(layers: MapLayer[]): BaseStylesFile {
  return {
    version: 8,
    sources: {},
    layers,
    sprite: '',
    glyphs: '',
  }
}

test('defaults to Russian labels', () => {
  assert.equal(DEFAULT_MAP_LABEL_LANG, 'ru')
})

test('replaces a direct name:en text-field with the Russian-first priority', () => {
  const style = makeStyle([
    { id: 'place-labels', type: 'symbol', layout: { 'text-field': ['get', 'name:en'] } },
  ])

  const result = localizeMapStyle(style)

  assert.deepEqual(result.layers[0].layout['text-field'], RU_PRIORITY)
})

test('rewrites name:en leaves nested inside larger expressions without breaking them', () => {
  const textField = [
    'case',
    ['has', 'name:en'],
    ['format', ['get', 'name:en'], {}, '\n', {}, ['get', 'name']],
    ['get', 'name'],
  ]
  const style = makeStyle([{ id: 'labels', type: 'symbol', layout: { 'text-field': textField } }])

  const result = localizeMapStyle(style)
  const layout = result.layers[0].layout

  assert.deepEqual(layout['text-field'], [
    'case',
    ['has', 'name:en'],
    ['format', RU_PRIORITY, {}, '\n', {}, ['get', 'name']],
    ['get', 'name'],
  ])
  // `has` is a presence check, not a label lookup, and must stay untouched.
  assert.deepEqual(layout['text-field'][1], ['has', 'name:en'])
})

test('rewrites every name:en lookup in the text-field', () => {
  const style = makeStyle([
    {
      id: 'double-label',
      type: 'symbol',
      layout: {
        'text-field': [
          'format',
          ['coalesce', ['get', 'name:en'], ['get', 'name:en']],
          {},
          '\n',
          {},
          ['get', 'name:en'],
        ],
      },
    },
  ])

  const result = localizeMapStyle(style, 'ru')
  const textField = result.layers[0].layout['text-field']

  assert.deepEqual(textField[1], ['coalesce', RU_PRIORITY, RU_PRIORITY])
  assert.deepEqual(textField[5], RU_PRIORITY)
})

test('only touches layout.text-field, including in nested style objects', () => {
  const filter = ['==', ['get', 'name:en'], 'Paris']
  const style = makeStyle([
    {
      id: 'capital',
      type: 'symbol',
      filter,
      paint: { 'text-color': ['get', 'name:en'] },
      layout: { 'text-field': ['step', ['zoom'], ['get', 'name:en'], 10, ['get', 'name']] },
    },
    {
      id: 'water',
      type: 'fill',
      layout: { visibility: 'visible' },
    },
  ])

  const result = localizeMapStyle(style)

  assert.deepEqual(result.layers[0].filter, filter)
  assert.deepEqual(result.layers[0].paint, { 'text-color': ['get', 'name:en'] })
  assert.deepEqual(result.layers[0].layout['text-field'], [
    'step',
    ['zoom'],
    RU_PRIORITY,
    10,
    ['get', 'name'],
  ])
  assert.deepEqual(result.layers[1].layout, { visibility: 'visible' })
})

test('leaves string text-fields alone', () => {
  const style = makeStyle([
    { id: 'static-label', type: 'symbol', layout: { 'text-field': '{name}' } },
  ])

  const result = localizeMapStyle(style)

  assert.equal(result.layers[0].layout['text-field'], '{name}')
})

test('does not mutate the input style', () => {
  const style = makeStyle([
    { id: 'labels', type: 'symbol', layout: { 'text-field': ['get', 'name:en'] } },
  ])
  const before = structuredClone(style)

  localizeMapStyle(style)

  assert.deepEqual(style, before)
})

test('en keeps the upstream style exactly as-is', () => {
  const style = makeStyle([
    { id: 'labels', type: 'symbol', layout: { 'text-field': ['get', 'name:en'] } },
  ])
  const before = structuredClone(style)

  for (const lang of ['en', 'EN', ' en '] as MapLabelLang[]) {
    const result = localizeMapStyle(style, lang)
    assert.equal(result, style)
    assert.deepEqual(result, before)
  }
})
