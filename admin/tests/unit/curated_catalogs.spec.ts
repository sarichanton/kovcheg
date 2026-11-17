import * as assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import vine from '@vinejs/vine'

import {
  wikipediaSpecSchema,
  zimCategoriesSpecSchema,
} from '../../app/validators/curated_collections.js'

/**
 * The curated catalogs in `collections/` are served verbatim from the fork and
 * validated by the app before use. A malformed file therefore fails at runtime
 * for every user, not at build time. These tests load the real files and run
 * them through the same VineJS schemas the services use.
 */

const COLLECTIONS_DIR = new URL('../../../collections/', import.meta.url)

function readCatalog(name: string): unknown {
  return JSON.parse(readFileSync(new URL(name, COLLECTIONS_DIR), 'utf8'))
}

test('collections/wikipedia.json проходит wikipediaSpecSchema', async () => {
  const validated: any = await vine.validate({
    schema: wikipediaSpecSchema,
    data: readCatalog('wikipedia.json'),
  })

  const ids = validated.options.map((option: any) => option.id)
  assert.equal(
    new Set(ids).size,
    ids.length,
    'идентификаторы вариантов Википедии должны быть уникальны'
  )

  const russian = validated.options.filter((option: any) => option.id.startsWith('ru-'))
  assert.ok(russian.length > 0, 'в каталоге должны быть русские варианты Википедии')
  for (const option of russian) {
    assert.match(
      option.url,
      /^https:\/\/download\.kiwix\.org\/zim\/wikipedia\/wikipedia_ru_[\w-]+_\d{4}-\d{2}\.zim$/,
      `некорректный URL русской Википедии: ${option.url}`
    )
  }
})

test('collections/kiwix-categories.json проходит zimCategoriesSpecSchema', async () => {
  const validated: any = await vine.validate({
    schema: zimCategoriesSpecSchema,
    data: readCatalog('kiwix-categories.json'),
  })

  const categorySlugs = validated.categories.map((category: any) => category.slug)
  assert.equal(
    new Set(categorySlugs).size,
    categorySlugs.length,
    'slug категорий должны быть уникальны'
  )

  for (const category of validated.categories) {
    const categoryIds = category.tiers.flatMap((tier: any) =>
      tier.resources.map((resource: any) => resource.id)
    )
    assert.equal(
      new Set(categoryIds).size,
      categoryIds.length,
      `id ресурсов внутри категории «${category.slug}» должны быть уникальны`
    )
  }

  const russian = validated.categories.find((category: any) => category.slug === 'russian')
  assert.ok(russian, 'должна быть категория «Русский язык»')
  assert.equal(russian.language, 'ru')

  const russianIds = russian.tiers.flatMap((tier: any) =>
    tier.resources.map((resource: any) => resource.id)
  )
  const otherIds = new Set(
    validated.categories
      .filter((category: any) => category.slug !== 'russian')
      .flatMap((category: any) =>
        category.tiers.flatMap((tier: any) => tier.resources.map((resource: any) => resource.id))
      )
  )
  for (const id of russianIds) {
    assert.ok(!otherIds.has(id), `русский ресурс «${id}» дублирует ресурс другой категории`)
  }

  const titles = russian.tiers.flatMap((tier: any) =>
    tier.resources.map((resource: any) => resource.title)
  )
  for (const expected of ['Викисловарь', 'Викиучебник', 'Викитека', 'Викигид', 'Викицитатник']) {
    assert.ok(titles.includes(expected), `в русской категории нет ресурса «${expected}»`)
  }
})
