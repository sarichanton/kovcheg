import { useEffect, useState } from 'react'
import { useTransmit } from 'react-adonis-transmit'
import { InstallActivityFeedProps } from '~/components/InstallActivityFeed'
import { BROADCAST_CHANNELS } from '../../constants/broadcast'
import { getCurrentLocale, translate } from '~/i18n'

export default function useServiceInstallationActivity() {
  const { subscribe } = useTransmit()
  const [installActivity, setInstallActivity] = useState<InstallActivityFeedProps['activity']>([])

  useEffect(() => {
    const unsubscribe = subscribe(BROADCAST_CHANNELS.SERVICE_INSTALLATION, (data: any) => {
      const locale = getCurrentLocale()
      setInstallActivity((prev) => [
        ...prev,
        {
          service_name: data.service_name ?? translate(locale, 'common.unknown'),
          type: data.status ?? 'unknown',
          timestamp: new Date().toISOString(),
          message: data.message ?? translate(locale, 'installActivityFeed.noMessage'),
        },
      ])
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return installActivity
}
