import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyLocaleToDocument,
  formatDate as formatDateForLocale,
  formatNumber as formatNumberForLocale,
  getStoredLocale,
  isLocale,
  setStoredLocale,
  translate,
  type Locale,
  type TranslateKey,
  type TranslationParams,
} from './index.js'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslateKey, params?: TranslationParams) => string
  formatDate: (value: Date | number | string, options?: Intl.DateTimeFormatOptions) => string
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getStoredLocale)

  useEffect(() => {
    applyLocaleToDocument(locale)
  }, [locale])

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return
    setLocaleState(next)
    setStoredLocale(next)
    applyLocaleToDocument(next)
  }, [])

  const t = useCallback(
    (key: TranslateKey, params?: TranslationParams) => translate(locale, key, params),
    [locale]
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      formatDate: (date, options) => formatDateForLocale(locale, date, options),
      formatNumber: (number, options) => formatNumberForLocale(locale, number, options),
    }),
    [locale, setLocale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

/**
 * Access the active locale and translation helpers.
 * Must be rendered inside <I18nProvider>.
 */
export function useT(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useT must be used within an I18nProvider')
  }
  return context
}
