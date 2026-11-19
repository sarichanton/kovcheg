import { useState, useEffect, useRef } from 'react'
import { NotificationContext, Notification } from '../context/NotificationContext'
import { IconExclamationCircle, IconCircleCheck, IconInfoCircle } from '@tabler/icons-react'
import { setGlobalNotificationCallback } from '~/lib/util'
import { useT } from '~/i18n/I18nProvider'
import { localizeServerMessage } from '~/lib/serverMessages'

const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<(Notification & { id: string })[]>([])
  const { t } = useT()
  // addNotification is also exposed through a global callback created once, so
  // keep the latest translator in a ref instead of capturing the first one.
  const tRef = useRef(t)
  useEffect(() => {
    tRef.current = t
  }, [t])

  const addNotification = (newNotif: Notification) => {
    const { type, duration = 5000 } = newNotif
    // Server controllers send English strings; translate the known ones and
    // pass unknown diagnostics through unchanged.
    const message = localizeServerMessage(newNotif.message, tRef.current)
    const id = crypto.randomUUID()
    setNotifications((prev) => [...prev, { id, message, type, duration }])

    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }
  }

  // Set the global notification callback when provider mounts
  useEffect(() => {
    setGlobalNotificationCallback(addNotification)
    return () => {
      setGlobalNotificationCallback(() => {})
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const removeAllNotifications = () => {
    setNotifications([])
  }

  const Icon = ({ type }: { type: string }) => {
    switch (type) {
      case 'error':
        return <IconExclamationCircle className="h-5 w-5 text-red-500" />
      case 'success':
        return <IconCircleCheck className="h-5 w-5 text-green-500" />
      case 'info':
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />
      default:
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        removeNotification,
        removeAllNotifications,
      }}
    >
      {children}
      <div className="!fixed bottom-16 right-0 p-4 z-[9999]">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mb-4 p-4 rounded shadow-md border border-border-default bg-surface-primary max-w-96`}
            onClick={() => removeNotification(notification.id)}
          >
            <div className="flex flex-row items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon type={notification.type} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="break-words">{notification.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}

export default NotificationsProvider
