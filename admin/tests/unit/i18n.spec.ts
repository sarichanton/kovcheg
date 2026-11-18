import { test } from 'node:test'
import assert from 'node:assert/strict'

import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  applyLocaleToDocument,
  formatDate,
  formatNumber,
  getStoredLocale,
  isLocale,
  translate,
  translateWithDictionaries,
  type LocaleDictionaries,
} from '../../inertia/i18n/index.js'
import { en } from '../../inertia/i18n/locales/en.js'
import { ru } from '../../inertia/i18n/locales/ru.js'

function flattenKeys(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix]
  if (typeof value !== 'object' || value === null) return []

  return Object.entries(value).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key)
  )
}

test('defaults to Russian and exposes a stable storage key', () => {
  assert.equal(DEFAULT_LOCALE, 'ru')
  assert.equal(LOCALE_STORAGE_KEY, 'kovcheg.locale')
})

test('ru and en dictionaries have exactly the same recursive key set', () => {
  const ruKeys = flattenKeys(ru).sort()
  const enKeys = flattenKeys(en).sort()

  assert.deepEqual(ruKeys, enKeys)
})

test('substitutes named parameters', () => {
  assert.equal(translate('ru', 'common.welcome', { name: 'Иван' }), 'Добро пожаловать, Иван!')
  assert.equal(translate('en', 'common.welcome', { name: 'Ivan' }), 'Welcome, Ivan!')
  assert.equal(translate('ru', 'errors.required', { field: 'Имя' }), 'Заполните поле «Имя»')
})

test('uses Russian plural forms (one / few / many)', () => {
  const cases: Array<[number, string]> = [
    [1, '1 файл'],
    [2, '2 файла'],
    [5, '5 файлов'],
    [11, '11 файлов'],
    [21, '21 файл'],
    [22, '22 файла'],
  ]

  for (const [count, expected] of cases) {
    assert.equal(translate('ru', 'common.files', { count }), expected)
  }
})

test('uses English one / other plural forms', () => {
  assert.equal(translate('en', 'common.files', { count: 1 }), '1 file')
  assert.equal(translate('en', 'common.files', { count: 5 }), '5 files')
})

test('falls back to English when the selected locale has no value', () => {
  const partial: LocaleDictionaries = {
    ru: { common: {} },
    en: { common: { save: 'Save', welcome: 'Welcome, {name}!' } },
  }

  assert.equal(translateWithDictionaries(partial, 'ru', 'common.save'), 'Save')
  assert.equal(
    translateWithDictionaries(partial, 'ru', 'common.welcome', { name: 'Ivan' }),
    'Welcome, Ivan!'
  )
})

test('returns the key itself when neither locale has the value', () => {
  assert.equal(translate('ru', 'common.doesNotExist'), 'common.doesNotExist')
  assert.equal(
    translateWithDictionaries({ ru: {}, en: {} }, 'ru', 'errors.doesNotExist'),
    'errors.doesNotExist'
  )
})

test('Intl helpers follow ru-RU / en-US formatting', () => {
  assert.equal(formatNumber('en', 1234.5), '1,234.5')
  assert.equal(formatNumber('ru', 1234.5).replace(/\s/g, ' '), '1 234,5')
  assert.match(formatDate('en', new Date('2026-01-15T12:00:00Z')), /2026/)
  assert.match(formatDate('ru', new Date('2026-01-15T12:00:00Z')), /2026/)
})

test('locale persistence degrades safely without localStorage', () => {
  assert.equal(isLocale('ru'), true)
  assert.equal(isLocale('de'), false)
  assert.ok(isLocale(getStoredLocale()))

  // Both helpers must be no-ops rather than throwing in a DOM-less process.
  assert.doesNotThrow(() => applyLocaleToDocument('en'))
})
