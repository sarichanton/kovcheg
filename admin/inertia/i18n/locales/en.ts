/**
 * English dictionary — the source of truth for translation keys.
 *
 * Add a new string here first, then add the Russian counterpart in ru.ts.
 * TypeScript will fail the build when ru.ts misses a key from this file.
 */
export type PluralForms = {
  one: string
  few: string
  many: string
  other: string
}

export interface TranslationDictionary {
  [key: string]: string | PluralForms | TranslationDictionary
}

export const en = {
  app: {
    name: 'Kovcheg',
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    loading: 'Loading…',
    error: 'Error',
    retry: 'Retry',
    yes: 'Yes',
    no: 'No',
    search: 'Search',
    settings: 'Settings',
    language: 'Language',
    russian: 'Русский',
    english: 'English',
    apply: 'Apply',
    confirm: 'Confirm',
    edit: 'Edit',
    add: 'Add',
    remove: 'Remove',
    refresh: 'Refresh',
    download: 'Download',
    upload: 'Upload',
    install: 'Install',
    start: 'Start',
    stop: 'Stop',
    open: 'Open',
    copy: 'Copy',
    copied: 'Copied',
    welcome: 'Welcome, {name}!',
    files: {
      one: '{count} file',
      few: '{count} files',
      many: '{count} files',
      other: '{count} files',
    },
    items: {
      one: '{count} item',
      few: '{count} items',
      many: '{count} items',
      other: '{count} items',
    },
  },
  nav: {
    home: 'Home',
    backToHome: 'Back to Home',
    commandCenter: 'Command Center',
    easySetup: 'Easy Setup',
    supplyDepot: 'Supply Depot',
    benchmark: 'Benchmark',
    contentExplorer: 'Content Explorer',
    contentManager: 'Content Manager',
    creatorPacks: 'Creator Packs',
    maps: 'Maps',
    mapsManager: 'Maps Manager',
    drugReference: 'Drug Reference',
    serviceLogs: 'Service Logs & Metrics',
    updates: 'Check for Updates',
    system: 'System',
    advanced: 'Advanced',
    apiReference: 'API Reference',
    support: 'Support the Project',
    legal: 'Legal Notices',
    settings: 'Settings',
    docs: 'Docs',
  },
  errors: {
    generic: 'Something went wrong',
    network: 'Network error. Check your connection and try again.',
    notFound: 'Page not found',
    server: 'Server error. Try again later.',
    required: '{field} is required',
    timeout: 'The request timed out. Try again.',
    unknown: 'Unknown error',
    loadFailed: 'Failed to load data',
  },
} as const satisfies TranslationDictionary

export type EnDictionary = typeof en

/**
 * Mirrors the exact key tree of the English dictionary while replacing every
 * translated leaf (including plural forms) with a plain string. Used to type
 * ru.ts, so a missing key becomes a compile-time error.
 */
export type TranslationShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends PluralForms
      ? PluralForms
      : T[K] extends Record<string, unknown>
        ? TranslationShape<T[K]>
        : never
}

export default en
