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
    copyToClipboard: 'Copy to Clipboard',
    openGitHubIssue: 'Open a GitHub Issue',
    debugInfo: 'Debug Info',
    noRecords: 'No records found',
    collapseRow: 'Collapse row',
    expandRow: 'Expand row',
    dismissAlert: 'Dismiss alert',
    moreInformation: 'More information',
    downloadComplete: 'Download complete',
    estimatedSpeed: 'Est. Speed: {speed}',
    switchToDayOps: 'Switch to Day Ops',
    switchToNightOps: 'Switch to Night Ops',
    dayOps: 'Day Ops',
    nightOps: 'Night Ops',
    fadingImageAlt: 'Fading image',
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
  layout: {
    logoAlt: 'Project NOMAD Logo',
    footerBrand: 'Project NOMAD™ Command Center v{version}',
    closeSidebar: 'Close sidebar',
    debugInfoDescription:
      'This is non-sensitive system info you can share when reporting issues. No passwords, IPs, or API keys are included.',
    debugBrowserInfo: 'Browser: {userAgent}',
  },
  home: {
    mapsDescription: 'View offline maps',
    drugReferenceDescription: 'Offline FDA drug labels. Search by drug name or by symptom',
    easySetupDescription:
      'Not sure where to start? Use the setup wizard to quickly configure your NOMAD!',
    supplyDepotDescription: 'Browse and install curated apps, or add your own Docker container',
    docsDescription: 'Read Project NOMAD manuals and guides',
    settingsDescription: 'Configure your NOMAD settings',
    updateAvailableTitle: 'An update is available for Project NOMAD!',
    goToSettings: 'Go to Settings',
    benchmarkRerunTitle: 'Your benchmark can be re-scored with Score v2',
    benchmarkRerunMessage:
      "We've upgraded the benchmark scoring system. Re-run your benchmark to get an updated Score v2 result on the community leaderboard.",
    rerunBenchmark: 'Re-run benchmark',
    linkTileTitle: 'A shortcut you added. NOMAD does not manage this.',
    startHere: 'Start here!',
    poweredBy: 'Powered by {name}',
    accessApplication: 'Access the {name} application',
    opensInNewTab: 'Opens in a new tab',
    editLink: 'Edit this link',
    removeLink: 'Remove this link',
    addLink: 'Add a Link',
    addLinkDescription: 'A shortcut to something else on your network',
    removeLinkFailed: 'Failed to remove this link.',
  },
  about: {
    title: 'About',
    hello: 'Hello from About!',
  },
  docs: {
    title: 'Documentation',
  },
  whatsNew: {
    title: "What's new in v{version}",
    highlightCreatorPacks:
      'Creator Packs - install curated video packs from your favorite creators and watch them fully offline.',
    highlightMedicationReference:
      'Medication Reference - offline FDA drug-label lookup for quick, reliable medication information.',
    highlightBenchmarkScore:
      'Benchmark Score v2 - a rebuilt scoring model, with live telemetry while the test runs and your score revealed at the end.',
    highlightNomadMd:
      'NOMAD.md - give your AI assistant standing instructions it follows in every conversation.',
    highlightKnowledgeBase:
      'Knowledge Base collections - group what the assistant searches by subject, so answers stay on topic.',
    seeReleaseNotes: 'See release notes',
  },
  errors: {
    generic: 'Something went wrong',
    network: 'Network error. Check your connection and try again.',
    notFound: 'Page not found',
    server: 'Server error. Try again later.',
    serverErrorTitle: 'Server Error',
    pageDoesNotExist: 'This page does not exist.',
    debugInfoLoadFailed: 'Failed to load debug info. Please try again.',
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
