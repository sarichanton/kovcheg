/**
 * The prompt catalogue is the one place where both language variants live, so
 * these tests guard the contract every caller depends on:
 *
 *   - `AI_PROMPT_LANG` selects `en`, and everything else defaults to `ru`;
 *   - every key really has both variants;
 *   - the template arguments and structured-output JSON survive translation.
 *
 * Plain node, no Adonis boot:
 *   node --import ts-node-maintained/register/esm --test tests/unit/ai_prompts.spec.ts
 */
import * as assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  DEFAULT_PROMPT_LANG,
  PROMPTS,
  REWRITE_LABELS,
  SUPPORTED_PROMPT_LANGS,
  SYSTEM_PROMPTS,
  getSystemPrompts,
  resolvePromptLang,
  type PromptLang,
} from '../../constants/prompts.js'

const KEYS = Object.keys(PROMPTS) as Array<keyof typeof PROMPTS>

/** A prompt is either a plain string or a function taking one template arg. */
type PromptValue = string | ((context: string) => string)

function render(value: PromptValue, marker = '__TEMPLATE_ARG__'): string {
  return typeof value === 'function' ? value(marker) : value
}

/** Placeholders in the literal source, e.g. `${context}`. */
function placeholders(value: PromptValue): string[] {
  const source = typeof value === 'function' ? value.toString() : value
  return [...source.matchAll(/\$\{[^}]+\}/g)].map((match) => match[0]).sort()
}

function withPromptLang<T>(value: string | undefined, run: () => T): T {
  const previous = process.env.AI_PROMPT_LANG
  try {
    if (value === undefined) delete process.env.AI_PROMPT_LANG
    else process.env.AI_PROMPT_LANG = value
    return run()
  } finally {
    if (previous === undefined) delete process.env.AI_PROMPT_LANG
    else process.env.AI_PROMPT_LANG = previous
  }
}

test('prompt language: en is opt-in, unset or invalid values default to ru', () => {
  assert.equal(DEFAULT_PROMPT_LANG, 'ru')
  assert.deepEqual([...SUPPORTED_PROMPT_LANGS], ['ru', 'en'])

  assert.equal(resolvePromptLang('en'), 'en')
  assert.equal(resolvePromptLang('EN'), 'en')
  assert.equal(resolvePromptLang(' en '), 'en')
  assert.equal(resolvePromptLang('ru'), 'ru')
  for (const invalid of [undefined, null, '', 'fr', 'de', 1, {}, true]) {
    assert.equal(resolvePromptLang(invalid), 'ru', `expected ${String(invalid)} to fall back to ru`)
  }
})

test('prompt language: AI_PROMPT_LANG controls getSystemPrompts and SYSTEM_PROMPTS', () => {
  withPromptLang(undefined, () => {
    assert.equal(resolvePromptLang(), 'ru')
    assert.equal(getSystemPrompts().default, PROMPTS.default.ru)
    assert.equal(SYSTEM_PROMPTS.default, PROMPTS.default.ru)
  })

  withPromptLang('en', () => {
    assert.equal(resolvePromptLang(), 'en')
    assert.equal(getSystemPrompts().default, PROMPTS.default.en)
    assert.equal(getSystemPrompts().title_generation, PROMPTS.title_generation.en)
    assert.equal(SYSTEM_PROMPTS.default, PROMPTS.default.en)
  })

  withPromptLang('ru', () => {
    assert.equal(getSystemPrompts().default, PROMPTS.default.ru)
    assert.equal(SYSTEM_PROMPTS.rag_context('CTX'), PROMPTS.rag_context.ru('CTX'))
  })
})

test('prompt catalogue: every prompt has a non-empty ru and en version', () => {
  assert.ok(KEYS.length > 0)

  for (const key of KEYS) {
    for (const lang of SUPPORTED_PROMPT_LANGS) {
      const value = PROMPTS[key][lang] as PromptValue
      const rendered = render(value)
      assert.ok(
        rendered.trim().length > 0,
        `${String(key)}.${lang} must be a non-empty prompt`
      )
    }
  }
})

test('prompt catalogue: ru and en preserve the same template placeholders', () => {
  for (const key of KEYS) {
    const ru = PROMPTS[key].ru as PromptValue
    const en = PROMPTS[key].en as PromptValue

    assert.deepEqual(
      placeholders(ru),
      placeholders(en),
      `${String(key)}: ru and en must use the same placeholders`
    )

    // The one prompt with an argument must interpolate it in both languages.
    if (typeof ru === 'function' || typeof en === 'function') {
      assert.ok(render(ru).includes('__TEMPLATE_ARG__'), `${String(key)}.ru lost its argument`)
      assert.ok(render(en).includes('__TEMPLATE_ARG__'), `${String(key)}.en lost its argument`)
    }
  }
})

test('rag_context: both languages embed the retrieved context under a stable marker', () => {
  const context = '[Context 1 — Water]\nBoil for one minute.'

  for (const lang of SUPPORTED_PROMPT_LANGS) {
    const rendered = PROMPTS.rag_context[lang](context)
    assert.ok(rendered.includes(context), `rag_context.${lang} must interpolate the context`)
  }

  assert.match(PROMPTS.rag_context.ru('CTX'), /\[Контекст базы знаний\]/)
  assert.match(PROMPTS.rag_context.en('CTX'), /\[Knowledge Base Context\]/)
})

test('structured prompts keep the exact JSON shapes the parsers expect', () => {
  for (const lang of SUPPORTED_PROMPT_LANGS) {
    assert.ok(
      PROMPTS.chat_suggestions[lang].includes('{"suggestions": ["...", "...", "..."]}'),
      `chat_suggestions.${lang} must keep the suggestions JSON shape`
    )
    assert.ok(
      PROMPTS.title_generation[lang].includes('{"title": "..."}'),
      `title_generation.${lang} must keep the title JSON shape`
    )
    assert.ok(
      PROMPTS.relevance_check[lang].includes('{"on_topic": true}') &&
        PROMPTS.relevance_check[lang].includes('{"on_topic": false}'),
      `relevance_check.${lang} must keep both boolean JSON shapes`
    )
    assert.ok(
      PROMPTS.query_rewrite[lang].includes('{"queries": ["..."]}'),
      `query_rewrite.${lang} must keep the queries JSON shape`
    )
  }
})

test('Russian answer prompts explicitly require Russian', () => {
  const answerPrompts = [
    'default',
    'rag_context',
    'chat_suggestions',
    'title_generation',
    'query_rewrite',
  ] as const

  for (const key of answerPrompts) {
    const ru = render(PROMPTS[key].ru as PromptValue)
    assert.match(ru, /русск/i, `${key}.ru must tell the model to answer in Russian`)
  }
})

test('query-rewrite labels follow the selected language', () => {
  assert.deepEqual(REWRITE_LABELS.ru, {
    conversation: 'Диалог',
    user: 'Пользователь',
    assistant: 'Ассистент',
    rewrittenQuery: 'Переписанный запрос',
  })
  assert.deepEqual(REWRITE_LABELS.en, {
    conversation: 'Conversation',
    user: 'User',
    assistant: 'Assistant',
    rewrittenQuery: 'Rewritten Query',
  })
})

// A compile-time guard that the public language type stays a closed union.
const _langs: PromptLang[] = ['ru', 'en']
void _langs
