import type { BaseStylesFile } from '../../types/maps.js'

/** Label language used for the offline maps. */
export type MapLabelLang = 'ru' | 'en'

/** Upstream styles are English-first; Russian is the Ark's default. */
export const DEFAULT_MAP_LABEL_LANG: MapLabelLang = 'ru'

export const SUPPORTED_MAP_LABEL_LANGS: readonly MapLabelLang[] = ['ru', 'en']

/**
 * Preferred label expression: use the Russian name when the vector tile has
 * one, then the local/default name, and only then the English name.
 */
const RUSSIAN_NAME_PRIORITY = [
  'coalesce',
  ['get', 'name:ru'],
  ['get', 'name'],
  ['get', 'name:en'],
] as const

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Walk a MapLibre expression and replace every `["get", "name:en"]` leaf with
 * the Russian-first fallback chain. Everything around the replaced leaf
 * (`case`, `format`, `step`, ...) is left untouched, so the surrounding style
 * logic keeps working.
 */
function localizeExpression(expression: unknown): unknown {
  if (Array.isArray(expression)) {
    if (expression[0] === 'get' && expression[1] === 'name:en') {
      return cloneExpression(RUSSIAN_NAME_PRIORITY)
    }

    return expression.map((part) => localizeExpression(part))
  }

  if (isPlainObject(expression)) {
    return Object.fromEntries(
      Object.entries(expression).map(([key, value]) => [key, localizeExpression(value)])
    )
  }

  return expression
}

function cloneExpression(expression: unknown): unknown {
  if (Array.isArray(expression)) {
    return expression.map((part) => cloneExpression(part))
  }

  if (isPlainObject(expression)) {
    return Object.fromEntries(
      Object.entries(expression).map(([key, value]) => [key, cloneExpression(value)])
    )
  }

  return expression
}

/**
 * Localize the `layout.text-field` of every style layer.
 *
 * Returns a new style object and never mutates the input. With `lang = "en"`
 * (or any language other than `"ru"`) the upstream style is returned as-is.
 */
export function localizeMapStyle(
  style: BaseStylesFile,
  lang: string = DEFAULT_MAP_LABEL_LANG
): BaseStylesFile {
  if (lang.trim().toLowerCase() !== 'ru') {
    return style
  }

  return {
    ...style,
    layers: style.layers.map((layer) => {
      const textField = layer.layout?.['text-field']
      if (textField === undefined) {
        return layer
      }

      return {
        ...layer,
        layout: {
          ...layer.layout,
          'text-field': localizeExpression(textField),
        },
      }
    }),
  }
}

/** Explicitly named alias for callers that prefer an action-oriented name. */
export const applyMapLabelLanguage = localizeMapStyle
