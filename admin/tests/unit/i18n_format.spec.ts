import { test } from 'node:test'
import assert from 'node:assert/strict'

import { formatBytes } from '../../inertia/lib/util.js'
import { localizeServerMessage } from '../../inertia/lib/serverMessages.js'
import { translate, type TranslateKey, type TranslationParams } from '../../inertia/i18n/index.js'

function translateWith(locale: 'ru' | 'en') {
  return (key: TranslateKey, params?: TranslationParams) => translate(locale, key, params)
}

test('formatBytes uses Russian units and a decimal comma', () => {
  assert.equal(formatBytes(0, 2, 'ru'), '0 Б')
  assert.equal(formatBytes(1536, 2, 'ru'), '1,5 КБ')
  assert.equal(formatBytes(1234567, 1, 'ru'), '1,2 МБ')
  assert.equal(formatBytes(1024 ** 3, 2, 'ru'), '1 ГБ')
  assert.equal(formatBytes(1024 ** 4, 2, 'ru'), '1 ТБ')
})

test('formatBytes keeps the English units and decimal point', () => {
  assert.equal(formatBytes(0, 2, 'en'), '0 Bytes')
  assert.equal(formatBytes(1536, 2, 'en'), '1.5 KB')
  assert.equal(formatBytes(1234567, 1, 'en'), '1.2 MB')
  assert.equal(formatBytes(1024 ** 4, 2, 'en'), '1 TB')
})

test('localizeServerMessage translates a known server message', () => {
  assert.equal(
    localizeServerMessage('Setting updated successfully', translateWith('ru')),
    'Настройка сохранена'
  )
  assert.equal(
    localizeServerMessage('Setting updated successfully', translateWith('en')),
    'Setting updated successfully'
  )
})

test('localizeServerMessage interpolates dynamic server messages', () => {
  assert.equal(
    localizeServerMessage('Service nomad_ollama started successfully', translateWith('ru')),
    'Сервис nomad_ollama запущен'
  )
})

test('localizeServerMessage leaves unknown messages untouched', () => {
  assert.equal(
    localizeServerMessage('Some unexpected server failure', translateWith('ru')),
    'Some unexpected server failure'
  )
})
