import { IconSun, IconMoon } from '@tabler/icons-react'
import { useThemeContext } from '~/providers/ThemeProvider'
import { useT } from '~/i18n/I18nProvider'

interface ThemeToggleProps {
  compact?: boolean
}

export default function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { t } = useT()
  const { theme, toggleTheme } = useThemeContext()
  const isDark = theme === 'dark'
  const switchLabel = isDark ? t('common.switchToDayOps') : t('common.switchToNightOps')

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm transition-colors
                 text-desert-stone hover:text-desert-green-darker cursor-pointer"
      aria-label={switchLabel}
      title={switchLabel}
    >
      {isDark ? <IconSun className="size-4" /> : <IconMoon className="size-4" />}
      {!compact && <span>{isDark ? t('common.dayOps') : t('common.nightOps')}</span>}
    </button>
  )
}
