import { useT } from '~/i18n/I18nProvider'

const ProgressBar = ({ progress, speed }: { progress: number; speed?: string }) => {
  const { t } = useT()

  if (progress >= 100) {
    return (
      <div className="flex items-center justify-between">
        <span className="text-sm text-desert-green">{t('common.downloadComplete')}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <div className="relative w-full h-2 bg-border-subtle rounded">
        <div
          className="absolute top-0 left-0 h-full bg-desert-green rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
      {speed && (
        <div className="mt-1 text-sm text-text-muted">
          {t('common.estimatedSpeed', { speed })}
        </div>
      )}
    </div>
  )
}

export default ProgressBar
