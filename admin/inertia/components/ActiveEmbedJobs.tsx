import { useEffect, useState } from 'react'
import useEmbedJobs from '~/hooks/useEmbedJobs'
import HorizontalBarChart from './HorizontalBarChart'
import StyledSectionHeader from './StyledSectionHeader'
import {
  computeJobHealth,
  formatTimeAgo,
  jobHealthDisplay,
} from '~/lib/kb_job_health_display'
import { useT } from '~/i18n/I18nProvider'

interface ActiveEmbedJobsProps {
  withHeader?: boolean
}

const ActiveEmbedJobs = ({ withHeader = false }: ActiveEmbedJobsProps) => {
  const { t, locale } = useT()
  const { data: jobs } = useEmbedJobs()

  // Re-render every 5s to keep per-job "last activity Xs ago" timestamps fresh.
  const [tick, setTick] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      {withHeader && (
        <StyledSectionHeader title={t('knowledgeBase.jobs.title')} className="mt-12 mb-4" />
      )}

      <div className="space-y-4">
        {jobs && jobs.length > 0 ? (
          jobs.map((job) => {
            const health = computeJobHealth({
              status: job.status,
              progress: job.progress,
              lastBatchAt: job.lastBatchAt,
              startedAt: job.startedAt,
              now: tick,
            })
            const display = jobHealthDisplay(health, locale)
            const lastActivityMs = job.lastBatchAt ?? job.startedAt
            return (
              <div
                key={job.jobId}
                className="bg-desert-white rounded-lg p-4 border border-desert-stone-light shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-block w-2.5 h-2.5 rounded-full ${display.dot}`}
                    aria-label={display.ariaLabel}
                    title={display.ariaLabel}
                  />
                  <span className="text-sm font-medium text-text-primary">
                    {display.label}
                  </span>
                  {lastActivityMs !== undefined && (
                    <span className="text-xs text-text-muted">
                      {t('knowledgeBase.jobs.lastActivity', {
                        time: formatTimeAgo(lastActivityMs, tick, locale),
                      })}
                    </span>
                  )}
                  {typeof job.chunks === 'number' && job.chunks > 0 && (
                    <span className="text-xs text-text-muted">
                      {t('knowledgeBase.jobs.chunks', { count: job.chunks })}
                    </span>
                  )}
                </div>
                <HorizontalBarChart
                  items={[
                    {
                      label: job.fileName,
                      value: job.progress,
                      total: '100%',
                      used: `${job.progress}%`,
                      type: job.status,
                    },
                  ]}
                />
              </div>
            )
          })
        ) : (
          <p className="text-text-muted">{t('knowledgeBase.jobs.empty')}</p>
        )}
      </div>
    </>
  )
}

export default ActiveEmbedJobs
