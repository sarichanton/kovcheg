import DynamicIcon, { DynamicIconName } from './DynamicIcon'
import { LINK_TILE_ICONS } from '../../constants/link_tile_icons'
import { useT } from '~/i18n/I18nProvider'
import type { TranslationKey } from '~/i18n'

type LinkTileIconPickerProps = {
  value: string | null
  onChange: (icon: string) => void
}

/**
 * Human labels for the curated icon set. The Tabler name is stored on the tile,
 * so the tooltip needs a translation key of its own rather than the raw name.
 */
const ICON_LABEL_KEYS: Record<string, TranslationKey> = {
  IconServer: 'linkTile.icons.server',
  IconDatabase: 'linkTile.icons.database',
  IconWorld: 'linkTile.icons.world',
  IconWifi: 'linkTile.icons.wifi',
  IconAntenna: 'linkTile.icons.antenna',
  IconBroadcast: 'linkTile.icons.broadcast',
  IconBrandDocker: 'linkTile.icons.docker',
  IconCpu: 'linkTile.icons.cpu',
  IconHome: 'linkTile.icons.home',
  IconBox: 'linkTile.icons.box',
  IconFolderOpen: 'linkTile.icons.folderOpen',
  IconMovie: 'linkTile.icons.movie',
  IconBooks: 'linkTile.icons.books',
  IconBook: 'linkTile.icons.book',
  IconLibrary: 'linkTile.icons.library',
  IconMap: 'linkTile.icons.map',
  IconNotes: 'linkTile.icons.notes',
  IconFileDescription: 'linkTile.icons.document',
  IconCode: 'linkTile.icons.code',
  IconTool: 'linkTile.icons.tools',
  IconSettings: 'linkTile.icons.settings',
  IconShieldCheck: 'linkTile.icons.shieldCheck',
  IconShieldLock: 'linkTile.icons.shieldLock',
  IconRobot: 'linkTile.icons.robot',
  IconBrain: 'linkTile.icons.brain',
  IconPlant: 'linkTile.icons.plant',
  IconChefHat: 'linkTile.icons.chefHat',
  IconSchool: 'linkTile.icons.school',
  IconStethoscope: 'linkTile.icons.stethoscope',
  IconSearch: 'linkTile.icons.search',
  IconCloudDownload: 'linkTile.icons.cloudDownload',
  IconCloudUpload: 'linkTile.icons.cloudUpload',
  IconLogs: 'linkTile.icons.logs',
  IconPlayerPlay: 'linkTile.icons.play',
  IconExternalLink: 'linkTile.icons.externalLink',
  IconWand: 'linkTile.icons.wand',
}

/**
 * The whole curated icon set, six across and six down.
 *
 * No search box and no paging: 36 icons fit on screen at once, which is the
 * point of curating them rather than offering a library. The grid needs an
 * explicit width, because a shrink-wrapped container collapses the six 1fr
 * columns and the glyphs overlap into an unreadable smear.
 */
export default function LinkTileIconPicker({ value, onChange }: LinkTileIconPickerProps) {
  const { t } = useT()

  return (
    <div className="w-72 rounded border border-border-default bg-surface-primary p-2">
      <div className="grid grid-cols-6 justify-items-center gap-1">
        {LINK_TILE_ICONS.map((name) => {
          const label = t(ICON_LABEL_KEYS[name] ?? 'linkTile.icon')
          return (
            <button
              key={name}
              type="button"
              title={label}
              aria-label={label}
              aria-pressed={value === name}
              onClick={() => onChange(name)}
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded transition-colors ${
                value === name
                  ? 'bg-desert-green text-white'
                  : 'text-text-secondary hover:bg-surface-secondary'
              }`}
            >
              <DynamicIcon icon={name as DynamicIconName} className="!size-5" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
