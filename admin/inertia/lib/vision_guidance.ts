import type { ModelVisionCapability } from '../../types/ollama.js'
import { translate, type Locale } from '../i18n/index.js'

export function visionAttachmentGuidance(
  capability: ModelVisionCapability,
  locale: Locale = 'en'
): string {
  if (capability === 'unsupported') {
    return translate(locale, 'vision.unsupported')
  }

  if (capability === 'unknown') {
    return translate(locale, 'vision.unknown', {
      notice: translate(locale, 'vision.temporaryNotice'),
    })
  }

  return translate(locale, 'vision.temporaryNotice')
}
