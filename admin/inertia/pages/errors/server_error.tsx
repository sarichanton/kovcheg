import { Head } from '@inertiajs/react'
import { localizeServerMessage } from '~/lib/serverMessages'
import { useT } from '~/i18n/I18nProvider'

export default function ServerError(props: { error: any }) {
  const { t } = useT()

  return (
    <>
      <Head title={t('errors.serverErrorTitle')} />
      <div className="container">
        <div className="title">{t('errors.serverErrorTitle')}</div>

        <span>{localizeServerMessage(props.error?.message, t)}</span>
      </div>
    </>
  )
}
