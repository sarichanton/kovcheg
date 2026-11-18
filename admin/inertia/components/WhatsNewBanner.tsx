import { useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import Alert from '~/components/Alert'
import { useT } from '~/i18n/I18nProvider'

/**
 * Post-upgrade "what's new" highlights shown once on the dashboard.
 *
 * `version` is the release line (major.minor) these highlights describe. The
 * banner only renders when the running build's major.minor matches, so it
 * appears after a user upgrades into the line and every patch within it, then
 * disappears on the next minor. Dismissal is remembered per-line in
 * localStorage, so dismissing v1.34 won't suppress a future v1.35 note.
 *
 * To surface a new release's highlights: bump `version` and replace
 * `highlightKeys`. No schema or migration needed.
 */
const WHATS_NEW = {
  version: '1.34',
  titleKey: 'whatsNew.title',
  highlightKeys: [
    'whatsNew.highlightCreatorPacks',
    'whatsNew.highlightMedicationReference',
    'whatsNew.highlightBenchmarkScore',
    'whatsNew.highlightNomadMd',
    'whatsNew.highlightKnowledgeBase',
  ],
} as const

/** Extract the major.minor line (e.g. "1.34.2" -> "1.34"). Returns null for
 *  non-numeric versions like the dev server's "dev". */
function majorMinor(version: string | undefined | null): string | null {
  const match = (version ?? '').match(/^(\d+)\.(\d+)/)
  return match ? `${match[1]}.${match[2]}` : null
}

export default function WhatsNewBanner() {
  const { t } = useT()
  const { appVersion } = usePage<{ appVersion: string }>().props
  const storageKey = `nomad:whatsnew-dismissed:${WHATS_NEW.version}`

  const [dismissed, setDismissed] = useState(() => {
    try {
      return localStorage.getItem(storageKey) === 'true'
    } catch {
      return false
    }
  })

  // Only surface highlights for the release they describe, and only until the
  // user dismisses that line.
  if (dismissed || majorMinor(appVersion) !== WHATS_NEW.version) {
    return null
  }

  const handleDismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(storageKey, 'true')
    } catch {
      // localStorage unavailable (private mode, etc.) — banner just re-shows
      // next load, which is acceptable.
    }
  }

  return (
    <div className="flex justify-center items-center p-4 w-full">
      <Alert
        title={t(WHATS_NEW.titleKey, { version: WHATS_NEW.version })}
        type="info-inverted"
        variant="solid"
        className="w-full"
        dismissible
        onDismiss={handleDismiss}
        buttonProps={{
          variant: 'primary',
          children: t('whatsNew.seeReleaseNotes'),
          icon: 'IconBook',
          onClick: () => router.visit('/docs/release-notes'),
        }}
      >
        <ul className="mt-1 list-disc list-inside space-y-1 text-white text-opacity-90 text-sm leading-relaxed">
          {WHATS_NEW.highlightKeys.map((highlightKey) => (
            <li key={highlightKey}>{t(highlightKey)}</li>
          ))}
        </ul>
      </Alert>
    </div>
  )
}
