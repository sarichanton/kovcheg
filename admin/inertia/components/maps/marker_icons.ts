import {
  IconAlertTriangle,
  IconAmbulance,
  IconAntenna,
  IconBandage,
  IconBarrel,
  IconBattery,
  IconBed,
  IconBolt,
  IconBuildingHospital,
  IconCampfire,
  IconCar,
  IconDoor,
  IconDroplet,
  IconFirstAidKit,
  IconFish,
  IconFlag,
  IconGasStation,
  IconHome,
  IconMapPinFilled,
  IconMeat,
  IconMountain,
  IconPackage,
  IconPill,
  IconRadio,
  IconRoute,
  IconSeeding,
  IconSkull,
  IconSolarPanel,
  IconStethoscope,
  IconTent,
  IconTool,
  IconToolsKitchen2,
  IconTractor,
  IconTrees,
  IconTruck,
  IconWheat,
  IconWifi,
} from '@tabler/icons-react'
import type { IconProps } from '@tabler/icons-react'
import type { ComponentType } from 'react'
import type { TranslateKey } from '~/i18n'

/**
 * The marker icon set: a curated 36, laid out as six rows of six.
 *
 * Deliberately named imports rather than `import * as TablerIcons`. The
 * namespace form pulls the entire icon library into the maps bundle -- when this
 * picker offered all of Tabler *and* all of Font Awesome it took the maps chunk
 * from 864 kB to 5,774 kB, and gave the user 160 pages to scroll through,
 * including brand logos and text-alignment glyphs. Neither is what someone
 * marking a water source needs.
 *
 * Adding an icon means adding it here, which is the point: the list stays
 * meaningful for marking a place on a map you are relying on offline.
 */
export type MarkerIconEntry = {
  /** Stored on the marker row, e.g. `tabler:IconDroplet`. */
  name: string
  /** Translation key shown as the button tooltip. */
  labelKey: TranslateKey
  Icon: ComponentType<IconProps>
}

const entry = (
  Icon: ComponentType<IconProps>,
  tablerName: string,
  labelKey: TranslateKey
): MarkerIconEntry => ({ name: `tabler:${tablerName}`, labelKey, Icon })

export const MARKER_ICONS: MarkerIconEntry[] = [
  // Water and food
  entry(IconDroplet, 'IconDroplet', 'maps.markerIcons.water'),
  entry(IconBarrel, 'IconBarrel', 'maps.markerIcons.waterStorage'),
  entry(IconToolsKitchen2, 'IconToolsKitchen2', 'maps.markerIcons.food'),
  entry(IconWheat, 'IconWheat', 'maps.markerIcons.grainOrCrops'),
  entry(IconMeat, 'IconMeat', 'maps.markerIcons.meatOrGame'),
  entry(IconFish, 'IconFish', 'maps.markerIcons.fishing'),

  // Shelter and living
  entry(IconHome, 'IconHome', 'maps.markerIcons.building'),
  entry(IconTent, 'IconTent', 'maps.markerIcons.camp'),
  entry(IconBed, 'IconBed', 'maps.markerIcons.shelter'),
  entry(IconDoor, 'IconDoor', 'maps.markerIcons.entrance'),
  entry(IconCampfire, 'IconCampfire', 'maps.markerIcons.fire'),
  entry(IconSeeding, 'IconSeeding', 'maps.markerIcons.garden'),

  // Medical
  entry(IconFirstAidKit, 'IconFirstAidKit', 'maps.markerIcons.firstAid'),
  entry(IconBuildingHospital, 'IconBuildingHospital', 'maps.markerIcons.hospital'),
  entry(IconStethoscope, 'IconStethoscope', 'maps.markerIcons.clinic'),
  entry(IconPill, 'IconPill', 'maps.markerIcons.medication'),
  entry(IconBandage, 'IconBandage', 'maps.markerIcons.supplies'),
  entry(IconAmbulance, 'IconAmbulance', 'maps.markerIcons.ambulance'),

  // Power and communications
  entry(IconBolt, 'IconBolt', 'maps.markerIcons.power'),
  entry(IconSolarPanel, 'IconSolarPanel', 'maps.markerIcons.solar'),
  entry(IconBattery, 'IconBattery', 'maps.markerIcons.battery'),
  entry(IconAntenna, 'IconAntenna', 'maps.markerIcons.antenna'),
  entry(IconRadio, 'IconRadio', 'maps.markerIcons.radio'),
  entry(IconWifi, 'IconWifi', 'maps.markerIcons.network'),

  // Transport and supply
  entry(IconGasStation, 'IconGasStation', 'maps.markerIcons.fuel'),
  entry(IconCar, 'IconCar', 'maps.markerIcons.vehicle'),
  entry(IconTruck, 'IconTruck', 'maps.markerIcons.truck'),
  entry(IconTractor, 'IconTractor', 'maps.markerIcons.machinery'),
  entry(IconPackage, 'IconPackage', 'maps.markerIcons.cacheOrSupplies'),
  entry(IconTool, 'IconTool', 'maps.markerIcons.tools'),

  // Terrain, routes and hazards
  entry(IconMountain, 'IconMountain', 'maps.markerIcons.highGround'),
  entry(IconTrees, 'IconTrees', 'maps.markerIcons.woodland'),
  entry(IconRoute, 'IconRoute', 'maps.markerIcons.route'),
  entry(IconFlag, 'IconFlag', 'maps.markerIcons.rallyPoint'),
  entry(IconAlertTriangle, 'IconAlertTriangle', 'maps.markerIcons.hazard'),
  entry(IconSkull, 'IconSkull', 'maps.markerIcons.danger'),
]

/** The pin used when a marker has no icon, or names one no longer in the set. */
export const DEFAULT_MARKER_ICON = IconMapPinFilled

const BY_NAME = new Map(MARKER_ICONS.map((i) => [i.name, i.Icon]))

/**
 * Resolve a stored icon name to a component, falling back to the default pin.
 *
 * The fallback matters beyond bad data: a marker saved with an icon that is
 * later removed from the set must still render, rather than blanking the pin.
 */
export function resolveMarkerIcon(
  icon?: string | null,
  fallback: ComponentType<IconProps> = DEFAULT_MARKER_ICON
): ComponentType<IconProps> {
  if (!icon) return fallback
  return BY_NAME.get(icon) ?? fallback
}
