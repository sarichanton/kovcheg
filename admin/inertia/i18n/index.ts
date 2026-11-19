import { en, type PluralForms, type TranslationDictionary } from './locales/en.js'
import { ru } from './locales/ru.js'

export type Locale = 'ru' | 'en'

export const SUPPORTED_LOCALES: readonly Locale[] = ['ru', 'en']
export const DEFAULT_LOCALE: Locale = 'ru'
export const LOCALE_STORAGE_KEY = 'kovcheg.locale'

/** BCP 47 locales used for Intl formatting. */
export const INTL_LOCALES: Record<Locale, string> = {
  ru: 'ru-RU',
  en: 'en-US',
}

export { en, ru }
export type { PluralForms, TranslationDictionary }

export type DictionaryValue = string | PluralForms | TranslationDictionary

export type TranslationParams = Record<string, string | number | boolean | null | undefined> & {
  /** Drives plural selection for entries stored as {one, few, many, other}. */
  count?: number
}

type KeyPaths<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends PluralForms
      ? K
      : T[K] extends Record<string, unknown>
        ? `${K}.${KeyPaths<T[K]>}`
        : never
}[keyof T & string]

/** All dotted keys defined in the English dictionary. */
export type TranslationKey = KeyPaths<typeof en>

/**
 * Autocomplete-friendly key type. Plain strings stay allowed for dynamic keys
 * and for the runtime fallback path (an unknown key is returned as-is).
 */
export type TranslateKey = TranslationKey | (string & {})

export type LocaleDictionaries = Partial<Record<Locale, TranslationDictionary>> & {
  en: TranslationDictionary
}

export const dictionaries = { ru, en } satisfies LocaleDictionaries

const pluralRules: Record<Locale, Intl.PluralRules> = {
  ru: new Intl.PluralRules('ru'),
  en: new Intl.PluralRules('en'),
}

function isPluralForms(value: DictionaryValue): value is PluralForms {
  if (typeof value !== 'object' || value === null) return false
  const forms = value as Record<string, unknown>
  return typeof forms.one === 'string' && typeof forms.other === 'string'
}

function lookup(dictionary: TranslationDictionary, key: string): DictionaryValue | undefined {
  let current: DictionaryValue | undefined = dictionary

  for (const segment of key.split('.')) {
    if (typeof current !== 'object' || current === null || isPluralForms(current)) {
      return undefined
    }
    current = (current as TranslationDictionary)[segment]
  }

  return current
}

function interpolate(template: string, params?: TranslationParams): string {
  if (!params) return template

  return template.replace(/\{(\w+)\}/g, (placeholder, name: string) => {
    const value = params[name]
    return value === undefined || value === null ? placeholder : String(value)
  })
}

function isDevelopment(): boolean {
  // @ts-ignore -- Vite injects import.meta.env; it does not exist under Node tests.
  return Boolean(import.meta.env?.DEV)
}

function warnMissingKey(key: string): void {
  if (!isDevelopment()) return
  console.warn(`[i18n] Missing translation key: "${key}"`)
}

/**
 * Translate `key` for `locale`. Resolution order:
 *   1. the selected locale;
 *   2. English as a fallback;
 *   3. the key itself (with a development-only warning).
 *
 * Values stored as {one, few, many, other} are pluralized with
 * Intl.PluralRules(locale).select(params.count).
 */
export function translateWithDictionaries(
  catalogs: LocaleDictionaries,
  locale: Locale,
  key: string,
  params?: TranslationParams
): string {
  const active = catalogs[locale]
  const fallback = catalogs.en

  let value = active ? lookup(active, key) : undefined
  if (value === undefined && active !== fallback) {
    value = lookup(fallback, key)
  }

  if (value === undefined) {
    warnMissingKey(key)
    return key
  }

  if (typeof value === 'string') {
    return interpolate(value, params)
  }

  if (isPluralForms(value)) {
    const form =
      typeof params?.count === 'number' ? pluralRules[locale].select(params.count) : 'other'
    const forms = value as Record<string, string>
    return interpolate(forms[form] ?? value.other, params)
  }

  // The key points at a namespace, not a translatable value.
  warnMissingKey(key)
  return key
}

export function translate(locale: Locale, key: TranslateKey, params?: TranslationParams): string {
  return translateWithDictionaries(dictionaries, locale, key, params)
}

export function isLocale(value: unknown): value is Locale {
  return value === 'ru' || value === 'en'
}

interface LocaleStorage {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

interface LocaleDocument {
  documentElement?: { lang: string }
}

const globalScope = globalThis as unknown as {
  localStorage?: LocaleStorage
  document?: LocaleDocument
}

function readStorage(key: string): string | null {
  try {
    return globalScope.localStorage?.getItem(key) ?? null
  } catch {
    // localStorage can be unavailable (SSR, private mode, blocked storage).
    return null
  }
}

function writeStorage(key: string, value: string): void {
  try {
    globalScope.localStorage?.setItem(key, value)
  } catch {
    // Persistence is best-effort; the in-memory locale still works.
  }
}

export function getStoredLocale(): Locale {
  const stored = readStorage(LOCALE_STORAGE_KEY)
  return isLocale(stored) ? stored : DEFAULT_LOCALE
}

export function setStoredLocale(locale: Locale): void {
  if (!isLocale(locale)) return
  writeStorage(LOCALE_STORAGE_KEY, locale)
}

/**
 * The locale currently selected in the UI. Kept in module state so helpers
 * outside React (formatBytes, localizeServerMessage, …) can follow the
 * provider without threading a locale argument through every call site.
 * I18nProvider keeps this in sync via setCurrentLocale.
 */
let currentLocale: Locale = getStoredLocale()

export function getCurrentLocale(): Locale {
  return currentLocale
}

export function setCurrentLocale(locale: Locale): void {
  if (!isLocale(locale)) return
  currentLocale = locale
}

/** Keep the <html lang="…"> attribute in sync with the selected locale. */
export function applyLocaleToDocument(locale: Locale): void {
  try {
    const documentRef = globalScope.document
    if (documentRef?.documentElement) {
      documentRef.documentElement.lang = locale
    }
  } catch {
    // No DOM (tests/SSR) — nothing to update.
  }
}

export function getIntlLocale(locale: Locale): string {
  return INTL_LOCALES[locale]
}

export function formatDate(
  locale: Locale,
  value: Date | number | string,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat(INTL_LOCALES[locale], options).format(date)
}

export function formatNumber(
  locale: Locale,
  value: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(INTL_LOCALES[locale], options).format(value)
}
