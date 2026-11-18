import classNames from '~/lib/classNames'
import { useT } from '~/i18n/I18nProvider'
import type { Locale, TranslationKey } from '~/i18n'

const LANGUAGE_OPTIONS: ReadonlyArray<{ value: Locale; labelKey: TranslationKey }> = [
  { value: 'ru', labelKey: 'common.russian' },
  { value: 'en', labelKey: 'common.english' },
]

interface LanguageSwitcherProps {
  className?: string
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { t, locale, setLocale } = useT()
  const label = t('common.language')

  return (
    <div
      role="group"
      aria-label={label}
      title={label}
      className={classNames(
        'inline-flex items-center gap-0.5 rounded-md border border-border-default bg-surface-primary p-0.5 text-sm',
        className
      )}
    >
      {LANGUAGE_OPTIONS.map((option) => {
        const active = option.value === locale
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLocale(option.value)}
            aria-pressed={active}
            className={classNames(
              'cursor-pointer rounded px-2.5 py-1 font-medium transition-colors',
              active
                ? 'bg-desert-green text-white shadow-sm'
                : 'text-text-secondary hover:bg-surface-secondary hover:text-text-primary'
            )}
          >
            {t(option.labelKey)}
          </button>
        )
      })}
    </div>
  )
}
