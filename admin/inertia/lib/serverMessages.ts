import {
  getCurrentLocale,
  translate,
  type Locale,
  type TranslateKey,
  type TranslationParams,
} from '../i18n/index.js'

export type ServerMessageTranslator = (
  key: TranslateKey,
  params?: TranslationParams
) => string

/**
 * English strings that the Adonis controllers/services return verbatim and the
 * UI shows to the user. Keys point at the `serverMessages.*` dictionary
 * entries; the server itself stays English-only.
 */
export const SERVER_MESSAGE_KEYS: Record<string, TranslateKey> = {
  'Setting updated successfully': 'serverMessages.settingUpdated',
  'Failed to start installation.': 'serverMessages.installStartFailed',
  'Failed to start service.': 'serverMessages.startFailed',
  'Failed to stop service.': 'serverMessages.stopFailed',
  'Failed to restart service.': 'serverMessages.restartFailed',
  'Failed to start reinstall.': 'serverMessages.reinstallFailed',
  'Failed to delete app.': 'serverMessages.appDeleteFailed',
  'Failed to uninstall app.': 'serverMessages.appUninstallFailed',
  'Failed to update app.': 'serverMessages.appUpdateFailed',
  'Failed to update service.': 'serverMessages.serviceUpdateFailed',
  'Failed to update auto-update preference.': 'serverMessages.autoUpdatePrefFailed',
  'App auto-update preference updated': 'serverMessages.autoUpdatePrefUpdated',
  'Service update check dispatched': 'serverMessages.updateCheckDispatched',
  'Update sidecar is not available. Ensure the updater container is running.':
    'serverMessages.updateSidecarUnavailable',
  'System update initiated. The admin container will restart during the process.':
    'serverMessages.updateInitiated',
  'Failed to request system update. Check server logs for details.':
    'serverMessages.updateRequestFailed',
  'A benchmark is already running': 'serverMessages.benchmarkRunning',
  'System benchmark started': 'serverMessages.benchmarkSystemStarted',
  'AI benchmark started': 'serverMessages.benchmarkAiStarted',
  'Benchmark result not found': 'serverMessages.benchmarkNotFound',
  'You can only submit one benchmark per hour. Please wait a bit and try again.':
    'serverMessages.benchmarkSubmitLimit',
  'Invalid builder tag format. Expected: Word-Word-0000':
    'serverMessages.benchmarkTagInvalid',
  'Failed to submit benchmark results.': 'serverMessages.benchmarkSubmitFailed',
  'ZIM file uploaded and registered successfully': 'serverMessages.zimUploaded',
  'ZIM file deleted successfully': 'serverMessages.zimDeleted',
  'Only .zim files are accepted': 'serverMessages.zimOnly',
  'A ZIM file with that name already exists': 'serverMessages.zimExists',
  'Upload failed': 'serverMessages.uploadFailed',
  'Kiwix library rescanned': 'serverMessages.libraryRescanned',
  'Pack download started': 'serverMessages.creatorPackDownloadStarted',
  'Pack is already installed': 'serverMessages.creatorPackInstalled',
  'Pack download is already in progress': 'serverMessages.creatorPackInProgress',
  'Pack uninstalled': 'serverMessages.creatorPackUninstalled',
  'Download started successfully': 'serverMessages.mapDownloadStarted',
  'Collection download started successfully': 'serverMessages.mapCollectionDownloadStarted',
  'Marker not found': 'serverMessages.markerNotFound',
  'File processed and embedded successfully.': 'serverMessages.fileEmbedded',
  'File removed from knowledge base.': 'serverMessages.fileRemoved',
  'Error scanning and syncing knowledge base': 'serverMessages.syncFailed',
  'Error during re-embed': 'serverMessages.reembedFailed',
  'Error during reset & rebuild': 'serverMessages.resetFailed',
  'Failed to check for content updates. Please try again later.':
    'serverMessages.contentCheckFailed',
  'Failed to dispatch download job': 'serverMessages.contentDispatchFailed',
  'Custom URL must be a valid http(s) address (e.g. https://jellyfin.myhomelab.net).':
    'serverMessages.customUrlInvalid',
  'Enter a valid URL, for example 192.168.1.50:8080 or https://nas.local.':
    'serverMessages.urlInvalid',
  'Link not found': 'serverMessages.linkNotFound',
}

