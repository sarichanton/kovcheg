import { Head } from '@inertiajs/react'
import { useT } from '~/i18n/I18nProvider'

export default function NotFound() {
  const { t } = useT()

  return (
    <>
      <Head title={t('errors.notFound')} />
      <div className="container">
        <div className="title">{t('errors.notFound')}</div>

        <span>{t('errors.pageDoesNotExist')}</span>
      </div>
    </>
  )
}
