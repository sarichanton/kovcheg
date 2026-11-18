import { Head } from '@inertiajs/react'
import AppLayout from '~/layouts/AppLayout'
import { useT } from '~/i18n/I18nProvider'

export default function About() {
  const { t } = useT()

  return (
    <AppLayout>
      <Head title={t('about.title')} />
      <div className="p-2">{t('about.hello')}</div>
    </AppLayout>
  )
}