interface ServerMessagePattern {
  pattern: RegExp
  key: TranslateKey
  params?: (...matches: string[]) => TranslationParams
}

/**
 * Dynamic server responses (service names, collection names, …). Patterns are
 * checked in order, so more specific shapes must come before generic ones.
 */
export const SERVER_MESSAGE_PATTERNS: readonly ServerMessagePattern[] = [
  {
    pattern: /^Service (.+) not found or not installed$/,
    key: 'serverMessages.serviceNotInstalled',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Container for service (.+) not found$/,
    key: 'serverMessages.containerNotFound',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) not found$/,
    key: 'serverMessages.serviceNotFound',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) started successfully$/,
    key: 'serverMessages.serviceStarted',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) stopped successfully$/,
    key: 'serverMessages.serviceStopped',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) restarted successfully$/,
    key: 'serverMessages.serviceRestarted',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) is already running$/,
    key: 'serverMessages.serviceAlreadyRunning',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) is already installed$/,
    key: 'serverMessages.serviceAlreadyInstalled',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) installation is already in progress$/,
    key: 'serverMessages.serviceInstallInProgress',
    params: (name) => ({ name }),
  },
  {
    pattern:
      /^Service (.+) installation initiated successfully\. You can receive updates via server-sent events\.$/,
    key: 'serverMessages.serviceInstallInitiated',
    params: (name) => ({ name }),
  },
  {
    pattern:
      /^Service (.+) force reinstall initiated successfully\. You can receive updates via server-sent events\.$/,
    key: 'serverMessages.serviceForceReinstallInitiated',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Service (.+) updated to (.+)$/,
    key: 'serverMessages.serviceUpdated',
    params: (name, version) => ({ name, version }),
  },
  {
    pattern: /^Service (.+) uninstalled$/,
    key: 'serverMessages.serviceUninstalled',
    params: (name) => ({ name }),
  },
  {
    pattern: /^A custom app named "(.+)" already exists\. Choose a different name\.$/,
    key: 'serverMessages.customAppExists',
    params: (name) => ({ name }),
  },
  {
    pattern: /^A link named "(.+)" already exists\. Choose a different name\.$/,
    key: 'serverMessages.linkExists',
    params: (name) => ({ name }),
  },
  {
    pattern:
      /^Duplicate host port\(s\): (.+)\. Each host port can map to only one container\.$/,
    key: 'serverMessages.duplicatePorts',
    params: (ports) => ({ ports }),
  },
  {
    pattern: /^ZIM file with key (.+) not found$/,
    key: 'serverMessages.zimFileNotFound',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Map file with key (.+) not found$/,
    key: 'serverMessages.mapFileNotFound',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Renamed "(.+)" to "(.+)"\.$/,
    key: 'serverMessages.collectionRenamed',
    params: (oldName, newName) => ({ old: oldName, new: newName }),
  },
  {
    pattern: /^"(.+)" removed\. Files moved to Uncategorized\.$/,
    key: 'serverMessages.collectionRemoved',
    params: (name) => ({ name }),
  },
  {
    pattern: /^Download job dispatched for model: (.+)$/,
    key: 'serverMessages.modelDownloadQueued',
    params: (name) => ({ name }),
  },
]

/**
 * Translate an English server message when it is one of the known strings.
 * Unknown messages are returned untouched so diagnostics stay visible.
 */
export function localizeServerMessage(
  message: string | null | undefined,
  t?: ServerMessageTranslator,
  locale: Locale = getCurrentLocale()
): string {
  if (message === null || message === undefined) return ''
  if (typeof message !== 'string') return String(message)

  const trimmed = message.trim()
  const translator =
    t ?? ((key: TranslateKey, params?: TranslationParams) => translate(locale, key, params))

  const exactKey = SERVER_MESSAGE_KEYS[trimmed]
  if (exactKey) return translator(exactKey)

  for (const entry of SERVER_MESSAGE_PATTERNS) {
    const match = entry.pattern.exec(trimmed)
    if (match) {
      return translator(entry.key, entry.params?.(...match.slice(1)))
    }
  }

  return message
}
