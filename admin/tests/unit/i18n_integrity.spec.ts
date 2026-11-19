import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as ts from 'typescript'

import { en } from '../../inertia/i18n/locales/en.js'
import { ru } from '../../inertia/i18n/locales/ru.js'

type DictionaryNode = string | { [key: string]: DictionaryNode }

const enDictionary = en as unknown as DictionaryNode
const ruDictionary = ru as unknown as DictionaryNode

const PLURAL_FORMS = ['one', 'few', 'many', 'other'] as const

function flattenStrings(
  value: DictionaryNode,
  prefix = '',
  out: Record<string, string> = {}
): Record<string, string> {
  if (typeof value === 'string') {
    out[prefix] = value
    return out
  }

  for (const [key, child] of Object.entries(value)) {
    flattenStrings(child, prefix ? `${prefix}.${key}` : key, out)
  }
  return out
}

function isPluralObject(value: DictionaryNode): value is Record<string, string> {
  if (typeof value !== 'object' || value === null) return false
  const keys = Object.keys(value)
  return keys.length > 0 && keys.every((key) => (PLURAL_FORMS as readonly string[]).includes(key))
}

function hasTranslationKey(dictionary: DictionaryNode, key: string): boolean {
  let current: DictionaryNode | undefined = dictionary

  for (const segment of key.split('.')) {
    if (typeof current !== 'object' || current === null || isPluralObject(current)) return false
    current = current[segment]
    if (current === undefined) return false
  }

  return typeof current === 'string' || isPluralObject(current)
}

function placeholders(value: string): string[] {
  return [...new Set([...value.matchAll(/\{(\w+)\}/g)].map((match) => match[1]))].sort()
}

function collectSourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === 'locales') continue
      collectSourceFiles(fullPath, out)
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      out.push(fullPath)
    }
  }
  return out
}

function staticTranslationKeys(file: string): string[] {
  const source = fs.readFileSync(file, 'utf8')
  const sourceFile = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
  const keys: string[] = []

  function visit(node: ts.Node) {
    if (ts.isCallExpression(node) && node.expression.getText(sourceFile) === 't') {
      const firstArgument = node.arguments[0]
      if (firstArgument && ts.isStringLiteralLike(firstArgument)) {
        keys.push(firstArgument.text)
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return keys
}

test('ru and en dictionaries have exactly the same recursive key set', () => {
  assert.deepEqual(Object.keys(flattenStrings(ruDictionary)).sort(), Object.keys(flattenStrings(enDictionary)).sort())
})

test('every Russian string keeps the English placeholder set', () => {
  const ruStrings = flattenStrings(ruDictionary)
  const enStrings = flattenStrings(enDictionary)

  for (const [key, ruValue] of Object.entries(ruStrings)) {
    const enValue = enStrings[key]
    if (typeof enValue !== 'string') {
      assert.fail(`missing English value for ${key}`)
    }
    assert.deepEqual(
      placeholders(ruValue),
      placeholders(enValue),
      `placeholder mismatch for ${key}`
    )
  }
})

test('Russian plural entries contain one, few, many and other', () => {
  function visit(value: DictionaryNode, prefix: string) {
    if (typeof value === 'string') return

    const keys = Object.keys(value)
    const onlyPluralKeys = keys.every((key) =>
      (PLURAL_FORMS as readonly string[]).includes(key)
    )
    if (onlyPluralKeys && keys.length > 0) {
      assert.deepEqual(
        [...keys].sort(),
        [...PLURAL_FORMS].sort(),
        `incomplete plural forms at ${prefix}`
      )
      return
    }

    for (const [key, child] of Object.entries(value)) {
      visit(child, prefix ? `${prefix}.${key}` : key)
    }
  }

  visit(ruDictionary, '')
})

test('Russian dictionary has no empty strings', () => {
  for (const [key, value] of Object.entries(flattenStrings(ruDictionary))) {
    assert.ok(value.trim().length > 0, `empty Russian string at ${key}`)
  }
})

test('Russian dictionary calls the product «Ковчег», not NOMAD', () => {
  const allowedMentions = ['NOMAD.md', 'project-nomad', 'Project NOMAD']
  const offenders = Object.entries(flattenStrings(ruDictionary))
    .filter(([, value]) => /\bNOMAD\b/.test(value))
    .filter(([, value]) => !allowedMentions.some((mention) => value.includes(mention)))
    .map(([key, value]) => `${key}: ${value}`)

  assert.deepEqual(
    offenders,
    [],
    `NOMAD may only appear in NOMAD.md / project-nomad / Project NOMAD mentions:\n${offenders.join('\n')}`
  )
})

test('every static t() key exists in both dictionaries', () => {
  const here = path.dirname(fileURLToPath(import.meta.url))
  const inertiaRoot = path.resolve(here, '../../inertia')
  const missing: string[] = []

  for (const file of collectSourceFiles(inertiaRoot)) {
    for (const key of staticTranslationKeys(file)) {
      if (!hasTranslationKey(enDictionary, key) || !hasTranslationKey(ruDictionary, key)) {
        missing.push(`${path.relative(inertiaRoot, file)}: ${key}`)
      }
    }
  }

  assert.deepEqual(missing, [], `t() keys missing from the dictionaries:\n${missing.join('\n')}`)
})
