import { translate, type Locale } from '../i18n/index.js'

export function chatStreamErrorMessage(
  event: unknown,
  locale: Locale = 'en'
): string | null {
  if (!event || typeof event !== 'object' || !('error' in event) || !event.error) {
    return null
  }

  const message = 'message' in event ? event.message : undefined
  return typeof message === 'string' && message.trim()
    ? message
    : translate(locale, 'chatStream.genericError')
}
