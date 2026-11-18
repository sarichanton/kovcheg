import { computeJobHealth, type JobHealthStatus } from '../../app/utils/kb_job_health.js'
import { translate, type Locale, type TranslateKey } from '../i18n/index.js'

export { computeJobHealth, type JobHealthStatus } from '../../app/utils/kb_job_health.js'

/**
 * Visual presentation for each health status — pill color, dot color, and the
 * short label rendered alongside the dot. Kept in one place so backend health
 * decisions (`computeJobHealth`) and frontend rendering stay in sync.
 */
export const JOB_HEALTH_DISPLAY: Record<
  JobHealthStatus,
  {
    dot: string
    labelKey: TranslateKey
    ariaLabelKey: TranslateKey
  }
> = {
  waiting: {
    dot: 'bg-gray-400 dark:bg-gray-500',
    labelKey: 'kbJobHealth.waiting',
    ariaLabelKey: 'kbJobHealth.waitingAria',
  },
  healthy: {
    dot: 'bg-green-500',
    labelKey: 'kbJobHealth.healthy',
    ariaLabelKey: 'kbJobHealth.healthyAria',
  },
  slow: {
    dot: 'bg-yellow-500',
    labelKey: 'kbJobHealth.slow',
    ariaLabelKey: 'kbJobHealth.slowAria',
  },
  stalled: {
    dot: 'bg-red-500',
    labelKey: 'kbJobHealth.stalled',
    ariaLabelKey: 'kbJobHealth.stalledAria',
  },
  failed: {
    dot: 'bg-red-700',
    labelKey: 'kbJobHealth.failed',
    ariaLabelKey: 'kbJobHealth.failedAria',
  },
}

/** Resolve a health status into localized label and accessible description. */
export function jobHealthDisplay(health: JobHealthStatus, locale: Locale) {
  const display = JOB_HEALTH_DISPLAY[health]
  return {
    dot: display.dot,
    label: translate(locale, display.labelKey),
    ariaLabel: translate(locale, display.ariaLabelKey),
  }
}

/**
 * Format a relative timestamp as "Xs ago", "Xm ago", "Xh ago" with sensible
 * thresholds for the KB Processing Queue's "Last activity" line.
 */
export function formatTimeAgo(
  timestampMs: number,
  now: number,
  locale: Locale = 'en'
): string {
  const seconds = Math.max(0, Math.floor((now - timestampMs) / 1000))
  if (seconds < 5) return translate(locale, 'kbJobHealth.justNow')
  if (seconds < 60) return translate(locale, 'kbJobHealth.secondsAgo', { count: seconds })
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return translate(locale, 'kbJobHealth.minutesAgo', { count: minutes })
  const hours = Math.floor(minutes / 60)
  return translate(locale, 'kbJobHealth.hoursAgo', { count: hours })
}

/**
 * Convenience wrapper that resolves a job's health status without the caller
 * having to remember to pass `now`. Mostly for ergonomic frontend use.
 */
export function computeJobHealthNow(
  input: Omit<Parameters<typeof computeJobHealth>[0], 'now'>
): JobHealthStatus {
  return computeJobHealth({ ...input, now: Date.now() })
}
